.. _oci:

OCI
===

The `OCI Instant Client <https://www.oracle.com/uk/database/technologies/instant-client.html>`_
is a C API/library which is used by Oracle client applications to run queries
on an Oracle DB instance. Oracle provides an implementation of the OCI C API
that connects to Oracle.

Applications can dynamically load a shared library, :code:`liboci.so` or
:code:`oci.dll`, to connect to the Oracle Database.

The Liberatii Driver
--------------------

The Liberatii Driver provides a replacement shared library, :code:`liboci.so`
or :code:`oci.dll`, that can be used directly in place of the existing
:code:`oci.dll` or :code:`liboci.so`. This is performed by simply replacing
the existing shared library with the replacement supplied by Liberatii.

Tracing the existing driver
---------------------------

This driver implements the OCI C API as far as required by common applications.
It is recommended that the existing ``oci.dll`` or ``liboci.so`` is traced prior
to replacement. This will help Liberatii ensure that the replacement driver
implements the functionality required by the application.

The :ref:`Technical Assessment <oci_tracing>` provides instructions on this
process.
