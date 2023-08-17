.. _manual_translation_table:

Manual translation table
========================

Liberatii Gateway lookups for an input query in two caches before automated translation. We can add the cache entries manually to make a custom translation. We may need this if Liberatii Gateway doesn't support something in the input query or if there is a better alternative for improving performance. 

The first cache uses the query's plain text as its key. The second one normalises queries and replaces all constants in them with placeholders. The first cache is faster, but it isn't applicable if the application generates queries by using string concatenation to add some constants into them. This is a bad practice because it can lead to security vulnerabilities such as query injection. But anyway, legacy applications often have them. Liberatii Gateway can help with this too using the translator cache.

Please check `Manual Translation Refrence <https://liberatii.github.io/documentation/reference/gateway_configuration.html#manual-query-translation>`_ and `Query Cache Reference <https://liberatii.github.io/documentation/reference/gateway_configuration.html#translator-cache>`_ for usage details.

|
|
