.. _running_sql_statements:

Running SQL Statements
======================

Applications
++++++++++++

Liberatii Gateway from the client application looks like a PostgreSQL database which accepts Oracle queries. So the application using it should replace its connectivity driver (or library) with a PostgreSQL connectivity driver or a driver provided by Liberatii.

If an application uses JDBC/ODBC connectivity technology it's likely enough to replace it with any PostgreSQL JDBC/ODBC drivers pointing to Liberatii Gateway rather than to a real PostgreSQL database. There are however some usages where this may not work. Mostly because the driver itself expects the queries to have PostgreSQL syntax. In this case, Liberatii can provide their own drivers. 

|

IDEs
++++

To use LGW in IDE it's enough to replace the driver. However, some IDE also expects the query to be in the target SQL language. 

To replace the JDBC driver in DBeaver, follow the instructions:

- Select Database->Driver Manager

.. figure:: images/DBeaver_01.png
    :width: 100%
    :align: center

|
|

- Press new driver

.. figure:: images/DBeaver_02.png
    :width: 100%
    :align: center

|
|

- Fill same as below picture

.. figure:: images/DBeaver_03.png
    :width: 100%
    :align: center

|
|

- Add liberatii jdbc driver

.. figure:: images/DBeaver_04.png
    :width: 100%
    :align: center

|
|

- Press the Find class button, and select liberatii.jdbc class

.. figure:: images/DBeaver_05.png
    :width: 100%
    :align: center

|
|

- Use Liberatti LGW driver for adding new connection

.. figure:: images/DBeaver_06.png
    :width: 100%
    :align: center

|
|

- Point your parameters of connection (host, port, database, username, password)

.. figure:: images/DBeaver_07.png
    :width: 100%
    :align: center

|
|

- Press button Test Connection ...

.. figure:: images/DBeaver_08.png
    :width: 100%
    :align: center

|
|

.. warning::

    WARNING: DBeaver doesn't understand the query is in Oracle syntax, so you cannot just run the whole buffer. For simple queries, it's possible to select them all and press Alt-X. But for complex ones (e.g. PL/SQL DDLs) it works only by selecting a single statement and pressing Ctrl(Command on Mac)-Enter.

|
|
|

Using `psql`
++++++++++++

The standard PostgreSQL client utility can be used to run Oracle's query as well. Just connect to the Liberatii Gateway instead of PostgreSQL. However, psql doesn't know if it works with Oracle SQL syntax and may unexpectedly split the queries on semicolons or something else sending them separately. Liberatii Gateway won't be able to understand this. To avoid this just wrap Oracle queries with $LBR$ tags. For example:

.. code-block:: 
   :linenos:

    postgres=# $LBR$ 
    CREATE PACKAGE my utils
    ....
    $LBR$;

