.. _cursors:

Cursors
=======

Postgres has cursor variables with which we can implement most of the Oracle cursors

Cursor type and ref cursors

.. code-block:: sql
   :linenos:

    --Oracle
    DECLARE
     TYPE empcurtyp IS REF CURSOR RETURN employees%ROWTYPE;  -- strong type
     TYPE genericcurtyp IS REF CURSOR;                       -- weak type
   
     cursor1  empcurtyp;       -- strong cursor variable
     cursor2  genericcurtyp;   -- weak cursor variable
     my_cursor SYS_REFCURSOR;  -- weak cursor variable
   
     TYPE deptcurtyp IS REF CURSOR RETURN departments%ROWTYPE;  -- strong type
     dept_cv deptcurtyp;  -- strong cursor variable
   BEGIN
     NULL;
   END;



Explicit cursors declaration
   
.. code-block:: sql
   :linenos:

    --Oracle
    DECLARE
     CURSOR cparam(p1 NUMBER, p2 VARCHAR2) RETURN c1%ROWTYPE IS
       SELECT * FROM departments
       WHERE p1 = department_id AND p2 = department_name;
   
   BEGIN
     OPEN cparam(123, 'st_clerk');
   END;
   /



Cursor attributes

.. code-block:: sql
   :linenos:

   --Oracle
   DECLARE
     CURSOR c1 RETURN departments%ROWTYPE IS  -- Define c1,
       SELECT * FROM departments;              -- repeating return type
        
     the_row Rec;
   BEGIN
     IF NOT c1%ISOPEN THEN
       DBMS_OUTPUT.PUT_LINE('NOT OPEN');
     END IF;
     OPEN c1;
     FETCH c1 INTO the_row;
     IF c1%FOUND THEN  -- fetch succeeded
       DBMS_OUTPUT.PUT_LINE('Name = ' || the_row.f2 );
     END IF;
       
     IF c1%NOTFOUND THEN -- fetch failed
       DBMS_OUTPUT.PUT_LINE('DATA NOTFOUND!!');
     END IF;
   
     IF c1%ROWCOUNT = 1 THEN
        DBMS_OUTPUT.PUT_LINE('Fetched 1st row');
     END IF;
       
     IF c1%ISOPEN THEN
        DBMS_OUTPUT.PUT_LINE('STILL OPEN!!');
     END IF;
     CLOSE c1;
   END;



``%ROWTYPE`` of cursor

.. code-block:: sql
   :linenos:

   --Oracle
   DECLARE
     CURSOR c IS
       SELECT first_name, last_name, phone_number
       FROM employees;
    
     friend c%ROWTYPE;
   BEGIN
     friend.first_name   := 'John';
     friend.last_name    := 'Smith';
     friend.phone_number := '1-650-555-1234';
     
     DBMS_OUTPUT.PUT_LINE (
       friend.first_name  || ' ' ||
       friend.last_name   || ', ' ||
       friend.phone_number
     );
   END;
 


REFCURSOR in package
++++++++++++++++++++

For cursor type in the package, we create composite type and corresponding setters and getters for each cursor attribute

.. code-block:: sql
   :linenos:

   --Oracle
   CREATE OR REPLACE PACKAGE app_libutils is
     -- Ref Cursors Types
     TYPE c_team_list IS REF CURSOR RETURN r_team_list;
   END app_libutils;




The opening cursor of package retype. We create a temp simple variable of REFCURSOR type for passing it to OPEN of FETCH statement and write it back after the operation

.. code-block:: sql
   :linenos:

   --Oracle
    DECLARE
        TeamList c_TeamList;
     BEGIN
        OPEN TeamList FOR
             SELECT rtm_team FROM vws_res_team WHERE rtm_link_id = ExclusionID AND rtm_type='PERSON'; 
        if (TeamList%isopen) then
          DBMS_OUTPUT.PUT_LINE('OPEN' );
        end if;
      END ;



 