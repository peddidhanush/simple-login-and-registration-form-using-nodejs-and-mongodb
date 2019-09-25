step -1 : clone the source code
step -2 : run the npm install
step -3 : After downloading node_modules. run the node server
    cmd : npm start
step -4 : create db as task in mongo
step -5 : create students, users collections under task db
step -6 : import students.json file in students collection,
          users.json file in users collection
    cmd: mongoimport -d databasename -c collectionname --drop --file filepath\filename

    note: before importing we goto mongo bin root and open cmd as administrator
dummy user's
username: user@gmail.com
password: 123456

url: http://localhost:3000 based on the npm serves
