.. _workload-replays:

Workload replay
===============

Liberatii can use a `Database Replay
File <https://docs.oracle.com/en/database/oracle/oracle-database/21/ratug/database-replay.html#GUID-C5CAF3E6-0F1C-4BD6-BC03-F71744AD600E>`__
to analyse the difference in performance and results between queries run
on OracleDB and PostgreSQL over Liberatii. Capturing the database replay
introduces very little overhead into the database allowing the capture
to be run against production applications and workloads.

Collecting a workload replay file
---------------------------------

A workload replay can be collected by constructing a directory target to
capture the result:

.. code-block:: plpgsql

   create or replace directory replay_dir AS '/tmp/replay_dir';

then starting the capture:

.. code-block:: plpgsql

   BEGIN
   DBMS_WORKLOAD_CAPTURE.START_CAPTURE (name => 'capture',
       dir      => 'REPLAY_DIR',
       duration => 900,
       capture_sts => TRUE,
       sts_cap_interval => 300);
   END;

It is possible to filter the workload capture to restrict the captured
data. Details for these procedures are provided by the `Oracle
documentation <https://docs.oracle.com/en/database/oracle/oracle-database/21/ratug/capturing-a-database-workload.html#GUID-45889420-6496-4E7C-B698-A62E2580B962>`__.

Once the application has been tested, the capture can be completed:

.. code-block:: plpgsql

   BEGIN
       DBMS_WORKLOAD_CAPTURE.FINISH_CAPTURE ();
   END;

This will produce a set of files in the ``/tmp/replay_dir`` folder which
can be sent to Liberatii for processing.

Replaying a workload
--------------------

A workload can be replayed on a *non-production* database by hand. This
is an optional step but can be useful to check that the replay files
work as desired or to re-run the queries when the :ref:`Liberatii Assessment
Tool <assessment>` is recording statements.

On the new database, copy the files to the required directory
(e.g. ``/tmp/replay``) and run the following commands:

.. code-block:: plpgsql

   BEGIN
       DBMS_WORKLOAD_REPLAY.PROCESS_CAPTURE (capture_dir => 'REPLAY_DIR');
       DBMS_WORKLOAD_REPLAY.INITIALIZE_REPLAY(
           replay_name=> 'capture',
           replay_dir => 'REPLAY_DIR');
       DBMS_WORKLOAD_REPLAY.PREPARE_REPLAY (synchronization => TRUE,
           capture_sts => TRUE,
           sts_cap_interval => 300);
   END;

At least one "replay client" must be connected to the database from
another system with an appropriate user. Test users are required for
this operation:

.. code-block:: plpgsql

   create user tester001 identified by tester001 account unlock;
   grant resource, connect, dba to tester001;

When the above steps are complete the workload can be replayed by
connecting a replay client:

.. code-block:: bash

   wrc tester001/tester001@<database> mode=replay replaydir=/tmp/replay/

and running the replay:

.. code-block:: plpgsql

   BEGIN
       DBMS_WORKLOAD_REPLAY.START_REPLAY ();
   END;

The Liberatii Workload Replay Report
------------------------------------

Liberatii will replay the supplied workload against a sample Oracle
database and against a PostgreSQL database proxied via Liberatii
Gateway. Liberatii will provide a customer report that will contain the
following information:

.. table::
   :widths: auto

   +-----------------------------------------------------------------------------------------------------+
   | .. centered:: Customer Report                                                                       |
   +====================+==================+=================+================+==========================+
   | **Query**          | **Length match** | **Order match** | **Data match** | **Performance increase** |
   +--------------------+------------------+-----------------+----------------+--------------------------+
   | SELECT \* FROM ... | Yes              | No              | 99%            | 1.3                      |
   +--------------------+------------------+-----------------+----------------+--------------------------+
   | ...                | ...              | ...             | ...            | ...                      |
   +--------------------+------------------+-----------------+----------------+--------------------------+

Failing queries
~~~~~~~~~~~~~~~

If the length of the result set returned by a query is different between
Oracle and PostgreSQL or the query fails to be processed then these
items will be investigated by Liberatii as part of the migration
process.

Order mismatching
~~~~~~~~~~~~~~~~~

If the length of a query matches but its order does not then a query is
being used without a defined order. For many applications this is
deliberate and does not affect correctness. However, it is possible that
the application depends upon Oracle implementation details or :popover:`implicit
indexes: In Oracle database, implicit indexes are automatically created by the database when certain actions are taken. These indexes are created without any direct user intervention or input, and are used to improve performance of common database operations.` that are sensitive to changes in the underlying database. Even
a minor Oracle upgrade could change the results of these queries.

Data match
~~~~~~~~~~

There may be differences in the underlying datatypes used in the schema
or within intermediate functions. This can result in minor
floating-point arithmetic differences, changes due to localization or
changes in string handling. Queries that produce different data should
be investigated to see whether this is a problem.

Performance
~~~~~~~~~~~

The queries are run side-by-side and timed to determine whether running
on a similarly specified PostgreSQL instance provides a performance
benefit above Oracle. Queries that show serious performance degradation
will be investigated by Liberatii as part of the migration process.
