.. _database_migration:

Database Migration
++++++++++++++++++


An API for database migration is available. By default, the server operates within the same container as LGW. For a comprehensive API reference, please access the following 
link: `Migration API </migration-api/>`_

Please note, however, that when deploying the managed application, you should replace "lgw" with the IP address of the deployed virtual machine.

There is a tutorial in Jupyter notebook available at `MigrationHR.ipynb </tutorial/MigrationHR.ipynb>`_

.. note::

    To run the notebook your Python environment should have ``jupyterlab``, ``ipython-sql``, ``psycopg2`` (or ``psycopg2-binary``), ``cx_Oracle`` installed. And it also needs ``curl`` command line utility in PATH environment variable.


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
