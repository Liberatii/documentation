.. _synonyms:

SYNONYMS
========

In PostgreSQL there is no direct analogue of Oracle's synonym. So we just store the synonym name and its reference object to a table ``dbt.synonyms``, and substitute the synonym name in SQL to a referenced object.

OracleDB

.. code-block:: sql
   :linenos:

   CREATE SYNONYM countries FOR hr.countries;
   /
   Select * From countries;
   /
   Drop SYNONYM countries;
   /



