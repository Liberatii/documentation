.. _testing:


Testing
+++++++

The testing phase involves several distinct steps, each contributing to the meticulous verification of the migration process. Post-data migration, the migration service undertakes a crucial validation process by computing hash sums for all data within the table. Additionally, you have the option to supply a collection of queries, allowing for a thorough comparison of their result sets.

However, the most robust approach to verification entails the reenactment of Oracle workload files on both the Oracle snapshot database and the PostgreSQL database, followed by a meticulous comparison of the outcomes. This procedure necessitates the utilization of a dedicated Oracle staging sandbox database. Here's a concise overview of this verification process:

**1. Staging Data into Oracle Database:** Initially, the data is meticulously staged into a separate Oracle database, exclusively designated for testing purposes. This sandbox environment serves as a controlled space for assessing the migration outcome.

**2. Capturing Workload Files:** The workload files are systematically captured from the source Oracle database. These workload files encapsulate the real-world operational patterns and transactions that transpire within the source database.

**3. Replaying Workload Files:** A dedicated "replay" stage is employed for this purpose. The captured workload files are reenacted on both the Oracle snapshot database and the PostgreSQL database. This replication of operational patterns serves as the foundation for comparison.

**4. WorkloadsBlob Parameter:** Within this orchestrated process, the ``workloadsBlob`` parameter comes into play. This parameter serves as a crucial directive, enabling you to specify the precise location of the workload files. This precise specification ensures accurate retrieval and utilization of the workload data.

By adhering to this rigorous testing regimen, which includes capturing, reenacting, and comparing the operational workloads, you can confidently validate the consistency and fidelity of the migration between the Oracle and PostgreSQL environments.

