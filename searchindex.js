Search.setIndex({"docnames": ["concept/how_does_it_work", "concept/index", "concept/journey", "concept/software_architecture", "concept/what_is_liberatii", "getting-started/index", "index", "migration/azure/configuration", "migration/azure/deployment", "migration/azure/index", "migration/azure/upgrade", "migration/cdc", "migration/cut_over/cut_over_client_side", "migration/cut_over/index", "migration/cut_over/replication", "migration/data_migration", "migration/index", "migration/schema_migration", "migration/testing/index", "migration/testing/testing_client_side", "migration/testing/workload_replays", "post-migration/index", "post-migration/manual_translation_table", "post-migration/monitoring", "post-migration/troubleshooting", "post-migration/tuning", "pre-migration/assessment/export_assessment", "pre-migration/assessment/index", "pre-migration/assessment/install_liberatii_database_migration_assessment", "pre-migration/assessment/perform_an_assessment", "pre-migration/business", "pre-migration/index", "pre-migration/use_cases", "reference/database-connector/index", "reference/database-connector/jdbc", "reference/database-connector/oci", "reference/database-connector/odbc", "reference/high_availability_fault_tolerance_and_replication", "reference/index", "reference/oracle-plsql/index", "reference/oracle-plsql/packages", "reference/oracle-plsql/plsql_syntax", "reference/supported_systems"], "filenames": ["concept/how_does_it_work.rst", "concept/index.rst", "concept/journey.rst", "concept/software_architecture.rst", "concept/what_is_liberatii.rst", "getting-started/index.rst", "index.rst", "migration/azure/configuration.rst", "migration/azure/deployment.rst", "migration/azure/index.rst", "migration/azure/upgrade.rst", "migration/cdc.rst", "migration/cut_over/cut_over_client_side.rst", "migration/cut_over/index.rst", "migration/cut_over/replication.rst", "migration/data_migration.rst", "migration/index.rst", "migration/schema_migration.rst", "migration/testing/index.rst", "migration/testing/testing_client_side.rst", "migration/testing/workload_replays.rst", "post-migration/index.rst", "post-migration/manual_translation_table.rst", "post-migration/monitoring.rst", "post-migration/troubleshooting.rst", "post-migration/tuning.rst", "pre-migration/assessment/export_assessment.rst", "pre-migration/assessment/index.rst", "pre-migration/assessment/install_liberatii_database_migration_assessment.rst", "pre-migration/assessment/perform_an_assessment.rst", "pre-migration/business.rst", "pre-migration/index.rst", "pre-migration/use_cases.rst", "reference/database-connector/index.rst", "reference/database-connector/jdbc.rst", "reference/database-connector/oci.rst", "reference/database-connector/odbc.rst", "reference/high_availability_fault_tolerance_and_replication.rst", "reference/index.rst", "reference/oracle-plsql/index.rst", "reference/oracle-plsql/packages.rst", "reference/oracle-plsql/plsql_syntax.rst", "reference/supported_systems.rst"], "titles": ["How does it work?", "Concept", "Your Liberatii Journey", "Software Architecture", "What is Liberatii?", "Getting Started", "Documentation", "Configuration", "Deployment", "Azure Deployment", "Upgrade", "CDC", "Client-side (Migration/change driver)", "Cut over", "Replication", "Data Migration", "Migration", "Schema Migration", "Testing", "Client-side (Migration/change driver)", "Workload replay", "Post-migration", "Manual translation table", "Monitoring", "Troubleshooting", "Tuning", "Export assessment", "Assessment", "Install Liberatii Database Migration Assessment", "Perform an assessment", "Business Assessment", "Pre-migration", "Use cases", "Liberati database connector", "JDBC", "OCI", "ODBC", "High availability, Fault tolerance and Replication", "Reference", "Oracle PL/SQL Syntax", "Packages", "PL/SQL syntax (Reference/DQL, DML, DDL)", "Supported databases and client applications"], "terms": {"veri": [0, 4, 20], "brief": [0, 4], "overview": 0, "idea": 0, "applic": [0, 20, 31], "The": [1, 2, 3, 5, 16, 31], "section": [1, 5, 16, 31], "i": [1, 5, 6, 16, 20, 31], "an": [1, 20], "explan": 1, "document": [1, 20], "specifi": [1, 16, 20, 31], "diataxi": [1, 16, 31], "framework": [1, 16, 31], "thi": [1, 5, 6, 16, 20, 31], "should": [1, 5, 16, 20, 31], "explain": [1, 5, 16, 31], "how": [1, 5, 16, 31], "liberatii": 1, "work": [1, 20, 31], "why": [1, 5], "wa": 1, "design": 1, "wai": 1, "step": [2, 20, 31], "custom": [2, 4, 5, 16, 20, 31], "must": [2, 16, 20], "go": 2, "through": 2, "obtain": 2, "benefit": [2, 20], "outlin": [2, 4], "compon": 3, "system": [3, 20], "ignor": 3, "discrep": 3, "between": [3, 20], "differ": [3, 20], "deploy": 3, "environ": 3, "problem": [4, 20], "solv": 4, "solut": 4, "outcom": 4, "move": 5, "pre": [5, 16], "journei": 5, "page": 5, "provid": [5, 20], "high": 5, "level": 5, "introduct": 5, "perform": [5, 16, 31], "more": 5, "detail": [5, 20], "us": [5, 20], "case": 5, "cover": 5, "holist": 5, "inform": [5, 20], "about": 5, "gener": 5, "procedur": [5, 20], "set": [5, 20], "expect": 5, "technic": 5, "busi": 5, "referenc": 5, "workbook": 5, "ad": 5, "refer": 5, "download": 5, "proof": 5, "point": [5, 20], "specif": 5, "individu": 5, "take": [6, 16], "note": 6, "we": 6, "ar": [6, 20, 31], "done": 6, "here": 6, "mapogisk": 6, "guid": [16, 31], "focu": 16, "action": 16, "can": [16, 20], "databas": 20, "analys": 20, "result": 20, "run": 20, "oracledb": 20, "postgresql": 20, "over": 20, "captur": 20, "introduc": 20, "littl": 20, "overhead": 20, "allow": 20, "against": 20, "product": 20, "A": 20, "construct": 20, "directori": 20, "target": 20, "creat": 20, "replac": 20, "replay_dir": 20, "AS": 20, "tmp": 20, "start": 20, "begin": 20, "dbms_workload_captur": 20, "start_captur": 20, "name": 20, "dir": 20, "durat": 20, "900": 20, "capture_st": 20, "true": 20, "sts_cap_interv": 20, "300": 20, "end": 20, "It": 20, "possibl": 20, "filter": 20, "restrict": 20, "oracl": 20, "onc": 20, "ha": 20, "been": 20, "test": 20, "complet": [20, 31], "finish_captur": 20, "produc": 20, "folder": 20, "which": [20, 31], "sent": 20, "process": 20, "non": 20, "hand": 20, "option": 20, "check": 20, "desir": 20, "re": 20, "when": 20, "assess": 20, "tool": 20, "record": 20, "statement": 20, "On": 20, "new": 20, "copi": 20, "requir": [20, 31], "e": 20, "g": 20, "follow": 20, "command": 20, "dbms_workload_replai": 20, "process_captur": 20, "capture_dir": 20, "initialize_replai": 20, "replay_nam": 20, "prepare_replai": 20, "synchron": 20, "At": 20, "least": 20, "one": 20, "client": 20, "connect": 20, "from": 20, "anoth": 20, "appropri": 20, "user": 20, "oper": 20, "tester001": 20, "identifi": 20, "account": 20, "unlock": 20, "grant": 20, "resourc": 20, "dba": 20, "abov": 20, "wrc": 20, "mode": 20, "replaydir": 20, "start_replai": 20, "suppli": 20, "sampl": 20, "proxi": 20, "via": 20, "gatewai": 20, "contain": 20, "length": 20, "increas": 20, "select": 20, "ye": 20, "No": 20, "99": 20, "1": 20, "3": 20, "If": 20, "return": 20, "item": 20, "investig": 20, "part": 20, "migrat": 20, "its": 20, "doe": 20, "being": 20, "without": 20, "defin": 20, "For": 20, "mani": 20, "deliber": 20, "affect": 20, "correct": 20, "howev": 20, "depend": 20, "upon": 20, "implement": 20, "implicit": 20, "index": 20, "sensit": 20, "chang": 20, "underli": 20, "even": 20, "minor": 20, "upgrad": 20, "could": 20, "There": 20, "mai": 20, "datatyp": 20, "schema": 20, "within": 20, "intermedi": 20, "function": 20, "float": 20, "arithmet": 20, "due": 20, "local": 20, "string": 20, "handl": 20, "see": 20, "whether": 20, "side": 20, "time": 20, "determin": 20, "similarli": 20, "instanc": 20, "show": 20, "seriou": 20, "degrad": 20, "necessari": 31, "readi": 31, "after": 31, "know": 31, "what": 31, "further": 31}, "objects": {}, "objtypes": {}, "objnames": {}, "titleterms": {"how": 0, "doe": 0, "work": 0, "concept": 1, "your": 2, "liberatii": [2, 4, 20, 28], "journei": 2, "softwar": 3, "architectur": 3, "what": 4, "i": 4, "get": 5, "start": 5, "exist": 5, "document": [5, 6], "poc": 5, "assess": [5, 26, 27, 28, 29, 30], "guid": 5, "oracl": [5, 39], "postgr": 5, "migrat": [5, 12, 15, 16, 17, 19, 21, 28, 31], "sheet": 5, "custom": 6, "configur": 7, "deploy": [8, 9], "azur": 9, "upgrad": 10, "cdc": 11, "client": [12, 19, 42], "side": [12, 19], "chang": [12, 19], "driver": [12, 19], "cut": 13, "over": 13, "replic": [14, 37], "data": [15, 20], "schema": 17, "test": 18, "workload": 20, "replai": 20, "collect": 20, "file": 20, "The": 20, "report": 20, "fail": 20, "queri": 20, "order": 20, "mismatch": 20, "match": 20, "perform": [20, 29], "post": 21, "manual": 22, "translat": 22, "tabl": 22, "monitor": 23, "troubleshoot": 24, "tune": 25, "export": 26, "instal": 28, "databas": [28, 33, 42], "an": 29, "busi": 30, "pre": 31, "us": 32, "case": 32, "liberati": 33, "connector": 33, "jdbc": 34, "oci": 35, "odbc": 36, "high": 37, "avail": 37, "fault": 37, "toler": 37, "refer": [38, 41], "pl": [39, 41], "sql": [39, 41], "syntax": [39, 41], "packag": 40, "dql": 41, "dml": 41, "ddl": 41, "support": 42, "applic": 42}, "envversion": {"sphinx.domains.c": 2, "sphinx.domains.changeset": 1, "sphinx.domains.citation": 1, "sphinx.domains.cpp": 8, "sphinx.domains.index": 1, "sphinx.domains.javascript": 2, "sphinx.domains.math": 2, "sphinx.domains.python": 3, "sphinx.domains.rst": 2, "sphinx.domains.std": 2, "sphinx": 57}, "alltitles": {"How does it work?": [[0, "how-does-it-work"]], "Concept": [[1, "concept"]], "Your Liberatii Journey": [[2, "your-liberatii-journey"]], "Software Architecture": [[3, "software-architecture"]], "What is Liberatii?": [[4, "what-is-liberatii"]], "Getting Started": [[5, "getting-started"]], "Existing documents": [[5, "existing-documents"]], "POC Assessment guide": [[5, "poc-assessment-guide"]], "Oracle to Postgres migration (sheet)": [[5, "oracle-to-postgres-migration-sheet"]], "Documentation": [[6, "documentation"]], "Custom": [[6, null]], "Configuration": [[7, "configuration"]], "Deployment": [[8, "deployment"]], "Azure Deployment": [[9, "azure-deployment"]], "Upgrade": [[10, "upgrade"]], "CDC": [[11, "cdc"]], "Client-side (Migration/change driver)": [[12, "client-side-migration-change-driver"], [19, "client-side-migration-change-driver"]], "Cut over": [[13, "cut-over"]], "Replication": [[14, "replication"]], "Data Migration": [[15, "data-migration"]], "Migration": [[16, "migration"]], "Schema Migration": [[17, "schema-migration"]], "Testing": [[18, "testing"]], "Workload replay": [[20, "workload-replay"]], "Collecting a workload replay file": [[20, "collecting-a-workload-replay-file"]], "Replaying a workload": [[20, "replaying-a-workload"]], "The Liberatii Workload Replay Report": [[20, "the-liberatii-workload-replay-report"]], "Failing queries": [[20, "failing-queries"]], "Order mismatching": [[20, "order-mismatching"]], "Data match": [[20, "data-match"]], "Performance": [[20, "performance"]], "Post-migration": [[21, "post-migration"]], "Manual translation table": [[22, "manual-translation-table"]], "Monitoring": [[23, "monitoring"]], "Troubleshooting": [[24, "troubleshooting"]], "Tuning": [[25, "tuning"]], "Export assessment": [[26, "export-assessment"]], "Assessment": [[27, "assessment"]], "Install Liberatii Database Migration Assessment": [[28, "install-liberatii-database-migration-assessment"]], "Perform an assessment": [[29, "perform-an-assessment"]], "Business Assessment": [[30, "business-assessment"]], "Pre-migration": [[31, "pre-migration"]], "Use cases": [[32, "use-cases"]], "Liberati database connector": [[33, "liberati-database-connector"]], "JDBC": [[34, "jdbc"]], "OCI": [[35, "oci"]], "ODBC": [[36, "odbc"]], "High availability, Fault tolerance and Replication": [[37, "high-availability-fault-tolerance-and-replication"]], "Reference": [[38, "reference"]], "Oracle PL/SQL Syntax": [[39, "oracle-pl-sql-syntax"]], "Packages": [[40, "packages"]], "PL/SQL syntax (Reference/DQL, DML, DDL)": [[41, "pl-sql-syntax-reference-dql-dml-ddl"]], "Supported databases and client applications": [[42, "supported-databases-and-client-applications"]]}, "indexentries": {}})