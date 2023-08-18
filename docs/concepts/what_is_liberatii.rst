.. _what_is_liberatii:




What is Liberatii Data Platform?
++++++++++++++++++++++++++++++++

The Liberatii Data Platform is a solution designed for the specific needs of database management and migration. It facilitates the automation of schema and data migration and bridges the gap between applications originally developed for Oracle databases and their newer cloud-based counterparts without the need for code modifications. The platform aims to streamline the migration process, reducing associated time, costs, and potential risks.

The platform consists of three primary software components:

**1. Database Migration Assessment Tool:** This tool is essential in the preliminary stages of migration. Integrated as an extension within Azure Data Studio, its primary function is to evaluate the compatibility between the Oracle Database and the Liberatii Gateway. Once the assessment is complete, it generates a detailed report. This report is then utilized by migration teams to determine the migration's strategy and scope.

**2. Database Migration Engine:** The migration process is multifaceted, encompassing various tasks and stages. The Database Migration Engine is designed to manage these tasks, which include but are not limited to schema migration, data migration, synchronization using Change Data Capture (CDC), verification, workload replays, and testing.

**3. Liberatii Gateway:** Positioned at the center of the Liberatii Data Platform, the Liberatii Gateway offers real-time SQL statement translations. Beyond mere translation, it ensures consistent and effective communication between applications designed for Oracle and non-Oracle databases. The goal of the Gateway is to maintain data integrity and application accuracy while optimizing the platform's performance.

Together, these components provide a comprehensive framework, making the Liberatii Data Platform a reliable choice for modern database migrations.

|
