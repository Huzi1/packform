docker run -d -p 5432:5432  -e POSTGRES_PASSWORD="admin" -v $PWD:/var/lib/postgresql/data postgres:11.8 

# mongodb
docker run -d -p 8081:8081  -e MONGO_INITDB_ROOT_USERNAME:"root" -v $PWD:/var/lib/postgresql/data mongo:bionic



docker pull 