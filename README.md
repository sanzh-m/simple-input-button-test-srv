To create db: 
```
docker run -p 5432:5432 --name input-button-postgres -e POSTGRES_PASSWORD=input-button -d postgres:10.16
```

Insert data:
```
echo "localhost:5432:postgres:postgres:input-button" > ~/.pgpass
sudo chmod 600 ~/.pgpass
psql -f ./db-init.sql -U postgres -h localhost -w
```

To start the server:
```
yarn start:dev
```