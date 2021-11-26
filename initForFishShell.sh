# /bin/bash/shell

# fish Shell에서는 안됨!!

export (cat .env | sed 's/#.*//g' | xargs)
# export USERPWD
# export HOST
# export ROOTPWD

# mkdir {HOST}

mkdir -p /tmp/mysql

npm install --legacy-peer-deps
#  {USERPWD} {HOST} {ROOTPWD}
sh ./cmd/db/db_run.sh {USERPWD} {ROOTPWD}

cd ./ui

npm install --legacy-peer-deps

npm run make 

cd ../

npm run build
npm run start
