//server express
import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

import viewsRouter from './routes/view.router.js';

import { Server } from 'socket.io';

//server https
const app = express();

const httpServer = app.listen(8080, ()=>{console.log("tamo en el 8080")})

//server socket
const io = new Server(httpServer);


//routes
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'));
app.use('/', viewsRouter)

//mensajes
let messages = [];

//escuchar conexiones entrantes
io.on('connection', socket =>{
    console.log('Cliente conectado');
    socket.on('message', data =>{
        messages.push(data)
            console.log(data)
        //mandar los mensajes a todos
        io.emit("messageLogs",messages)
    })
    socket.on('userAuth', data =>{
        //mandar los mensajes a uno
        io.emit("messageLogs",messages)
    })
})

