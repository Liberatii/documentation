.. _data_migration:

Data migration
++++++++++++++

Data migration is run in a stage called ``data``. As the schema migration, this stage can be parallelized or stopped and restarted without losing already transmitted data. 

There are many options for data migration depending on what table is in the DB.

By default, it's one pass load from Oracle and publishes to PG in one pass (``dataOnePass: true``). However, this approach means if the table is too large and something wrong happens in the middle, the whole process must be restarted from the very beginning (but only for this table) and the data that are already copied must be copied again. This is fine for tables up to 10G, assuming there are no problems with network connectivity and speed. Different tables can be copied in parallel with any set options, though. Just start a few migration processes simultaneously for this.

In case some tables are big to afford to restart from scratch in case of any problem, or there are problems with internet connections, it's possible to split tables into chunks. To achieve this, specify ``dataOnePass:false``, ``parTables: true``. The size of the chunk to copy at once, say: ``dataChunkSize: 1024*1024*1024*10``. In case of a problem, only this chunk coping must be restarted. And now it's possible to copy a single table in parallel by running more than one instance of the migration operation simultaneously.

By default, it uses ROWID for splitting the tables, this isn't efficient because Oracle DB will, by default, run sequence scans for each chunked query. If the table already has a numeric primary key, it's better to specify it as the chunking column like using ``idCol: "<id>"`` parameter, or it's possible to specify it per table using:

.. code-block:: JSON
   :linenos:

   "idColByTable": {

       "ORDER_ITEMS": "ORDER_ID",

       // .....

     },


If the primary key isn't available, it's possible to stage the table into a file or a table in another schema. This, however, will require extra space in the DB or on the file system. To stage a table snapshot into another schema on the same DB, use ``stagingSchema`` parameter. And to stage a table first to a file system, use ``stagingDir`` parameter. Note, to copy files first to NFS, HDFS, Azure BLOB, S3, etc., just mount them to some ``stagingDir``.

If there is no direct connection between the source and the target, you can use ``separateStaging:true``. And after running the first "staging" step where the source is accessible with stagingDir parameter pointing to a local or remote filesystem directory. And after this, run the "data" stage on a system where the target DB is available with ``stagingDir`` pointing to the files from the former step.

There are also a few fine-tuning parameters. Check the full API reference for more details.