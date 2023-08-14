.. _ides:

IDEs
++++

To use LGW in IDE it's enough to replace the driver. However, some IDE also expects the query to be in the target SQL language. 

To replace the JDBC driver in DBeaver, follow the instructions:

- Select Database->Driver Manager

.. figure:: images/DBeaver_01.png
    :width: 80%
    :align: center

|
|

- Press new driver

.. figure:: images/DBeaver_02.png
    :width: 80%
    :align: center

|
|

- Fill same as below picture

.. figure:: images/DBeaver_03.png
    :width: 80%
    :align: center

|
|

- Add liberatii jdbc driver

.. figure:: images/DBeaver_04.png
    :width: 80%
    :align: center

|
|

- Press the Find class button, and select liberatii.jdbc class

.. figure:: images/DBeaver_05.png
    :width: 80%
    :align: center

|
|

- Use Liberatti LGW driver for adding new connection

.. figure:: images/DBeaver_06.png
    :width: 80%
    :align: center

|
|

- Point your parameters of connection (host, port, database, username, password)

.. figure:: images/DBeaver_07.png
    :width: 80%
    :align: center

|
|

- Press button Test Connection ...

.. figure:: images/DBeaver_08.png
    :width: 80%
    :align: center

|
|

.. warning::

    WARNING: DBeaver doesn't understand the query is in Oracle syntax, so you cannot just run the whole buffer. For simple queries, it's possible to select them all and press Alt-X. But for complex ones (e.g. PL/SQL DDLs) it works only by selecting a single statement and pressing Ctrl(Command on Mac)-Enter.

|
|
|

