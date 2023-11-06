.. _jdbc:

JDBC
====

The **Java Database Connectivity** API defines how a Java client my access a database.
It connects to the database by dynamically loading Java packages and registering
them with the JDBC Driver Manager.

For Oracle connections a :code:`ojdbcN.jar`, where :code:`N` is the version of
the connector, is used to register a JDBC Driver capable of connecting to
Oracle databases.

The Oracle JDBC Driver operates in one of two modes: "thin" (Type-4) and "thick"
(Type-2). The "thin" mode is a pure-Java implementation of the Oracle wire protocols
built on top of Java sockets. The "thick" mode uses the :ref:`oci` driver.

The Liberatii Driver
--------------------

The Liberatii JDBC Driver is an implementation of the JDBC Driver specification
that provides connectivity to Liberatii Gateway.

Replacing the JDBC Driver
-------------------------

If the application is using the Oracle JDBC Driver in "thick" mode then it is
possible to replace the :code:`oci.dll` or :code:`liboci.so` following the instructions
in the :ref:`oci` reference.

If the application is using the Oracle JDBC Driver in "thin" mode then the jar
file (:code:`ojdbcN.jar`) must be replaced with one supplied by Liberatii. In
this case the application will have a setting of the following form:

.. code-block::
   :caption: Connection string

    jdbc:oracle:thin:@<hostname>:1521:pdborcl

Once the :code:`ojdbcN.jar` file has been replaced the connection string can
be modified to point to the Liberatii Gateway.

Notes
-----

For most applications the :code:`ojdbcN.jar` file is used intact but it is
common for applications to use a different name or even a modified version of this.
In this case replacement of the driver will require Liberatii's assistance.


