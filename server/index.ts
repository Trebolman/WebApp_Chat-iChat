import Server from './classes/server';
import bodyParser, { urlencoded } from 'body-parser';
import cors from 'cors';//npm install @types/cors
import { router } from './routes/router';

// importando para conexion con mongo
import mongoose from "mongoose";
import passport from "passport";

// configurando el passport
require('./config/passport');
//INstanciando el servidor
// const server = new Server();
const server = Server.instance;

// inicializamos passport
server.app.use(passport.initialize());

//configurando bodyparser para que los argumentos que lleguen por urlencoded
//lleguen en el arreglo 'body' del request
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());

// Se importa las rutas
// var rutas = require('./routes/router');

//CORS
server.app.use(cors({origin:true, credentials:true}));
server.app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//configurando las rutas
server.app.use('/',router); //var app = express()

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Chat')
.then(()=>{
    console.log("Conexion a mongodb exitoso");
    server.app.set('port',server.port);
    
    //iniciando el servidor
    server.start(()=>{
        console.log(`Servidor corriendo en el puerto ${server.port}`);
    })
});