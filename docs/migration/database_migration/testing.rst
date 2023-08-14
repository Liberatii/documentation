.. _testing:


Testing
+++++++

There are several steps for testing. After the data migration the migration service checks hash sums of all the data in the table. It's also possible to provide it with a set of queries to compare their result sets. 

But the most effective way for verification is replaying Oracle workload files on the Oracle snapshot database and PostgreSQL database and comparing the results. For this, it needs a separate Oracle staging sandbox database. So first the data is staged into this separate Oracle DB which is used for testing. The workload files are captured from the source DB. There is a special ``replay`` stage for this. There is a ``workloadsBlob`` parameter to specify the location of the workload files. 