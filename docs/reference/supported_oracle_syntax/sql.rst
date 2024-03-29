.. _sql:


SQL
===

**Outer join operators**
++++++++++++++++++++++++

Outer Join operators like ``(+)`` are translated into ``OUTER JOIN`` ANSI SQL Syntax. For example:

.. code-block:: sql
   :linenos:

   --Oracle
   SELECT * 
     FROM table1 t1, table2 t2, table3 t3 
    WHERE t1.name(+) = t2.name 
      AND t1.name = t3.name;



**ROWNUM/ROWID pseudo columns**
+++++++++++++++++++++++++++++++

``ROWID`` is translated into ``OID``:

.. code-block:: sql
   :linenos:

   --Oracle
   SELECT ROWID, last_name  
     FROM employees
    WHERE department_id = 20;




- ``ROWNUM`` in ``SELECT`` columns list is translated into a window function ``row_number``.

- ``ROWNUM`` in ``WHERE`` of ``SELECT`` is translated into ``LIMIT`` if possible.

For example:

.. code-block:: sql
   :linenos:

   --Oracle
   SELECT item_num, order_num
     FROM items 
    WHERE item_num < 10 
      AND ROWNUM < 6
      AND order_num > 100;




``ROWNUM`` in ``UPDATE`` is translated into a runtime function call calculating the next value.

.. code-block:: sql
   :linenos:

   --Oracle
   UPDATE employees SET employee_id = ROWNUM, manager_id = ROWNUM;




Other usages aren't supported.




**CREATE SEQUENCE**
+++++++++++++++++++

PostgreSQL has ``CREATE SEQUENCE`` syntax with some differences:

**1.** The limit for ``MAX VALUE`` in Postgres is 9223372036854775807.

**2.** Remove next clauses ``NOORDER`` ``NOCACHE`` ``GLOBAL`` ``KEEP`` ``NOKEEP`` ``SESSION`` ``SCALE``.

**3.** Replace: ``NOCYCLE`` -> ``NO CYCLE``  ``NOMINVALUE`` -> ``NO MINVALUE``  ``NOMAXVALUE`` -> ``NO MAXVALUE``



**UNIQUE in SELECT statement**
++++++++++++++++++++++++++++++

``UNIQUE`` is the Oracle's synonym for ``DISTINCT``. So we replace ``UNIQUE`` with ``DISTINCT``.



PIVOT clause
++++++++++++

For emulation, we transform PIVOT into Decode form with aggregation and translate this:

.. code-block:: sql
   :linenos:

   --Oracle
   SELECT * FROM
   (SELECT EXTRACT(YEAR FROM order_date) year, order_mode, order_total FROM orders)
   PIVOT
   (SUM(order_total) FOR order_mode IN ('direct' AS Store, 'online' AS Internet));



**UNPIVOT clause**
++++++++++++++++++

**Oracle unpivot single column**

Example:

.. code-block:: sql
   :linenos:

   --Oracle
   SELECT * FROM sale_stats
    UNPIVOT INCLUDE NULLS(
       quantity
       FOR product_code 
       IN (
           product_a AS 'A', 
           product_b AS 'B', 
           product_c AS 'C'
       )
    );
 


To achieve this result in PostgreSQL, we will define an array of values that will act as the values that represent each quarterly column, followed by an array that specifies each of the columns that correspond to those quarters. We will unnest both of those arrays, and that will give us paired values for each quarter and the amount of that quarter.

.. note::

   If the original query uses an asterisk we need to read the metadata and exclude columns that are used in UNPIVOT clause



**Ignore NULLS**

For ignoring NULLS, we should wrap the translated query into the top query with the condition.

Oracle EXCLUDE NULLS.

.. code-block:: sql
   :linenos:

   --Oracle
   SELECT * FROM sale_stats
    UNPIVOT (   --EXCLUDE NULLS by default or we can explicit specify  
       quantity
       FOR product_code 
       IN (
           product_a AS 'A', 
           product_b AS 'B', 
           product_c AS 'C'
       )
    );



Oracle unpivot multiple columns.

.. code-block:: sql
   :linenos:

   --Oracle
   SELECT * FROM sale_stats
   UNPIVOT (
      (quantity, amount)
       FOR product_code
       IN (
           (a_qty, a_value) AS 'A', 
           (b_qty, b_value) AS 'B'        
       )
   );



