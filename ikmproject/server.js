const mongoose = require('mongoose')

const app = require('./app')

const port = 3000;

mongoose.connect(process.env.CONNECTION_LINK)


.then(
    () =>{
        console.log("Connection with mongo established");

        app.listen(port,()=>{
            console.log('Server is up')
        })
    },
    err=>{
        console.log('Failed to connect in mongo',err)
    }
)

//console.log("where are you server")