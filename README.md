# Mysql Mongo Benchmark

> 1. create docker
> 2. dummydata insert
> 3. db indexing
> 4. benchmark with api call

- MongoDB 7.0.2
- MySQL Server 8.1.0-1
- mongodb 6.1.0 
- mysql2 3.6.2

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
cd express-sample
yarn install
yarn start
```

### testing
**Postman API request**
(GET) http://localhost:8000/mysql
(GET) http://localhost:8000/mongo

### result
**mysql**
![image](https://github.com/overist/benchmark-mongo-mysql/assets/48134435/6e51bc56-b0a2-47d9-a09e-fb4d2c2b768d)

**mongo**
![image](https://github.com/overist/benchmark-mongo-mysql/assets/48134435/f0f4de26-f579-467f-ab09-4c66dc34efc9)
