# Mysql Mongo Benchmark

> 1. create docker
> 2. dummydata insert
> 3. db indexing
> 4. benchmark with api call

### data setting

**mongo db**

```
cd mongotest
docker-compose up -d // create docker, need volume path setting
node index.js // insert data
node create-index.js // set db index
```

**mysql db**

```
cd mysqltest
docker-compose up -d // create docker, need volume path setting
node index.js // insert data
node create-index.js // set db index
```

### web server

```
cd express sample
yarn install
yarn start
```

### testing

Postman api request
