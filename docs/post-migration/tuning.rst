.. _tuning:

Tuning
======

Oracle and PostgreSQL query optimisation engines have many things in common, but there are some differences though. 

It's rare, but it's possible PostgreSQL chooses no optimal query plan with the same indexes available to it. To fix this, we can do whatever we usually do to improve the query performance. Namely, we start with profiling. After this, depending on the results. We can add new indexes, change other indexes parameters, change database engine parameters or Liberatii Gateway, and rewrite the query. 

Often there is a pattern in the application which we can fix once for many queries. In this case, Liberatii can quickly add the necessary scripts specific to this application to fix this pattern in all the queries.

After each improvement we run workloads replay to see their effect.