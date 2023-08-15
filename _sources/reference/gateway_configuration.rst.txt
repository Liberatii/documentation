.. _gateway_configuration:


Gateway configuration
=====================


There are quite a few options available for the Liberatii Gateway. They can be changed in an API file or using REST API.

To enable a verbose trace to specify in the config file:

.. code-block:: bash
   :linenos:

   verbose = 2

|

Or use REST API like this:

.. code-block:: bash
   :linenos:

   $ curl http://lgw/gateway/config -b '{"verbose": 2}'

|

To get the current value use:

.. code-block:: bash
   :linenos:

   $ curl http://lgw/gateway/config/verbose

|

Some options may require a restart, for the local LGW use:

.. code-block:: bash
   :linenos:

   $ sudo systemctl restart lgw

|

And with REST API:

.. code-block:: bash
   :linenos:

   $ curl -X POST http://lgw/gateway/restart

|

When migrating data (if not a direct connection is used) we need to disable queries timeouts:

.. code-block:: bash
   :linenos:

   query_timeout = 0
   query_wait_timeout = 0

|

Azure Flexible server instance requires connection to be encrypted:

.. code-block:: bash
   :linenos:

   server_tls_sslmode = allow

|

Info-queries interface
++++++++++++++++++++++

The translator needs to run some meta-data queries sometimes, it uses a special role which should have read access to dbt and pg_catalog schemas. To specify the credentials use:

.. code-block:: bash
   :linenos:

   infoquery_user = lgw
   infoquery_password = lgwpwd

|

Numeric conversion
++++++++++++++++++

.. code-block:: bash
   :linenos:

   translator_option_num_family_cast = disable # or enable

|

To use numerics instead of ints/shorts etc.


Translator scripts debugging
++++++++++++++++++++++++++++

To use TypeScript translator instead of the compiled one use:

.. code-block:: bash
   :linenos:

   translator_mode = script
   # script, fast, none

|

Ignore TO_CHAR cast
+++++++++++++++++++

For columns in logical conditions, this option ignores TO_CHAR cast if the second operand is string literal

like ``WHERE TO_CHAR(column)='string'``. Enable - removes TO_CHAR.

.. code-block:: bash
   :linenos:

   translator_option_str_cond_cast = enable # or disable

|

Query wrapping
++++++++++++++

The translator receives not only Oracle-dialect queries but also sometimes PG dialect. JDBC/ODBC drivers, OCI and IDEs run some meta-data queries too, and they can use PG dialect for this. For the migrating applications, we may want to run queries in different dialects too.

By default, the translator tries to translate everything and if it encounters parser errors it assumes it is PG dialect query and tries to run it as is. This however doesn't always work because the query can be perfectly parsed as Oracle but it doesn't run on PG. For example, because the translator translated all identifiers into upper case, while they are lower case by default on PG.

To manage this translator uses special wrappers. Everything between ``$LBR$`` delimiters is considered to be an Oracle dialect query. For example:

.. code-block:: 
   :linenos:

   $LBR$ select 1 from dual $LBR$

|

Everything between ``$LBR!$`` is considered to be a PG dialect query:

.. code-block:: 
   :linenos:

   $LBR!$ select 1 from "DUAL" $LBR!$

|

Queries without these tags are still attempted to be translated from Oracle to PG. To disable this execute this query:

.. code-block:: 
   :linenos:

   $LBRC$ wrap=on $LBRC$

|

After this, all queries without tags are considered PG dialect queries. To disable this run query:

.. code-block:: 
   :linenos:

   $LBRC$ wrap=off $LBRC$

|

To check the current value execute:

.. code-block:: 
   :linenos:

   $LBRC$ wrap $LBRC$

|

The value is stored connection-wide. Each connection should run the setting if it needs anything not-default.

There are also legacy variants for these queries used in some drivers. They still work but they shouldn't be used in any new one - ``$LBR wrap$`` / ``$LBR nowrap$`` / ``$LBR check$``.

|

Severity
++++++++

By default translator even if it encounters any error tries to execute the resulting query. So even if everything is broken the DB will return the error report. Sometimes, however, we want it to raise an exception. Such behaviour can be specified using a dedicated pgbouncer option:

.. code-block:: bash
   :linenos:

   translator_severity=1

|

The default value is ``0`` - trying to execute the resulting query in any case. If the value is 1 the query will respond with an exception if the translator reports any error. And if the value is 2 the query throws an exception if the translator finds any warning.

