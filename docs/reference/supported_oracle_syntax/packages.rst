.. _packages:


Packages
++++++++

For each variable declaration, Liberatii generates a corresponding setter and getter, the write and read data to a single row temporal 
table. Variables declared in the package's declaration are stored in ``lbr$s0$<package name>`` table, and variables declared in its body are stored in ``lbr$s1$<package name>``. 

The setter/getter names are ``lbr$s$<package name>$<variable name>`` and ``lbr$g$<package name>$<variable name>``. For functions, without parameters, we also generate a getter that calls a function. They are created in the schema where the package is created. 

Each subroutine (and other declaration) is moved into the schema scope and gets its name's prefix ``lbr$m$<package name>$<method name>``. For functions, we also generate a getter that calls the function without arguments.

For each package, Liberatii generates two initialization functions, separately for body ``lbr$init$<package name>`` and a declaration ``lbr$init0$<package name>``. The second calls the first. They are called if the tables for storing state don't exist. The procedures also copy the package body initialization code if there is any.

Local package variables are replaced with the setter/getter calls. All the other package's objects usages get the ``lbr$m`` prefix.

|

