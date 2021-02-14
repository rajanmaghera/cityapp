const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
require('dotenv').config()
const url = process.env.MONGO_URL;

const dbName = "Users"
const colName = "somCollection"
const editName = "John"

MongoClient.connect(url, {
    useUnifiedTopology: true
  })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db(dbName)
    const someCollection = db.collection(colName)

    app.post('/post', (req, res) => {
      someCollection.insertOne(req.body)
        .then(result => {
          console.log(result)
        })
        .catch(error => console.error(error))
    })

    app.get('/get', (req, res) => {
      someCollection.find().toArray()
        .then(results => {
          console.log(results)
        })
        .catch(error => console.error(error))
    })
    app.delete('/delete', (req, res) => {
      someCollection.deleteOne({
          name: req.body.name
        })
        .then(result => {
          res.json('Deleted items')
        })
        .catch(error => console.error(error))
    })
  })
  .catch(error => console.error(error))

app.use(bodyParser.urlencoded({
  extended: true
}))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
