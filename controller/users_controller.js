const User = require('../models/users');

//we export this function so that routers used in the controller action
module.exports.profile = function(req , res ){
    User.findById(req.params.id,function(err,user){
        return res.render('profile',{
            title:'profile',
            profile_user : user
    })
  
    })
}

module.exports.update=function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body,function(err,user){
            return res.redirect('back');
        
        });

    }else{
        return res.status(401).send("unauthrized");
    }
}

module.exports.post=function(req,res){
    return res.render('post',{
        title:'posts'
    })
}

module.exports.signUp=function(req , res ){
    return res.render('sign_up',{
        title:'Sign Up'
    });
}

module.exports.signIn=function(req , res ){
    return res.render('sign_in',{
        title:'Sign In'
    });
}


// for SignUp 
module.exports.create = function(req , res ){
    //if pass and c-pass not matched
    if(req.body.password != req.body.c_password){
        return res.redirect('back');   //back to signIN 
    }

    //Check User of given is already exist ?
    User.findOne( { email : req.body.email } , function(err , user){
        if(err){ console.log("Error , While Finding the data"); }
        
        if(!user){
            //store new details of user
            User.create(req.body , function( err , user){
                if(err){ console.log('Error occur While storing Data');}
                return res.redirect('/');
            });
        }
        else{
            res.redirect('/users/sign-in');
        }
    })
}

//tHIS module used to create  session after successfully SignIn
module.exports.createSession = function( req ,res ){
    req.flash('success','Logged In Successfully..!!!')
   return res.redirect('/');
}
  
// for logged out 
module.exports.destroySession = function (req , res){
    
    req.logout(function(err){
        if(err){ console.log('Error Occur whhile logout ',err); return next(err);}
        req.flash('success','Logged Out...!!!')
        return res.redirect('/');

    });
}