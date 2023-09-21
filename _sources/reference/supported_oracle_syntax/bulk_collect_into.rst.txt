.. _bulk_collect_into:

BULK COLLECT INTO
=================

To emulate ``BULK COLLECT INTO``, clause we create an aggregate function for each collection type

This is an example of creating an aggregate for associative collection type:


SELECT BULK COLLECT INTO
++++++++++++++++++++++++

To emulate select bulk collect, we call aggregate for each value and insert them into the temporary record variable. After selecting we assign each field to the corresponding collection variable.

.. code-block:: sql
   :linenos:

   DECLARE
   ...
   BEGIN
       SELECT empno, ename, job, hiredate, sal, comm, deptno 
       BULK COLLECT
          INTO t_empno, t_ename, t_job, t_hiredate, t_sal, t_comm, t_deptno
          FROM emp;
       ...
   END;



SELECT BULK COLLECT INTO ROWTYPE
++++++++++++++++++++++++++++++++

Emulation of select bulk collect into %ROWTYPE collection is similar to regular select bulk collect, but we must specify an asterisk with the source name(alias).

.. code-block:: sql
   :linenos:

   declare
       TYPE emp_tbl IS TABLE OF emp%ROWTYPE INDEX BY BINARY_INTEGER;
       t_emp           EMP_TBL;
   BEGIN
    SELECT *
       BULK COLLECT
          INTO t_emp
           FROM emp;
     ...
   END;




FETCH BULK COLLECT INTO 
+++++++++++++++++++++++

To aggregate values from the cursor, we create a fetch loop and store each fetched column in ``elem`` field of the corresponding collection variable. To aggregate values, we're using ``lbr$accum`` function without actual aggregate.

.. code-block:: sql
   :linenos:

   declare
       TYPE deptno_tbl    IS TABLE OF dept.deptno%TYPE    INDEX BY BINARY_INTEGER;
       TYPE dname_tbl    IS TABLE OF dept.dname%TYPE    INDEX BY BINARY_INTEGER;
       TYPE loc_tbl      IS TABLE OF dept.loc%TYPE      INDEX BY BINARY_INTEGER;
       t_deptno           deptno_TBL;
       t_dname           dname_TBL;
       t_loc             loc_TBL;
   
       CURSOR emp_cur IS SELECT * FROM dept;
   BEGIN
       OPEN emp_cur;
       FETCH emp_cur BULK COLLECT INTO t_deptno, t_dname, t_loc;
        CLOSE emp_cur;
        ...



FETCH BULK COLLECT INTO ROWTYPE
+++++++++++++++++++++++++++++++

Emulation of fetch bulk collect into %ROWTYPE collection is similar to regular fetch bulk collect, but we should use temporary record variable(for some reason, using .elem field as with table type doesn't work in PG).

.. code-block:: sql
   :linenos:

   declare
       TYPE emp_tbl IS TABLE OF emp%ROWTYPE INDEX BY BINARY_INTEGER;
       t_emp           EMP_TBL;
       CURSOR emp_cur IS SELECT * FROM emp;
   BEGIN
       OPEN emp_cur;
       FETCH emp_cur BULK COLLECT INTO t_emp;
    
       CLOSE emp_cur;
       ....



