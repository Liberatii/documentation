.. _configuration:

Configuration
+++++++++++++

The comprehensive migration process is strategically divided into the following pivotal stages:

**1. Initialization (init)**: This initiates by extracting vital metadata from the source database. Subsequently, this information is meticulously stored within the target database through dedicated tables, as elaborated further below.

**2. Schema Migration (schema)**: This phase is dedicated to the migration of the schema. It executes all Data Definition Language (DDL) statements from the source database on the target database, ensuring the seamless transition of the essential structure.

**3. Data Migration (data)**: Herein, the core data migration transpires. The process diligently transfers data from the source to the target, meticulously safeguarding the integrity and fidelity of the information.

**4. Data Consistency Check (check)**: A vital verification step, this phase computes hash sums for all data involved. By comparing these hash sums between the source and target, data consistency is rigorously validated.

**5. Constraints and Artifacts Migration (constraints)**: This pivotal stage orchestrates the migration of intricate components such as indexes, triggers, and constraints from the source to the target. This ensures the complete replication of the operational context.

**6. SQL Consistency Check (checksql)**: Through the execution of a curated list of SQL queries, this step performs a meticulous comparison of result sets. The goal is to ascertain the congruence of outcomes between the source and the target.

**7. Workload Reenactment (replay)**: In this phase, the migration process simulates the original workload by replaying the workload files on both the source and a designated target sandbox database. The consistency and parity of results are rigorously verified.

**8. Continuous Data Change Synchronization (sync)**: The final stage orchestrates Change Data Capture (CDC) synchronization between the databases. This ongoing process ensures that any alterations in the source are promptly propagated to the target, maintaining a real-time, synchronized state.


Each stage contributes fundamentally to a seamless and meticulous database migration, ensuring that the transition is not only accomplished successfully but also with uncompromising integrity.

So the command will not reload schema information from the source DB so that you can change anything right in ``dbt.migration_objects table``.

The table can be updated during the migration. This way we can skip some objects migration, fix the DDLs (in DDL1/DDL2 columns), restart migration of some of the objects,  generate a migration report, and so on.

The table contains the following columns:

- ``type`` - the type of the object

- ``owner`` - the owner of the object

- ``name`` - the name of the object

- ``stage`` - the current migration stage

- ``error`` - the error message in case of failed migration

- ``ddl1`` - the first part of DDL used to create this object on Oracle

- ``ddl2`` - the second part of DDLs used to create this object, and these are usually constraints for tables

There is also a table ``dbt.migration_deps`` for ordering object creation and ``dbt.migration_table_deps`` for ordering the table's constraints creations.

The ``stage`` field of ``dbt.migration_objects`` has the following meanings:

- ``'S'`` - skip this object

- ``'I'`` - an object scheduled for migration

- ``'r'`` - an error happened during initialization

- ``'P'`` - this object is currently translating

- ``'D'`` - this object's schema is migrated

- ``'E'`` - an error happened during schema migration for this object (the error message in the ``error`` column)

- ``'m'`` - this is a table, and now the scripts stages data on Oracle's side

- ``'f'`` - this is a table, and there is an error during staging

- ``'M'`` - this is a table, and the data was staged

- ``'R'`` - the data migration was succesful

- ``'F'`` - the data migration failed (the error message in the ``error`` column)

- ``'p'`` - the table's constraints are currently executing

- ``'d'`` - the table's constraints were successfully applied

- ``'e'`` - there was an error while migrating these table constraints (the error message in the ``error`` column)

- ``'c'`` - the table is being checked now

- ``'i'`` - the table check failed

- ``'K'`` - the table is checked



Absolutely, the advantage of the migration process is that it doesn't necessitate a complete reiteration from the start if adjustments are required. 
Instead, modifications can be made efficiently without initiating an entire migration process. By simply adjusting the ``stage`` column within the ``dbt.migration_objects`` table to the appropriate value, you can effectuate the necessary changes. For instance, suppose you've rectified constraints pertaining to the "DEMO"."DEPARTMENTS" table. In this scenario, executing the following is all that's needed:

.. code-block:: sql
   :linenos:

   update dbt.migration_objects 
      set stage = 'R', ddl2='<correct constraints>' 
    where owner = 'DEMO' and name = 'DEPARTMENTS';


And rerun the script in stage constraints.

It's also fairly simple to migrate the reports, like:

.. code-block:: sql
   :linenos:

   select error, count(*), type 
     from dbt.migration_objects 
   group by error, type;



