const Comment=require('../models/comment');
const Post=require('../models/posts');

module.exports.create=function(req,res){
    //find the posts in db
    Post.findById(req.body.post,function(err,post){
        console.log(req.body.post)

        if(err){console.log(`Error in creating comment :  ${err} `)}

        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id 
            }, function(err,comment){
                //handle the err
                console.log(comment)
                post.comments.push(comment);
                post.save();
                res.redirect('/');

            }
            )
        }
    })
}

module.exports.destroy=function(req, res){
    
    Comment.findById(req.params.id, function(err, comment){
        if(err){console.log("Error",err);}
        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.remove();

            Post.findByIdAndUpdate(postId,{ $pull:{comments: req.params.id}},function(err,post) {

                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
}