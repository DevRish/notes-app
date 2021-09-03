require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const routesHandler = require('./routes.js');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/', routesHandler);

// In production
if(process.env.NODE_ENV==='production')
{
    app.use(express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});