# /bin/bash/shell

sudo kill $(sudo lsof -t -i:10100)
sudo kill $(sudo lsof -t -i:10200)