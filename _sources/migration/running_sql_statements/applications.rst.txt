.. _applications:

Applications
++++++++++++

Liberatii Gateway from the client application looks like a PostgreSQL database that accepts Oracle queries. So the application using it should replace its connectivity driver (or library) with a PostgreSQL connectivity driver or a driver provided by Liberatii.

If an application uses JDBC/ODBC connectivity technology it's likely enough to replace it with any PostgreSQL JDBC/ODBC drivers pointing to Liberatii Gateway rather than to a real PostgreSQL database. There are, however, some usages where this may not work. Mostly because the driver itself expects the queries to have PostgreSQL syntax. In this case, Liberatii can provide their own drivers. 
