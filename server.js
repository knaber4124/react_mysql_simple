const express = require('express');
const cors = require('cors');
const app = express();
const db =require('./app/models');


var corsOptions = {
    origin:'http://localhost:4100'
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

db.sequelize.sync({force:true}).then(()=>{
    console.log('drop and re-sync db')
});

app.get('/',(req,res)=>{
    res.json({message:'Welcome to simple mySQL test app'})
});

const PORT = process.env.PORT|| 8000;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}. `);
})