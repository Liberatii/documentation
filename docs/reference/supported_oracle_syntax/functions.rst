.. _functions:


Functions
=========

**Not Implemented**
+++++++++++++++++++

**1.** Not default parameters after default params in proc declarations.

**2.** Cast params in the function's call.

**3.** Forward declaration default params.


**Functions with OUT parameters**
+++++++++++++++++++++++++++++++++

Postgres supports functions with OUT parameters, but they should be invoked in a different manner than regular functions.  Output parameters in Postgres automatically make function returns kind of record with fields equal to OUT parameters. So we'll add an additional OUT parameter for the function result.

Declaration example:

.. code-block:: sql
   :linenos:

   --OracleDB
   create or replace function fun (a in number,b out number, c in out number) return number is
        begin
          b:=a+10;
          c:=c+a;
       return(100);
    end;



For invoke, we create a temporal variable and select into it the result from a function. Also, replace function call with variable and before expression put select into with a real function call.

Invoking example:

.. code-block:: sql
   :linenos:

   --OracleDB
   declare
     x number:=10;
     y number:=20;
     z number;
   begin
     z:=fun(x,z,y);
     DBMS_OUTPUT.PUT_LINE('X'||X||' y'||y||' z'||z);
   end;




**Limitations**
+++++++++++++++

One of the limitations of this approach is multiple invoke of the function in a single expression with changing INOUT variables.

.. code-block:: sql
   :linenos:

   --OracleDB
   create or replace function fun (a in number, c in out number) return number is
     begin
       c:=c+1;
       return c;
   end;
   / 
   
   declare
     a number:=10;
     c number:=20;
   begin
     c:= c + fun(a,c) + fun(a,c);
     -- C=64. Second call of fun(a,c) doesn't
     -- affect c variable in the begining 
     -- of addition operation
     DBMS_OUTPUT.PUT_LINE('A '||a||'  c '||c);
   end;




**Function with no arguments**
++++++++++++++++++++++++++++++

If the function doesn't have any argument or has all defaults, Oracle can call this function without parentheses. In Postgres, you should always have parentheses. As we don't have type inference, we create synonyms that add parentheses to a call.

OracleDB

.. code-block:: sql
   :linenos:

   CREATE FUNCTION test_func RETURN test_table.id%TYPE
   IS
     retVal test_table.id%TYPE:=-7777;
   BEGIN
     RETURN retVal;
   END;
   
   
   SELECT id, txt, test_func AS "test" 
     FROM test_table
    WHERE test_func = -7777;




**NO_DATA_FOUND inside functions**
++++++++++++++++++++++++++++++++++

In Oracle, NO_DATA_FOUND  is an error and a state at the same time, depending on what is calling function is.

If the function is called by PlSQL, NO_DATA_FOUND is considered to be an error and an exception is raised. If the function is called by SQL, NO_DATA_FOUND is considered to be a state and no exception is raised. In PostgreSQL, it is always an error. To emulate this for functions that can rise ``NO_DATA_FOUND`` (rise explicitly or in ``select into``), we create a special wrapper with the original function name to suppress an error. In the original function, we change the name to this template ``lbr$<function_name>$throw_no_data`` and call this in PLSQL instead of the original name.

OracleDB

.. code-block:: sql
   :linenos:

   CREATE or replace  FUNCTION no_data_func
   RETURN VARCHAR2
   AS
   BEGIN
     RAISE NO_DATA_FOUND;
     RETURN 0;
   END;




**Pipelined functions**
+++++++++++++++++++++++

Pipelined table functions are table functions that return or "pipe" rows back to the calling query as the function produces the data in the desired form - and before the function has completed all of its processing. For emulation, we add to every nested table or VARRAY helper field ``elem`` with the type of collection element.

OracleDB

.. code-block:: sql
   :linenos:

   CREATE FUNCTION test_func(par1 test_table.id%TYPE)
   -- 1
   RETURN test_type_set PIPELINED
   IS
     outRec test_type;
     CURSOR cur (cur_id test_table.id%TYPE, cur_dt test_table.dt%TYPE) IS
       SELECT id, 
              txt
         FROM test_table
        WHERE id <= cur_id
          AND dt >= cur_dt;
     BEGIN
       FOR vRec IN cur(par1, TRUNC(SYSDATE)) LOOP
         outRec.tabId := vRec.id;
         outRec.tabTxt := vRec.txt;
         outRec.recType := varConstType;
         outRec.recDesc := varConstDesc;
         -- 2
         PIPE ROW(outRec);
       END LOOP;
       RETURN;
     END test_func;



**Nested functions**
++++++++++++++++++++

To support this feature, we declare each nested function in the top scope before the parent block/function.

Each nested function has a name ``<parent_function/block_id>$nested_func_id``. Also, for each nested function, we capture closure variables from the outer scope and insert them in the function's call.

Each anonymous nested function we create in ``pg_temp`` schema. 

`Examples`

.. code-block:: sql
   :linenos:

   --Block
   DECLARE
     a NUMBER := 1000;
     FUNCTION f1(b NUMBER) RETURN NUMBER AS
     BEGIN
       RETURN a + b + 100;
     END;
   BEGIN
     DECLARE a NUMBER := 10;
     BEGIN
       DBMS_OUTPUT.PUT_LINE(f1(a));
     END;
   END;
   
   --Global
   CREATE OR REPLACE FUNCTION a2(v1 INT) RETURN INT AS
   BEGIN
     DECLARE 
       FUNCTION b(v2 INT) RETURN INT AS
       BEGIN
         RETURN v1 + v2;
       END;
     BEGIN
       RETURN b(100);
     END;
   END;
   /
   
   SELECT a2(1000) FROM DUAL;
   -- 1100
   
   
   --Overloading
   DECLARE
     a NUMBER := 1000;
     FUNCTION f1(b NUMBER) RETURN NUMBER AS
     BEGIN
       RETURN a + b + 100;
     END;
     FUNCTION f1(b VARCHAR2) RETURN VARCHAR2 AS
     BEGIN
       RETURN b;
     END;
   BEGIN
     DECLARE a NUMBER := 10;
     BEGIN
       DBMS_OUTPUT.PUT_LINE(f1(a)||'-'||f1('a'));
     END;
   END;



