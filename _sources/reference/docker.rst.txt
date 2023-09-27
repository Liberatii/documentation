.. _docker:

Installing Docker
=================

To use the :ref:`detailed assessment <Running a detailed assessment>` you must have docker installed on the system running
`Azure Data Studio <https://azure.microsoft.com/en-gb/products/data-studio>`_.

Windows Installation Guide
++++++++++++++++++++++++++

Docker for Windows can be installed using `Docker Desktop for Windows <https://docs.docker.com/desktop/install/windows-install/>`_.

.. note::

   Docker for Windows requires the Windows Subsystem for Linux version 2 (WSL 2) in order to run
   Linux containers on Windows. This requires Virtualisation on the platform you are using. In the case of
   Azure this will require the use of `nested virtualization <https://learn.microsoft.com/en-us/azure/lab-services/concept-nested-virtualization-template-vm>`_.

The :ref:`detailed assessment <Running a detailed assessment>` requires Linux container support to be available which,
in turn, requires the use of Windows Subsystem for Linux. The `Microsoft documentation <https://docs.microsoft.com/en-us/windows/wsl/install-win10>`_
linked by Docker for Windows describes the installation process of WSL to support this. However, the following summary 
should suffice for installations of Windows 10, Windows 11, Windows Server 2019 and Windows Server 2022:

**1.** The :code:`VirtualMachinePlatform` must be available

This can be turned on by opening the Control Panel and clicking on the Programs and Features applet.
Alternatively, you can open a command shell and issue a :code:`dism.exe` command:

.. code-block::
   :caption: Enable Virtual Machine Platform

       dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

**2.** The Windows Subsystem for Linux version 2 must be installed

Open a command shell and issue the following :code:`wsl` command:

.. code-block::
   :caption: Install Windows Subsystem for Linux

       wsl --install

For Windows Server 2019 and Windows 10 this must be upgraded to the pre-release to function correctly:

.. code-block::
   :caption: Upgrade WSL to version 2.0

       wsl --update --pre-release

To check you have the latest version of WSL installed the following command can be used:


.. code-block::
   :caption: Check WSL version

       C:\Users\Administrator>wsl -v

       WSL version: 2.0.1.0
       Kernel version: 5.15.123.1-1
       WSLg version: 1.0.58
       MSRDC version: 1.2.4485
       Direct3D version: 1.608.2-61064218
       DXCore version: 10.0.25880.1000-230602-1350.main
       Windows version: 10.0.20348.1970

**3.** Install docker

After the :code:`VirtualMachinePlatform` and :code:`WSL` are enabled **Docker Desktop** can be installed
using the :code:`Docker Desktop Installer.exe` or with the following command:

.. code-block::
   :caption: Install Docker Desktop on Windows

       start-process "Docker Desktop Installer.exe" "install --quiet" -Wait -NoNewWindow

Linux Installation Guide
++++++++++++++++++++++++

It is not necessary to use the full `Docker Desktop <https://docs.docker.com/desktop/install/linux-install/>`_ installation on Linux
to use the :ref:`detailed assessment <Running a detailed assessment>`. However, the detailed assessment will work with
this installation.

For most Linux systems the Docker CE edition can be installed using the system package manager. The following sections
detail this procedure for the more common distributions:

Redhat (RHEL) and derivatives
-----------------------------

Modern RedHat (RHEL) and their derivatives use the :code:`dnf` package manager
to install packages. For older releases the :code:`yum` package manager may be
used in the same way by following the guides from `Docker <https://docs.docker.com>`_.

.. code-block::
   :caption: Install DNF Plugins

       sudo dnf -y install dnf-plugins-core


Redhat (RHEL)
~~~~~~~~~~~~~

.. code-block::
    :caption: Install Docker-ce repository

       sudo dnf config-manager \
            --add-repo \
            https://download.docker.com/linux/rhel/docker-ce.repo

CentOS
~~~~~~

.. code-block::
    :caption: Install Docker-ce repository

       sudo dnf config-manager \
            --add-repo \
            https://download.docker.com/linux/centos/docker-ce.repo

