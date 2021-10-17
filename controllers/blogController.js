const Blog = require('../models/blog')
const db = require('../util/db.util');

function createBlog(req, res){
    Blog.create({
        author : req.body.author,
        title : req.body.title,
        created_at : req.body.created_at,
        content: req.body.content
    
    }, 
    function (err, user) {
        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send(user);
    });
}

function readAllBlog(req, res){
    Blog.find({},
        function(err, data){
        if(data){
            return res.json({status: "success",
            message: "All Blog Retrieved Successfully", 
            data})
        } else{
            return res.json({message: "Some error occurred while retrieving Blogs", err})
        }
    })
}


function readOneBlog(req, res){
    Blog.findById(req.params.id,function(err,data){
        if(data){
            return res.json({status: "success", message: "Retrieved Successfully", data:data})
        }else {
            return res.json({status: "failed", message: "Failed to Retrieve", err})
        }
    })
}


function updateOne(req, res){
    Blog.findByIdAndUpdate(req.params.id,req.body, {new: true}, function(err, data){
        if(data){
            return res.status(200).json({message: 'Blog updated successfully', data});
        }else{
            return res.status(200).json({message: 'Unable to Update', err});
        }
    })
}

function deleteBlog(req,res){
    Blog.findByIdAndRemove(req.params.id, function(err,data){
        if(data){
            return res.status(200).json({message: 'items deleted'})
        }else{
            return res.status(200).json({message: 'Unable to delete'})
        }
    })
}

module.exports = { createBlog, readAllBlog, readOneBlog, updateOne, deleteBlog }


