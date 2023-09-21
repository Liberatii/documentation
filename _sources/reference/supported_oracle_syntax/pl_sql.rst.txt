.. _pl_sql:


PL/SQL
======

Block
+++++


We wrap anonymous blocks with ``DO $$ ... $$`` and for procedures and functions we wrap the bodies with ``$$...$$ LANGUAGE plpgsql``.

**Oracle DB**

.. code-block:: sql
   :linenos:

   --Anonimus blocks
   declare
   begin
      ...
   end;
   
   
   --Functions
   CREATE OR REPLACE FUNCTION f (...)
     RETURN <ret_type>
   IS
   BEGIN
    ...
   END;
   
   
   --Procedures
   CREATE OR REPLACE PROCEDURE p (...)
   IS
   BEGIN
     ...
   END;



Procedures call 
+++++++++++++++

We just added ``CALL`` keyword before calling procedures in the PL/PGSQL block.



%TYPE attribute
+++++++++++++++
Postgres can handle this almost like Oracle does, but it has a few limitations. Postgres cannot use ``%TYPE`` attribute in the column definition of table or type. So we substitute ``%TYPE`` attribute with the real column type by getting the column's metadata from DB in this case.



Select into
+++++++++++

To ensure that we select only one row and that any related error is generated if we do not, we use the ``STRICT`` keyword.