Fedora
~~~~~~

.. code-block::
    :caption: Install Docker-ce repository

        sudo dnf config-manager \
            --add-repo \
            https://download.docker.com/linux/fedora/docker-ce.repo

Installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block::
   :caption: Install and enable docker

       sudo dnf install docker-ce docker-ce-cli containerd.io docker-compose-plugin
       sudo systemctl enable --now docker
       sudo usermod -aG docker $(id -un)

SuSe Enterprise Linux (SLES)
----------------------------

Installation on SLES is carried out using the :code:`zypper` tool only:

.. code-block::
    :caption: Installation on SLES

    sudo zypper addrepo https://download.docker.com/linux/sles/docker-ce.repo
    sudo zypper install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    sudo systemctl enable --now docker
    sudo usermod -aG docker $(id -un)

Ubuntu and Debian 
-----------------

Debian derivatives use the :code:`apt` package manager to install packages. The following
code blocks setup the docker apt repository and use it to install the docker packages.

.. code-block::
    :caption: Allow additional repositories

    sudo apt-get install ca-certificates curl gnupg
    sudo install -m 0755 -d /etc/apt/keyrings


Ubuntu
~~~~~~

.. code-block::
    :caption: Install Docker-ce repository

    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    echo \
      "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

Debian
~~~~~~

.. code-block::
    :caption: Install Docker-ce repository

    curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    echo \
      "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
      "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null


Installation and configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block::
   :caption: Install and enable docker

    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    sudo usermod -aG docker $(id -un)


Troubleshooting
+++++++++++++++

The following commands can be used to test the docker installation. Run all of these in order
and check whether the output of any appears in the following sections:

.. code-block::
   :caption: Run the docker test command

    docker run --platform linux/amd64 hello-world
    docker info
    docker inspect postgres:latest -f '{{ .Id }}'
    docker inspect pgtranslator:latest -f '{{ .Id }}'

Service not running
-------------------

.. code-block::
   :caption: Docker service not running on Windows

    > docker run hello-world
    docker: error during connect: in the default daemon configuration on Windows, the docker client
    must be run with elevated privileges to connect: Post "http://%2F%2F.%2Fpipe%2Fdocker_engine/v1.24/containers/create":
    open //./pipe/docker_engine: The system cannot find the file specified.
    See 'docker run --help'.

This can be fixed by running the Docker Desktop application and ensuring that the docker engine is running.

Missing containers
------------------

.. code-block::
   :caption: Missing containers

    > docker inspect pgtranslator:latest -f '{{ .Id }}'
    Error: No such object: pgtranslator:latest

This can be fixed by downloading and installing the latest :code:`pgtranslator.tar.gz` and :code:`postgres.tar.gz`
containers from Liberatii. 

Linux OSType not enabled
------------------------

If Docker Desktop is not using virtualization via WSL 2 then it may not be possible to run Linux containers.
In this case the following error may appear:

.. code-block::
   :caption: Linux OSType is not enabled
    
    > docker run --platform linux/amd64 hello-world
    image operating system "linux" cannot be used on this platform: operating system is not supported

To fix this, run:

.. code-block::
   :caption: Fix missing Linux OSType

    wsl --install
    wsl --update --pre-release
    dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

and reboot then reinstall Docker Desktop. This should allow docker desktop to use the Linux container type.


Permissions errors on Linux
---------------------------

The following error indicates that the docker daemon is not accessible to the current user:

.. code-block::
   :caption: Permission errors on Linux

    > docker run hello-world
    docker: permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: 
    Post "http://%2Fvar%2Frun%2Fdocker.sock/v1.24/containers/create": dial unix /var/run/docker.sock: connect: permission denied.
    See 'docker run --help'.

This can usually be fixed by allowing the current user permission for the docker group:

.. code-block::
   :caption: Fixing user permissions

    sudo usermod -aG docker $(id -un)
    newgrp docker
    docker run hello-world
