.. _user_types:


User Types
==========

**Declaring**
+++++++++++++

For declaring a variable of user type, we use the prefix ``LBR$UT$`` for any user type and join all parts of a name with ``$`` for the complex names.  Also, for variables of user types without initialization, we insert explicit initialization with a function call with the default constructor function.

.. code-block:: sql
   :linenos:

   --Oracle
   DECLARE
     default_week pack.rectype;
     default_week2 global_col_type := global_col_type(N'MoMo', N'TEST');
   BEGIN
     NULL;
   END;



**In package**
++++++++++++++
For the type in a package, we change the name of the type to a ``<package_id>$<type_id>`` and 
create the same functions as for local except we change the name of the constructor function to a ``lbr$m$<package_id>$<type_id>``. This is 
because of the translation of accessors ``DECLARE V P1.Rec = P1.Rec();`` will become ``DECLARE V P1$Rec = lbr$m$P1$Rec();``



**Records**
+++++++++++

We replace the record type declaration with a ``CREATE TYPE``. We change the name to join its parts with the ``$`` symbol and add the prefix ``LBR$UT$``. In addition, we create: 

**1.** Setter and getters for each field of records.

**2.** Constructor function with a type name without a prefix that creates a certain type. Fields are initialized here with default values.

**3.** Default constructor function with ``$DEF`` at the end of the name. The default constructor calls the regular constructor.



**Anonymous block**

Create a type and function it in the ``PG_TEMP`` schema. Also, constructors, setters, and getters should be called from ``PG_TEMP`` schema. After the anonymous block, we should drop the type with the ``CASCADE`` option. The construction function should have parameters corresponding to the records attribute to transfer default values.

`Example`

.. code-block:: sql
   :linenos:

   --Oracle
   DECLARE
     t NUMBER := 11;
     TYPE r1 IS RECORD (a NUMBER DEFAULT 3 * t,  b NUMBER );
     v1 r1 := r1();
   BEGIN
     DBMS_OUTPUT.put_line('v1.a - ' || v1.a);
     t := 0;
     DECLARE 
       v2 r1;
     BEGIN
       DBMS_OUTPUT.put_line('v2.a - ' || v2.a);
     END;
   END;



Not yet implemented:

**1.** NOT NULL attribute constraints.

**2.** Issues with default values and NULL values. Oracle doesn't treat NULL literal as the default value.



**Collections**
+++++++++++++++

We change the name to join its parts with the ``$`` symbol and add the ``lbr$ut``  prefix.



**Associative collection**

When working with associative arrays, we need to create an object with two PG arrays. One is for indexes, another is for values, for example:

Since in Oracle, an associative array is created immediately with a variable (cannot be NULL) we need to check if it is NULL and create one if needed.

After this is the FIRST method of an associative array:

Because PG has very limited support for types polymorphism, we need to generate the methods for each collection declaration. In the future, we can optimize this to generate only one method of key/value type combination. If the corresponding pair doesn't exist, we generate another one and global. But for now, it is enough to generate each method for each collection type constructor.

As associative arrays are always ordered, we should order them manually in the setter.



**In package**

For the collection in a package, we change the name of the type to a ``<package_name>$<collection_name>``  and create the same functions as for local, except we change the name of the constructor function to a ``lbr$m$<package_name>$<record_name>``.

For each package variable of collection type, we create an additional setter and getter. For example:

.. code-block:: sql
   :linenos:

   --Oracle
   CREATE OR REPLACE PACKAGE p1 IS
     -- Associative array indexed by string:
     TYPE population IS TABLE OF NUMBER -- Associative array type
       INDEX BY VARCHAR2(64);           -- indexed by string
   
     city_population population; -- Associative array variable
   END;




**Nested tables and Varrays**

We convert Nested tables and Varrays to a Postgres Type as well. For VARRAY, we store max length in addition to values.

.. code-block:: sql
   :linenos:

   TYPE foursome IS VARRAY(4) OF VARCHAR2(15);




For NESTED TABLE, we store placeholders for deleted elements(the ORACLE ``DELETE`` method of the nested table just marks elements rather than deletes them).

.. code-block:: sql
   :linenos:

   TYPE roster IS TABLE OF VARCHAR2(15);




**FORALL loop**

We emulate the FORALL loop with extended DML that is used inside of it. In extended DML, we use subquery over bounds that are specified in FORALL bounds clause.

.. code-block:: sql
   :linenos:

   FORALL i IN prodList.FIRST..prodList.LAST
    UPDATE emp
    SET ename = 'UP'||'DATED'
    WHERE empno > prodList(i);

.. code-block:: sql
   :linenos:

   FORALL i IN prodList.FIRST..prodList.LAST
     DELETE FROM emp WHERE empno < prodList(i);

.. code-block:: sql
   :linenos:

   FORALL i IN prodList.FIRST..prodList.LAST
     INSERT INTO emp (empno, ename) VALUES (prodList(i),'INSERTED');




**Not yet implemented**

**1.** Multiset conditions ().

**2.** Calling methods that modify arrays for multidimensional arrays (DELETE, EXTEND).

**3.** Array comparison. (Two nested table variables are equal if and only if they have the same set of elements (no ordering)).



**Objects**
+++++++++++

`Fields`:
Fields of the object are implemented similarly to records with setters and getters for the corresponding field.

`Methods`:
Not yet implemented.



