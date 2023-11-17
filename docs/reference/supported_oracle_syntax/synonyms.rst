.. _synonyms:

Synonyms
========

In PostgreSQL there is no direct analogue of Oracle's synonym. So we just store the synonym name and its reference object to a table ``dbt.synonyms``, and substitute the synonym name in SQL to a referenced object.

OracleDB

.. code-block:: sql
   :linenos:

   --Oracle
   CREATE SYNONYM countries FOR hr.countries;
   /
   SELECT * FROM countries;
   /
   DROP SYNONYM countries;
   /



