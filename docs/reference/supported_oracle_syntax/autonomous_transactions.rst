.. _autonomous_transactions:



Autonomous transactions
=======================

Autonomous transactions emulated due to execution SQL via PostgreSQL dblink. We have  to use dblink_fdw to create the remote server and user mapping.

In addition, we create a wrapper for an autonomous function(procedure) with the call of helper function ``dbt.autonous_exec`` with function parameters.

Oracle

.. code-block:: sql
   :linenos:

   CREATE OR REPLACE PROCEDURE prc_log_errors (v_error_code      IN VARCHAR2,
                                               v_error_msg       IN VARCHAR2,
                                               v_plsql_program   IN VARCHAR2)
   AS
      PRAGMA AUTONOMOUS_TRANSACTION;
   BEGIN
      INSERT INTO error_log (ERROR_CODE,
                             ERROR_MSG,
                             DATE_OCCURRED,
                             PLSQL_PROGRAM_REF)
          VALUES (v_error_code,
                  v_error_msg,
                  SYSDATE,
                  v_plsql_program);
   
      COMMIT;
   END;
   /

|

Not yet implemented:

- Outer transaction temp objects aren't visible in the autonomous transaction.
