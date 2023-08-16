.. _troubleshooting:

Troubleshooting
===============

Liberatii Gateway relies on the cloud vendor's native tools for monitoring and health check. 

Azure Scale Set has a health check functionality which will restart the Liberatii Gateway services if anything is wrong. There is also an inner health check cascade inside the Liberatii Gateway itself. 

Liberatii Gateway uses Azure Log Analytics Workspace for collecting logs from different components, including the gateway and all databases. It can be used to set up a dashboard or notifications for monitoring.