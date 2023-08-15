.. _parameter_bindings:

Parameter bindings
++++++++++++++++++

Postgres doesn't have output parameters bindings, and all the data should be received only by the result set bindings. For this, 
if PL/SQL batch has bindings we wrap it into a function with ``INOUT`` parameters - ``pg_temp.lbr$batch$p``. And 
call it receiving the record, as a result, set ``SELECT * FROM pg_temp.lbr$batch$p(?,?)``. Or ``SELECT pg_temp.lbr$batch$p(?)`` in case there is just one bind. This way we can bind result sets.