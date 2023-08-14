.. _supported_oracle_plsql_syntax:


Supported Oracle PL/SQL Syntax
==============================



Type Mapping
++++++++++++


We cover a few notable differences in translation:



.. list-table:: 
   :widths: 50 50
   :header-rows: 1

   * - **Oracle DB**
     - **PostgreSQL**
   * - VARCHAR2
     - VARCHAR
   * - NVARCHAR2
     - VARCHAR
   * - NCHAR
     - CHAR
   * - NUMBER(n, m)
     - NUMERIC(n,m)
   * - NUMBER( n<=4)
     - SMALLINT
   * - NUMBER( n<=9)
     - INT
   * - NUMBER( n<=18)
     - BIGINT
   * - NUMBER( n>18)
     - NUMERIC(n)
   * - BINARY_INTEGER
     - INTEGER
   * - BINARY_FLOAT
     - FLOAT
   * - DATE
     - TIMESTAMP(0)
   * - TIMESTAMP WITH LOCAL TIME ZONE
     - TIMESTAMPTZ
   * - CLOB
     - TEXT
   * - LONG
     - TEXT
   * - BLOB
     - BYTEA
   * - RAW(n)
     - BYTEA
   * - LONG RAW
     - BYTEA

|
|

**Details:**

**1.** Oracle char datatypes have BYTE and CHAR notation for sizing. Where BYTE corresponds to length in bytes and CHAR to length in characters. Postgre has only char length. We ignore BYTE and CHAR notation. There will be no error for 1 to 1 Byte to Char translation. Just the length on Postgres will be bigger than it's needed. Default values depend on the session variable NLS_LENGTH_SEMANTICS.

Oracle:

.. code-block:: 
   :linenos:

   DECLARE  
     var1 VARCHAR2(1 char) := 'й'; 
     var2 VARCHAR2(1 char) := 'q'; 
     var3 VARCHAR2(1 byte) := 'й';  --error MultyByte char 
     var4 VARCHAR2(1 byte) := 'q'; 
     var5 VARCHAR2(2 byte) := 'й';
   BEGIN 
     NULL;
   END;

|
|