This option can be specified for a connection. For this execute the following query:

.. code-block:: 
   :linenos:

   $LBRC$ severity = 2 $LBRC$

|

And to check the current value run:

.. code-block:: 
   :linenos:

   $LBRC$ severity $LBRC$

|

Translator cache
++++++++++++++++

The query translation can be cached. The cache is stored in the LGW memory. All numeric and string constants are replaced with @LBR$PH$<num> placeholder. So no data should be stored in the memory, but the DB schema is kept in the memory.

Add the following in the pgbouncer config to enable the translator cache:

.. code-block:: bash
   :linenos:

   tqc = enable
   tqc_size = 5000

|

The ``tqc_size`` parameters specify how many queries can be cached - the least recent records will be removed on overflow.

It's possible to disable DDLs caching, since it's quite unlikely they are executed more than once, use:

.. code-block:: bash
   :linenos:

   tqc_ddl = disable

|

If the query is translated fast enough by the translator there is no need to cache it, use the following to specify such threshold in milliseconds:

.. code-block:: bash
   :linenos:

   tqc_mem_threshold = 5

|

The cache may be loaded from the DB on startup, this way we can specify manual translation if the query has hardcoded constants.

.. code-block:: bash
   :linenos:

   tqc_db_load = enable

|

It will load the queries from ``dbt.query_translation`` view, and it should have the following columns:

- ``input_query`` - Oracle dialect query

- ``output_query`` - the translated PG dialect query

- ``init_query`` - the queries we execute before executing output_query

- ``bindNames`` - comma-separated list of bind parameters in the query

- ``bindIndexes`` - comma-separated list of bind indexes in the query

- ``error`` - translator error message

- ``warning`` - translator warning message

- ``sqlType`` - the type of the query, e.g. CREATE, UPDATE, etc


The ``input_query`` parameters can contain multiple queries if they are separated by ``/`` in a separate line.

The translator can dump the query into the database itself (in ``lbr$data.cache_input`` table). So it won't be translated again even after the translator restart. To enable this use:

.. code-block:: bash
   :linenos:

   tqc_db_store = enable
   tqc_db_threshold = 1000

|

Here ``tqc_db_threshold`` is the minimum translation time in milliseconds to dump the query into the DB. In this example, only the queries taking more than a second are dumped.

It's also possible to disable automatic translation:

.. code-block:: bash
   :linenos:

   tqc_auto_translate = disable

|

In this case, only the queries from the DB will be translated, the remaining will throw an exception. This is needed if we need to improve the security and the application doesn't use binds and only generates queries by concatenation parameters into the query itself. So to avoid SQL injection we can first run a learning pass where all possible queries are executed and stored in the DB. Next, we disable auto-translation so if any SQL is injected it won't work.

Manual query translation
++++++++++++++++++++++++

The query cache described above can be used to add manual query translation in case anything isn't supported by the gateway or there is an option with better 
performance. For this just add a row into ``lbr$data.manual_translation`` (with the same columns as ``dbt.query_translation`` described above). This requires restarting the gateway. 

Since the ``input_query`` must be in a special normalised form, it's easier to record the input query 
in ``lbr$data.cache_input`` with ``tqc_db_store = enabled; tqc_db_threshold = 0`` and move the row 
from ``lbr$data.cache_input`` to ``lbr$data.manual_translation`` replacing ``output_query`` to the new custom translation. It should use the same placeholders for copying the constants between the queries.

There is also another table for the query replacement, but it's only matched by the query input text, so case sensitive and doesn't have placeholders for constants. For 
this just insert a query into ``dbt.manual_translation_table`` with the following columns:

- ``id`` - unique identifier.

- ``src`` - the input query to be matched.

- ``dst`` - the query will be replaced with.

- ``bind`` - the list of bind variables.

For example:

.. code-block:: sql
   :linenos:

   insert into dbt.manual_translation_table(src,dst) values(
       'BEGIN user_context_pkg.set_app_user_lang($1)', 
       'CALL "lbr$m$DBMS_APPLICATION_INFO$SET_CLIENT_INFO"($1)');

|

Meta-queries cache
++++++++++++++++++

Sometimes translator needs to query schema information from the DB. This adds some latency, but it can be cached. To enable this use these pgbouncer config options:

.. code-block:: bash
   :linenos:

   tmqc = enable
   tmqc_size = 5000

|

The size parameter specifies how many queries can be cached.

The cache is stored in the LGW memory. It may contain some information about schema.

|

 