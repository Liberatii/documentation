.. _using_psql:




Using `psql`
++++++++++++

The standard PostgreSQL client utility can be used to run Oracle's query as well. Just connect to the Liberatii Gateway instead of PostgreSQL. However, psql doesn't know if it works with Oracle SQL syntax and may unexpectedly split the queries on semicolons or something else sending them separately. Liberatii Gateway won't be able to understand this. To avoid this, just wrap Oracle queries with $LBR$ tags. For example:

.. code-block:: 
   :linenos:

    postgres=# $LBR$ 
    CREATE PACKAGE my utils
    ....
    $LBR$;
