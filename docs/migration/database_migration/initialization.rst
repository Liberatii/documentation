.. _initialization:



Initialization
++++++++++++++

In the first stage, the migration framework collects schema and various properties of the source database and stores them in the target database. This information will be used in all other stages of the migration, such as object dependencies, tables/index sizes, and so on.

This step is required and it must run before any other stage. It cannot be parallelized, but it's pretty quick.

To run it specify its name in ``stage`` ``init`` of /operation POST method.