{
  description = "Build requirements for docs";
  inputs = {
    nixpkgs.url = github:NixOS/nixpkgs;
    flake-utils.url = github:numtide/flake-utils;
  };

  outputs = { self, nixpkgs, flake-utils, ... } @ inputs:
    with inputs; flake-utils.lib.eachDefaultSystem
      (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          lib = pkgs.lib;
          sphinxcontrib-video = pkgs.python3Packages.buildPythonPackage rec {
            pname = "sphinxcontrib-video";
            version = "0.2.0";
            src = pkgs.fetchPypi {
              inherit pname version;
              sha256 = "sha256-yYr+9QpUUtWmlg/VfGtXtx2puCXK2qVsG2x3M4v9AoQ=";
            };
            postPatch = ''
              rm -f sphinxcontrib/__init__.py build/lib/sphinxcontrib/__init__.py
              PTH="sphinxcontrib_video-${version}-py3.10-nspkg.pth"
              cat >$PTH <<EOF
              import sys, types, os;has_mfs = sys.version_info > (3, 5);p = os.path.join(sys._getframe(1).f_locals['sitedir'], *('sphinxcontrib',));importlib = has_mfs and __import__('importlib.util');has_mfs and __import__('importlib.machinery');m = has_mfs and sys.modules.setdefault('sphinxcontrib', importlib.util.module_from_spec(importlib.machinery.PathFinder.find_spec('sphinxcontrib', [os.path.dirname(p)])));m = m or sys.modules.setdefault('sphinxcontrib', types.ModuleType('sphinxcontrib'));mp = (m or []) and m.__dict__.setdefault('__path__',[]);(p not in mp) and mp.append(p)
              EOF
            '';
            doCheck = false;
          };
          sphinxcontrib-applehelp = pkgs.python3Packages.buildPythonPackage rec {
            pname = "sphinxcontrib_applehelp";
            version = "1.0.7";
            format = "pyproject";
            src = pkgs.fetchPypi {
              inherit pname version;
              sha256 = "sha256-Of3I12LTOwGn2PAmo7fXFWPqO3J4fV8ArYRlvZ1t+/o=";
            };
            postPatch = ''
              rm -f *.pth sphinxcontrib/__init__.py build/lib/sphinxcontrib/__init__.py
            '';
            doCheck = false;
            propagatedBuildInputs = with pkgs.python3Packages; [flit-core];
          };
          sphinxcontrib-copybutton = pkgs.python3Packages.buildPythonPackage rec {
            pname = "sphinx-copybutton";
            version = "0.5.2";
            src = pkgs.fetchPypi {
              inherit pname version;
              sha256 = "sha256-TPF8gvuWRtG8nKkqwoCBOjtgXYxCEiX9mRMVQQPuH70=";
            };
            postPatch = ''
              rm -f sphinxcontrib/__init__.py build/lib/sphinxcontrib/__init__.py
            '';
            doCheck = false;
          };
          sphinxcontrib-togglebutton = pkgs.python3Packages.buildPythonPackage rec {
            pname = "sphinx-togglebutton";
            version = "0.3.2";
            src = pkgs.fetchPypi {
              inherit pname version;
              sha256 = "sha256-qwyLNmQnsB5MiYAtXQeEcsQn+m6dEtUhw0+gRCVZ3Ho=";
            };
            postPatch = ''
              rm -f sphinxcontrib/__init__.py build/lib/sphinxcontrib/__init__.py
            '';
            doCheck = false;
          };
          sphinxcontrib-design = pkgs.python3Packages.buildPythonPackage rec {
            pname = "sphinx_design";
            version = "0.5.0";
            format = "pyproject";
            src = pkgs.fetchPypi {
              inherit pname version;
              sha256 = "sha256-6OUTrOpvktFcbeOzTpVEWPJFuOdhtFtjlQ9lNzNSqwA=";
            };
            postPatch = ''
              rm -f sphinxcontrib/__init__.py build/lib/sphinxcontrib/__init__.py
            '';
            doCheck = false;
            propagatedBuildInputs = with pkgs.python3Packages; [flit-core];
          };
          pydata-sphinx-theme = pkgs.python3Packages.buildPythonPackage rec {
            pname = "pydata_sphinx_theme";
            version = "0.14.1";
            format = "wheel";
            src = pkgs.fetchPypi {
              inherit pname version format;
              sha256 = "sha256-xDYCe8dq4CPfTnBRfjuvkM3aWojuRrgYte8Mw4hKugQ=";
              dist = "py3";
              python = "py3";
            };
            propagatedBuildInputs = with pkgs.python3Packages; [beautifulsoup4];
          };
        in
          {
            devShells.default = pkgs.mkShell {
              buildInputs = with pkgs.python3Packages; [
                sphinx
                sphinx-autobuild
                sphinxcontrib-video
                sphinxcontrib-copybutton
                sphinxcontrib-togglebutton
                sphinxcontrib-design
                pydata-sphinx-theme
              ];
            };
          });
}
