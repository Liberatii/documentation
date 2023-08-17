.. _ides:

IDEs
++++

Integrating LGW into an IDE primarily involves replacing the driver. This step is essential to enable the IDE to communicate effectively with LGW and the underlying database. However, in certain IDEs, an additional requirement exists: the query must be in the specific SQL language of the target database.

To seamlessly replace the JDBC driver in DBeaver, adhere to these systematic guidelines:

**1.** Navigate to **Database** > **Driver Manager**.

.. figure:: images/DBeaver_01.png
    :width: 80%
    :align: center

|
|

**2.** Click on **New Driver** to initiate the process.

.. figure:: images/DBeaver_02.png
    :width: 80%
    :align: center

|
|

**3.** Fill in the details as demonstrated in the provided image.

.. figure:: images/DBeaver_03.png
    :width: 80%
    :align: center

|
|

**4.** Integrate the Liberatti JDBC Driver as an additional driver.

.. figure:: images/DBeaver_04.png
    :width: 80%
    :align: center

|
|

**5.** Utilize the Find class button to locate and select the ``liberatii.jdbc`` class.

.. figure:: images/DBeaver_05.png
    :width: 80%
    :align: center

|
|

**6.** When establishing a new connection, opt for the ``Liberatti LGW driver``.

.. figure:: images/DBeaver_06.png
    :width: 80%
    :align: center

|
|

**7.** Input the requisite connection parameters such as host, port, database name, username, and password.

.. figure:: images/DBeaver_07.png
    :width: 80%
    :align: center

|
|

**8.** To validate the connection, click the **Test Connection** button.

.. figure:: images/DBeaver_08.png
    :width: 80%
    :align: center

|
|

.. warning::

    WARNING: It's essential to note that DBeaver doesn't inherently understand the Oracle syntax of queries. Consequently, you can't directly execute an entire query buffer. For simpler queries, a potential approach involves selecting them all and pressing **Alt-X**. However, for intricate queries (such as PL/SQL DDLs), it's advisable to choose a single statement and press **Ctrl (Command on Mac)-Enter** to execute.

|
|
|

