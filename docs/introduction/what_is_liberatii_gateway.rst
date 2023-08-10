.. _what_is_liberatii_gateway:

What is Liberatii Gateway?
==========================

Liberatii Gateway is a database virtualisation platform (PaaS) that does real-time SQL translations. It enables Non-Oracle cloud databases such as Microsoft Azure SQL or Azure Database for PostgreSQL to understand applications written originally for Oracle databases.

Liberatii Gateway is a service which sits between legacy applications and a cloud database, such as PostgreSQL. It translates all the arriving queries and data to formats acceptable by PostgreSQL and passes it to the backend database after this. The query result is translated back to Oracle-specific formats so the application doesn't see the difference and keeQLps behaving like it continues working with the Oracle database. Liberatii Gateway translates not only the resulting data but errors in case of some exceptional situation that must be reported to the application side.