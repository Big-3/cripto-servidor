#add identity key
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
apt-key list
#add repo to list of repos
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt update
#install
sudo apt install mongodb-org
#enable mongoDB AT STARTUP
sudo systemctl enable --now mongod.service
sudo systemctl status mongod
#verify its running
mongo --eval 'db.runCommand({ connectionStatus: 1 })'