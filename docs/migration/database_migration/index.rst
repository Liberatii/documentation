.. _database_migration:

Database Migration
++++++++++++++++++


An API for database migration is available. By default, the server operates within the same container as LGW. For a comprehensive API reference, please access the following 
link: `Migration API <https://liberatii.github.io/documentation/migration-api/>`_

There is a tutorial in Jupiter notebook available at `MigrationHR.ipynb <https://drive.google.com/file/d/118Y4YqPTy6kuKnR-8z2wV9VVCbZIzlDM/view?usp=drive_link>`_

.. note::

    To run the notebook your Python environment should have ``jupyterlab``, ``ipython-sql``, ``psycopg2`` (or ``psycopg2-binary``), ``cx_Oracle`` installed. And it also need ``curl`` command line utility in PATH environment variable.


.. toctree::
   :maxdepth: 2
   :hidden:

   Configuration <configuration>
   Initialization <initialization>
   Schema migration <schema_migration>
   Data migration <data_migration>
   Verification <verification>
   Synchronising Databases <synchronising_databases>
   Testing <testing>