.. _objects_accessing:


Objects accessing
=================

As we don't know actual object types, all we really need is to know is object declared in the current scope(PL/SQL block or query block). We convert each object accessor into a function call. There are two types of object access:

- Static access- access to a property of the object that is not declared in a current scope (Package property, for example)

- Variable access - access to a property of the object that is declared in the current scope.

So for each type or package that is created, we create additional functions with a specific prefix for each object access type.

**Packages**
++++++++++++

Functions names template: 

``<prefix>$<package_name>$<package_property>``

Functions prefixes:

``lbr$g`` -  for getting properties and for functions with no arguments or with all default arguments(as they can be called without parenthesizes).

``lbr$s`` - for setting properties value.

``lbr$m`` - for methods accessing.

Pseudocode examples:

.. code-block:: 
   :linenos:

   --ORACLE 
   CREATE PACKAGE pack {
     fld1 integer;
     function func1();
   }
   
   --PG
   CREATE FUNCTION lbr$g$pack$fld1();  --getter
   CREATE FUNCTION lbr$s$pack$fld1(integer);  --setter
   CREATE FUNCTION lbr$m$pack$func1(); --method call
   CREATE FUNCTION lbr$g$pack$func1(); --getter for f1 that calls f1() inside




**Types**
+++++++++

Functions names template: 

``<prefix>$<property_name>(<current_type_name>,...)``

Functions prefixes:

``lbr$j`` -  for getting properties and for functions with no arguments or with all default arguments(as they can be called without parenthesizes).

``lbr$z`` - for setting properties value.

Each type setter should set the value to a property of a copy of the object and return that copy.

For each part of a complex name of the setter function, we should transfer the corresponding object to which property want to set.

``lbr$n`` - for methods accessing.

For collection types, ``lbr$j`` and ``lbr$z`` can be created without ``<property_name>`` to emulate accessing by index:

Pseudocode examples:

.. code-block:: 
   :linenos:

   --ORACLE
   CREATE TYPE type {
     fld1 integer;
     function func1()
   }

   --PostgreSQL
   CREATE TYPE type {
     fld1 integer;
   }
   
   CREATE FUNCTION lbr$j$fld1(type);           --getter
   CREATE FUNCTION lbr$z$fld1(type, integer);  --setter
   CREATE FUNCTION lbr$n$func1(type);          --method call
   CREATE FUNCTION lbr$j$func1(type);          --getter for f1 that calls f1() inside



**Objects accessors chains**
++++++++++++++++++++++++++++

First, we check if the start object is declared in a current scope (PL/SQL block or query block). Then we convert an accessor chain into a chain of corresponding function calls.  Also, we convert each access by index into ``lbr$call`` function.





