.. _verification:


Verification
++++++++++++

There are three verification steps currently supported by the migration services. The most basic one is done when it runs the ``check`` stage. This queries all the migrated tables and columns on the source and the targets and calculates their hash sum (the hash algorithm can be selected in the configuration). And if something isn't matching, it returns an error.

The next step is to load files with SQL queries and run them on both databases, comparing the hash sums of their results and their execution time, checking there are no data or performance problems. This is done in the ``checksql`` stage. The globs of the SQL file paths are provided using the ``activeSqlFiles`` parameter.

And the most efficient but hardest to configure stage is ``replay``. This needs captured workload files from the production database. They are run on a test sandbox Oracle database and on PostgreSQL via Liberatii Gateway. The results are compared to be matched and the execution time is at least not worse than on Oracle. The workload files location is configured using ``workloadsFiles`` parameter.