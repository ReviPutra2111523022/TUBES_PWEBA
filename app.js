const express = require('express')
const mysql = require('mysql2')
const expressLayouts = require('express-ejs-layouts')
const app = express()


app.set('view engine', 'ejs');

app.use(expressLayouts);

//koneksi database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'tubes_pweb'
  });

  db.connect((err)=>{
    if(err) throw err
   console.log('Database terkoneksi!')

   app.get('/home',function(req, res){
    res.render('home',{
      title : "HOME",
      layout: "layouts/mainLayout"
    });
  })

   const sql = "SELECT * FROM users";
    app.get('/profil',function(req, res){
      db.query(sql,(err,result)=>{
        res.send(result);
      })
      // res.render('profil',{
      //   title : "profil",
      //   layout: "layouts/mainLayout"
      // });
    })
   })
   
  app.get('/new-user', function (req, res) {
      
      const insertSql = "INSERT INTO users (username,email,password,active,avatar,created_at,updated_at) VALUES (?, ?, ?, ?, ?, now(), now())";

      db.query(insertSql,['revi1','revi1@gmail.com','1212','2','revijpg'],(err,rows,result)=>{
        let response = {
          message : "Data berhasil ditambahkan",
          lastId : rows.insertId,
          error : err
        }
        res.json(response);
      })
      

  })

app.listen(3000,()=>{
    console.log("server sudah hidup")
  })