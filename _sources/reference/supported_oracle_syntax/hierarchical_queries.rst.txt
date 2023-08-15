.. _hierarchical_queries:

Hierarchical queries
====================



We emulate Oracle's hierarchical queries with CTE.

CONNECT BY 
++++++++++

We emulate ``connect by`` by joining CTE with the source table on PRIOR column from CTE and the child from the source table.

Oracle

.. code-block:: sql
   :linenos:

   SELECT employee_id, last_name, manager_id
     FROM employees
    WHERE department_id = 80
   CONNECT BY PRIOR employee_id = manager_id;

|

LEVEL
+++++

As pseudo column LEVEL always calculates for hierarchical queries adding LEVEL in the top select is enough to have LEVEL in the result set.

Oracle

.. code-block:: sql
   :linenos:

   SELECT employee_id, last_name,      
          manager_id, LEVEL
     FROM employees
    WHERE department_id = 80
    CONNECT BY PRIOR employee_id = manager_id;

|

START WITH
++++++++++

START WITH condition is emulated by adding a condition in the non-recursive part of CTE.

Oracle

.. code-block:: sql
   :linenos:

   SELECT last_name, employee_id, manager_id, LEVEL
     FROM employees
   START WITH employee_id = 100
   CONNECT BY PRIOR employee_id = manager_id

|

ORDER SIBLINGS BY
+++++++++++++++++

In Oracle's hierarchical query, do not specify either ``ORDER BY`` or ``GROUP BY``, as they will destroy the hierarchical order of the ``CONNECT BY`` results. If you want to order rows of siblings of the same parent, then use the ``ORDER SIBLINGS BY`` clause.

To emulate ``ORDER SIBLINGS BY`` clause we store expressions in an array and do a sort in the top ``SELECT``.

Oracle

.. code-block:: sql
   :linenos:

   SELECT last_name, employee_id, manager_id, LEVEL
     FROM employees
   START WITH employee_id = 100
   CONNECT BY PRIOR employee_id = manager_id
   ORDER SIBLINGS BY last_name;

|

CONNECT_BY_PATH
+++++++++++++++

To emulate ``CONNECT_BY_PATH`` we store columns in an array and call PostgreSQL ``array_to_string`` function.


Oracle

.. code-block:: sql
   :linenos:

   SELECT last_n
          LEVEL, 
          SYS_CONNECT_BY_PATH(last_name, '/') "Path"
     FROM employees
    WHERE level <= 3 AND department_id = 80
    START WITH last_name = 'Hunold'
   CONNECT BY PRIOR employee_id = manager_id AND LEVEL <= 4;

|


CONNECT_BY_ISCYCLE
++++++++++++++++++

To emulate CONNECT_BY_ISCYCLE  we store child columns in an array and check if the parent column value exists in this array. Also, we init CONNECT_BY_ISCYCLE  column with 0.

Oracle

.. code-block:: sql
   :linenos:

   SELECT last_name, CONNECT_BY_ISCYCLE "Cycle",
          LEVEL, SYS_CONNECT_BY_PATH(last_name, '/') "Path"
     FROM employees
    WHERE level <= 3 AND department_id = 80
    START WITH last_name = 'Hunold'
   CONNECT BY NOCYCLE PRIOR employee_id = manager_id AND LEVEL <= 4;

|

