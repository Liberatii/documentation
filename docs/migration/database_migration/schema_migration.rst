.. _schema_migration:



Schema migration
++++++++++++++++

After initialization is done we can start schema migration. It's split into two stages, with names ``schema`` and ``constraints``. The schema ``stage`` must run before ``init`` and ``constraints`` after ``data``. The second stage is needed to create indexes, constraints and triggers. It's run before the data stage to make the migration process faster and avoid triggers to break something in the database.

Schema migration can be parallelised, for this just run whatever number of threads are needed the migration services will evenly schedule the jobs between the nodes. 

It's also possible to skip some objects' translation, by just updating ``dbt.migration_objects`` table's ``stage`` field to ``S``. All the objects dependent on this one won't be translated too.

We can also adjust original DDLs to remove or change anything not supported by Liberatii. For this just update DDL1 and DDL2 columns of the corresponding ``dbt.migration_objects`` rows before running. DDL1 is executed on the ``schema`` stage, and DDL2 on the ``constraints`` stage.

The schema migration can be stopped and restarted at any time. The migration process won't start from the beginning.  But you may need to reset the ``stage`` column of ``dbt.migration_objects`` to ``I``.