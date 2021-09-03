const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// -------Database Connection:---------------
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('Connection Successful')).catch((err)=>{
    console.log('Failed to connect with error:');
    console.log(err);
});

// ------------Schemas--------------------
const noteSchema = new mongoose.Schema({
    note: String,
    author: String,
    private: Boolean
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const Note = mongoose.model('Note', noteSchema);
const User = mongoose.model('User', userSchema);

// ----------- Middleware-----------------
const jwtSecret = process.env.SECRET_KEY;
function auth(req, res, next){
    const token = req.headers['authorization'];
    console.log(token);
    // check if there is token
    if(typeof token === 'undefined') res.end(JSON.stringify({ message: "No token. Access Denied." }));
    // verify token
    try{
        const decoded = jwt.verify(token, jwtSecret); // this automatically throws error if wrong token
        req.payloadData = decoded; // this line is basically useless, just doing sothat decoded is not "unused-variable"
        next();
    }
    catch(e){
        console.log(e);
        res.json({ message: "Wrong Token" });
    }
}

//---------------------Routes----------------------

// Notes Data sending api
router.get('/pubNotes', async (req,res) => {
    await Note.find({}, (err, notes) => {
        notes.reverse();
        if(err) 
        {
            console.log('Error fetching data');
            console.log(err);
        }
        else
        {
            if(notes) res.end(JSON.stringify(notes));
            else res.end();
        }
    });
});

// Notes Data adding api
router.post('/addNote', auth, async (req,res) => {
    const newNote = new Note({
        note: req.body.newNote,
        author: req.body.user,
        private: (req.body.access==="private")
    });

    newNote.save().then(() => {
        console.log('New note added.');
    }).catch((err)=>{
        console.log(err);
    });
    //res.redirect('/'); // the form gets submitted, it goes to the new page, then redirects back to main page
    res.end();
});

// Notes Data deleting api
router.delete('/delNote/:id', auth, async (req,res) => {
    try{
        const delNote = await Note.findByIdAndDelete(req.params.id).catch((err)=> console.log(err));
        res.send(await delNote);
    }
    catch(err)
    {
        res.send(err);
    }
    res.redirect('/');
    res.end();
});

// SignUp api
router.post('/signup', async (req,res) => {
    const signUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    await User.find({ username: req.body.username }).then((users) => {
        if(users.length===0)
        {
            signUser.save().then(() => {
                jwt.sign(
                    { authSuccess: 'success' },
                    jwtSecret,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if(err) throw err;
                        res.json({ 
                            token: token,
                            message: 'success'
                        });
                    }
                )
                console.log('New User added.');
                //res.send(JSON.stringify({ message: 'success'}));
            }).catch((err)=>{
                console.log(err);
            });
        }
        else
        {
            console.log('User exists. Please sign in instead of signup.');
            res.send(JSON.stringify({ message: 'exists'}));
        }
    }).catch((err) => console.log(err));
    //res.end();
})

// SignIn api
router.post('/signin', async (req,res) => {
    const signUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    await User.find({ username: req.body.username }).then((users) => {
        if(users.length===0)
        {
            console.log('Account doesnot exist.');
            res.send(JSON.stringify({ message: 'NA'}));
        }
        else
        {
            console.log('Account exists.');
            // if password matches then login otherwise show wrong password
            if(users[0].password===req.body.password) 
            {
                console.log("Password matches, signed in.");
                jwt.sign(
                    { authSuccess: 'success' },
                    jwtSecret,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if(err) throw err;
                        res.json({ 
                            token: token,
                            message: 'success'
                        });
                    }
                )
                //res.send(JSON.stringify({ message: 'success'}));
            }
            else 
            {
                console.log("Wrong Password")
                res.send(JSON.stringify({ message: 'wrong'}));
            }
        }
    }).catch((err) => console.log(err));
    //res.end();
});

module.exports = router;