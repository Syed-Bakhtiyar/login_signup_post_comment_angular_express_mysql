const mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pakistan",
    database: "Profile"
  });
const USER_TABLE = 'user_table';
const POST_TABLE = 'post_table';
const COMMENTS = 'comments';

const CREATE_USER_TABLE = "CREATE TABLE IF NOT EXISTS "+USER_TABLE+"(id MEDIUMINT NOT NULL AUTO_INCREMENT, \
    first_name VARCHAR(30) NOT NULL DEFAULT '', \
    last_name VARCHAR(30) NOT NULL DEFAULT '', \
    email VARCHAR(100) NOT NULL UNIQUE, \
    password VARCHAR(30) NOT NULL DEFAULT '',\
    PRIMARY KEY (id)\
)";
const CREATE_POST_TABLE = "CREATE TABLE IF NOT EXISTS "+POST_TABLE+"(id MEDIUMINT NOT NULL AUTO_INCREMENT, \
    user_id MEDIUMINT NOT NULL, \
    post VARCHAR(500) NOT NULL DEFAULT '', \
    PRIMARY KEY(id), \
    FOREIGN KEY(user_id) REFERENCES user_table(id)\
)";
const CREATE_COMMENTS_TABLE = "CREATE TABLE IF NOT EXISTS "+COMMENTS+" (id MEDIUMINT NOT NULL AUTO_INCREMENT, \
    post_id MEDIUMINT NOT NULL, \
    comment VARCHAR(500) NOT NULL DEFAULT '',\
    PRIMARY KEY(id), \
    FOREIGN KEY(post_id) REFERENCES post_table(id)\
)";

con.connect((err)=> {
    if (err) throw err;
    console.log("Connected!");    
    con.query(CREATE_USER_TABLE, (err, result)=>{
      if (err) throw err;
      console.log("Table created");
    });
    con.query(CREATE_POST_TABLE, (err, result)=>{
              if (err) throw err;
              console.log("Table created");
    });
    con.query(CREATE_COMMENTS_TABLE, (err, result)=>{
      if (err) throw err;
      console.log("Table created");
    });
  });

  function createUsers(first_name, last_name, email, password, res){
    let query = 'INSERT INTO '+USER_TABLE+" (first_name, last_name, email, password) VALUES ('"+first_name+"','"+last_name+"','"+email+"','"+password+"')";
    con.query(query, (err, result) => {
        let response = {};
        if(err){
            response.error = 1;
            response.message = "User Already Exists";
            response.key = -1;
            res.json(response);
        }else{
            response.error = -1;
            response.message = "data successfully inserted";
            response.key = result.id;
            res.json(response);
        }
    });
  }

  function getAuthenticatedUser(email, password, res){
      let query = 'SELECT * FROM '+USER_TABLE+" WHERE email = '"+email+"' AND password = '"+password+"'";
      con.query(query, (err,result)=> {
        let response = {};
        if(err){
            response.error = 1;
            response.message = err;
            response.data = [];
            res.json(response);
        }
        if(result.length == 0){
            response.error = 1;
            response.message = "noUserFound";
            response.data = [];
            res.json(response);
        }
        filterResult = result.map(x => (
                      { id:x.id, 
                        first_name:x.first_name,
                        last_name: x.last_name,
                        email:email}
                      )
        );
        response.error = -1;
        response.message = "no error found";
        response.data = filterResult.slice(0,filterResult.length);
        res.json(response);
      });
  }
  
  function createPostForUsers(id, post, res){
    let query = "INSERT INTO "+POST_TABLE+"(user_id,post) VALUES ("+id+",'"+post+"')";
    con.query(query, (err, result)=> {
        let response = {};
        if(err){
            console.log('error',err);
            response.error = 1;
            response.message = "insertion error";
            res.json(response);
        }
        response.error = -1;        
        response.message = "inserted";
        res.json(response);
    });
  }

  function getUserPost(id, res){
    let query = "SELECT * FROM "+POST_TABLE+" WHERE user_id = "+id;
    con.query(query, (err, result)=> {
        response = {};
        if(err){
            response.error = 1;
            response.data = null;
            response.message = "error occured";
            res.json(response);
        }
        response.error = -1;
        response.message = "Okay";
        if(result.length == 0){
            response.data = [];
        }else{
            response.data = result.map(data => ({id: data.id, user_id: data.user_id, post: data.post}));
        }
        res.json(response);
    });
  }

  function deletePost(post_id, res){
    let query = 'DELETE FROM '+POST_TABLE+" WHERE id = '"+post_id+"'";
    con.query(query,(err,result)=> {
        let response = {};
        if(err){
            console.log('error',err);
            response.error = 1;
            response.message = "deletion error";
            res.json(response);
        }
        response.error = -1;        
        response.message = "inserted";
        res.json(response);
    });
  }

  function postComments(post_id, comments,res){
    let query = "INSERT INTO "+COMMENTS+"(post_id, comment) VALUES ("+post_id+",'"+comments+"')";
    con.query(query,(err, result)=> {
        let response = {};
        if(err){
            response.error = 1;
            response.message = "insertion error";
            res.json(response);
        }else{
            response.error = -1;        
            response.message = "inserted";
            res.json(response);
        }
    });
  }

  function getComments(post_id, res){
    let query = "SELECT * FROM "+COMMENTS+" WHERE post_id = "+post_id+"";
    con.query(query, (err, result)=> {
        response = {};
        if(err){
            response.error = 1;
            response.data = null;
            response.message = "error occured";
            res.json(response);
        }
        response.error = -1;
        response.message = "Okay";
        if(result.length == 0){
            response.data = [];
        }else{
            response.data = result.map(data => ({id: data.id, user_id: data.post_id, post: data.comment}));
        }
        res.json(response);
    });
  }

  function deleteComment(comment_id, res){
    let query = 'DELETE FROM '+COMMENTS+" WHERE id = '"+comment_id+"'";
    con.query(query,(err,result)=> {
        let response = {};
        if(err){
            console.log('error',err);
            response.error = 1;
            response.message = "deletion error";
            res.json(response);
        }
        response.error = -1;        
        response.message = "inserted";
        res.json(response);
    });
  }


  module.exports = {
      getAuthenticatedUser,
      createUsers,
      createPostForUsers,
      getUserPost,
      deletePost,
      postComments,
      getComments,
      deleteComment
  };