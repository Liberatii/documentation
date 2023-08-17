.. _synchronising_databases:


Synchronising Databases
+++++++++++++++++++++++

Liberatii Gateway can set up CDC-based synchronization of all the changes from the source to the target and back. It is the way to avoid switchover downtimes. The target database will have all the up-to-date information even if the source database is in use after the data migration.

The backward synchronization is kept for some time so it's possible to switch the application back to the original database in case of any troubles.

The synchronization is done in ``sync`` stage.