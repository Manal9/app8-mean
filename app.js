var express = require('express')
var bodyParser = require('body-parser');
var app = express()

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/pointDB', (err, client) => {
        if (err) return console.log(err);
        let db = client.db('pointDB');
        closure(db);
    })
}

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

 
app.get('/aaa', function (req, res) {
  res.send('<h1>Hello World</h1>');

})
app.get('/ab', (req, res) =>{
    res.send("this is home 1");
  
  })

  app.get('/abc', function (request, response) {
      console.log(__dirname);
    response.sendFile(__dirname+'/index.html');
  
  })
  app.get('/abb', function (req, res) {
    console.log(__dirname);
  res.sendFile(__dirname+'/about.html');
})


app.get('/', function (req, res) {
  connection(db=>{
    db.collection('users').find().toArray().then(result=>{
      res.send(result);
    })
  })

})

/***app.get('/api/users/:id', (req, res) =>{
  connection(db=>{
    db.collection('users').findOne({_id:ObjectID(req.params.id)},(err,result)=>{
      res.send(result);
      //res.send(req.params.id);
  })
})
})
app.get('/api/todos/:id', (req, res) =>{
  connection(db=>{
    db.collection('users').findOne({_id:ObjectID(req.params.id)},(err,result)=>{
      res.send(result.todo);
      //res.send(req.params.id);
  })
})
})


app.put('/api/todos/:id', (req, res) =>{
  connection(db=>{
    db.collection('users').update({_id:ObjectID(req.params.id)},{$addToSet: {todos: req.body }},(err,result)=>{
      res.send(result.todos);
  })
})
})

app.get('/api/todos/:id/0', (req, res) =>{
  connection(db=>{
    db.collection('users').findOne({_id:ObjectID(req.params.id)},(err,result)=>{
      res.send(result.todos[0]);
      //res.send(req.params.id);
  })
})
})
***/
app.post('/',(req,res)=>{ 
    
    connection(db=>{
      db.collection('users').insert(req.body, (err,result)=>{
        res.send(result);
      })
    })
    ///res.send("this is post");
    //console.log(req.body);
    //res.send({body:req.body});

});

app.put('/',(req,res)=>{
    res.send("this is put");
})
app.delete('/',(req,res)=>{
    res.send("this is delete");
})
  console.log('marche');
 
app.listen(3000)