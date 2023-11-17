.. _sql_aliases:


SQL Aliases
+++++++++++
For each subquery, we add an alias if it doesn't exist.  
``DTA$<index>`` 

.. code-block:: sql
   :linenos:

   --Oracle
   SELECT 1 FROM (SELECT 1 FROM DUAL);
   
   
   --PostgreSQL:
   SELECT 1 FROM (SELECT 1 FROM DUAL) DTA$1;



We add ``AS`` keyword before ``SELECT`` item alias if it was missed.

.. code-block:: sql
   :linenos:

   --Oracle
   SELECT 1 ONE FROM DUAL;


   --PostgreSQL
   SELECT 1 AS ONE FROM DUAL;




**Issues**

For missed select item aliases we should add aliases with names equal to the select item expression.



