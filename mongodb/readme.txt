show dbs

use abcd

db

show collections;

db.createCollection("users");

db.users.find(); -- select * from users

db.users.insertOne()
db.users.insertMany()

db.users.insert({name:"sanket",age:20});

db.users.insert([
    {name:"Akshay",age:18},
    {name:"Roshan",age:19},
])

db.users.find().pretty();


unstructured - txtfile

semi structured  - Mongodb ( JSON ) - NOSQL

structured -- table format (Excel) , SQL - RDBMS