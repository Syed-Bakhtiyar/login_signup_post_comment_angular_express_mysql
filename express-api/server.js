const dbModule = require('./modules/DbHelper.js');
const cors = require('cors');
const body_parser = require('body-parser');
const express = require('express');
const app = express();
app.use(body_parser.urlencoded({extended:true}));
app.use(cors());

app.post('/createUser',(req,res)=>{
    console.log(req.body.email, req.body.password);
    dbModule.createUsers(req.body.first_name, req.body.last_name, req.body.email, req.body.password, res);
});

app.post('/userlogin',(req,res)=>{
    console.log(req.body.email, req.body.password);
    dbModule.getAuthenticatedUser(req.body.email, req.body.password, res);
});

app.post('/createPost',(req, res)=> {
    console.log(req.body.user_id);
    dbModule.createPostForUsers(req.body.user_id, req.body.post,res);
});

app.get('/getPost',(req, res)=> {
    console.log(req.query.user_id);
    dbModule.getUserPost(req.query.user_id,res);
});

app.delete('/deletePost',(req, res)=> {
    console.log(req.query.post_id);
    dbModule.deletePost(req.query.post_id, res);
});

app.post('/createComments', (req, res)=> {
    console.log(req.body,req.body.post_id, req.body.comments);
    dbModule.postComments(req.body.post_id, req.body.comments, res);
});

app.get('/getComment',(req, res)=> {
    // console.log();
    dbModule.getComments(req.query.post_id,res);
});

app.delete('/deleteComment',(req, res)=> {
    console.log(req.query.comment_id);
    dbModule.deleteComment(req.query.comment_id, res);
});

app.listen(3000, ()=>{
    console.log('Port Started On Port 3000');
});