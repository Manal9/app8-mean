const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/pointDB', (err, client) => {
        if (err) return console.log(err);
        let db = client.db('pointDB');
        closure(db);
    })
}


  router.get('/users/:id', (req, res) =>{
    connection(db=>{
      db.collection('users').findOne({_id:ObjectID(req.params.id)},(err,result)=>{
        res.send(result);
        //res.send(req.params.id);
    })
  })
  })

  router.get('/todos/:id', (req, res) =>{
    connection(db=>{
      db.collection('users').findOne({_id:ObjectID(req.params.id)},(err,result)=>{
        res.send(result.todo);
        //res.send(req.params.id);
    })
  })
  })

  router.put('/todos/:id', (req, res) =>{
    connection(db=>{
      db.collection('users').update({_id:ObjectID(req.params.id)},{$addToSet: {todos: req.body }},(err,result)=>{
        res.send(result.todos);
    })
  })
  })
  
  router.get('/todos/:id/0', (req, res) =>{
    connection(db=>{
      db.collection('users').findOne({_id:ObjectID(req.params.id)},(err,result)=>{
        res.send(result.todos[0]);
        //res.send(req.params.id);
    })
  })
  })
  
  module.exports = router;