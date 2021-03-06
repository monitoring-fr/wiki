#!/bin/bash


# ------------------- VARS -------------------- #

export NODE_VERS="v0.12.0"
export NODE_SRC="node-${NODE_VERS}-linux-x64"

# packages list to install
PACKAGES=( "git-core" "bash-completion" "nano" "pandoc" "libgsl0-dev" "graphicsmagick" )

VIRT_ENV=/home/vagrant/.node
# No need to touch these ones

VBIN=$VIRT_ENV/bin
VSHARE=$VIRT_ENV/share
VLIB=$VIRT_ENV/lib

# ---------------- FUNCTIONS ---------------------------- #

system_upgrade () {
  apt-get update
  apt-get upgrade -y
}

# -------------------------------------------- #

dependencies_packages () {
for PACKAGE in "${PACKAGES[@]}"
  do
    sudo apt-get --force-yes --yes install ${PACKAGE}
  done
}

# -------------------------------------------- #

virtual_env_installation () {
# Environnement (need to set path or not working outside $HOME)
if [[ ! -d "${VBIN}" || ! -d "${VSHARE}" || ! -d "${VLIB}" ]] ; then
  echo "Installation de NodeJS version ${NODE_VERS}…"
  su -c "mkdir -p ${VLIB} ${VSHARE} ${VBIN}" vagrant
  su -c "wget http://nodejs.org/dist/${NODE_VERS}/${NODE_SRC}.tar.gz" vagrant
  su -c "tar xzf ${NODE_SRC}.tar.gz" vagrant
  su -c "mv ${NODE_SRC}/bin/* ${VBIN}/" vagrant
  su -c "mv ${NODE_SRC}/lib/* ${VLIB}/" vagrant
  su -c "mv ${NODE_SRC}/share/* ${VSHARE}/" vagrant
  su -c "rm -R ${NODE_SRC} ${NODE_SRC}.tar.gz" vagrant
  su -c "echo 'export PATH="\$PATH:${VBIN}" # Add NodeJS to PATH' >> /home/vagrant/.bashrc" vagrant
  #su -c "PS1='$ '" vagrant  
  #su -c "source ${VIRT_ENV}/.bashrc " vagrant
  #su -c "${VBIN}/npm install -g npm" vagrant
  su -c "${VBIN}/npm install -g bower" vagrant
  su -c "${VBIN}/npm install -g grunt-cli" vagrant
  su -c "${VBIN}/npm install -g generator-jekyllrb" vagrant
  echo $PATH
  su -c "curl -sSL https://rvm.io/mpapis.asc | gpg --import -" vagrant
  su -c "curl -sSL https://get.rvm.io | bash -s stable --ruby" vagrant
fi
}

# --------------------- MAIN ----------------------- #

system_upgrade
dependencies_packages
virtual_env_installation