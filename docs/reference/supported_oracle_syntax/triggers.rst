.. _triggers:

Triggers
========

The main difference between Oracle and Postgres triggers is the PostgreSQL trigger's function which is invoked by a trigger.

`Oracle 19 Create Trigger <https://docs.oracle.com/en/database/oracle/oracle-database/19/lnpls/CREATE-TRIGGER-statement.html#GUID-AF9E33F1-64D1-4382-A6A4-EC33C36F237B>`_

`Postgres Create Trigger <https://www.postgresql.org/docs/11/sql-createtrigger.html>`_

`Postgres trigger functions <https://www.postgresql.org/docs/current/plpgsql-trigger.html>`_

.. code-block:: sql
   :linenos:

   --Oracle
   CREATE TRIGGER after_tr_test
   AFTER INSERT OR UPDATE OR DELETE
   ON tr_test
   FOR EACH ROW
   BEGIN
     DBMS_OUTPUT.PUT_LINE('   old.id:' || :old.id || '|');
     DBMS_OUTPUT.PUT_LINE('   new.id:' || :new.id || '|');
     DBMS_OUTPUT.PUT_LINE('  old.txt:' || :old.txt || '|');
     DBMS_OUTPUT.PUT_LINE('  new.txt:' || :new.txt || '|');
   END;
   /


 

Also, PostgreSQL triggers don't have trigger conditions inside the trigger's body. We emulate them with TP_OP special variable:


.. list-table:: 
   :widths: 50
   :header-rows: 1

   * - **OracleDB**
   * - INSERTING
   * - DELETING
   * - UPDATING
   * - UPDATING(column_id)



For dropping triggers, Postgres should know the table on which it was created.

.. code-block:: sql
   :linenos:

   --Oracle
   DROP TRIGGER trigg;

|

**Limitations**

**1.** Compound triggers don't support yet (can be emulated by splitting to simple triggers).

**2.** System triggers don't support this yet (can be emulated with Postgres event triggers).

**3.** PostgreSQL doesn't support referencing NEW pseudo records in the DELETE trigger's WHEN clause and OLD pseudo-records in the INSERT trigger's WHEN clause (referencing them in the trigger's function body is ok).

**4.** UPDATE(column) in the STATEMENT trigger doesn't support it.




 