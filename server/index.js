"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors")); //npm install @types/cors
const router_1 = require("./routes/router");
// importando para conexion con mongo
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const express_1 = require("express");
// configurando el passport
require('./config/passport');
//INstanciando el servidor
// const server = new Server();
const server = server_1.default.instance;
// inicializamos passport
server.app.use(passport_1.default.initialize());
//configurando bodyparser para que los argumentos que lleguen por urlencoded
//lleguen en el arreglo 'body' del request
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());

// HEROKU
var distDir = __dirname + "../dist/";
server.app.use(express_1.static(distDir));

//CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
server.app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//configurando las rutas
server.app.use('/', router_1.router); //var app = express()
mongoose_1.default.Promise = global.Promise;
// mongoose_1.default.connect('mongodb://localhost:27017/Chat')
mongoose_1.default.connect('mongodb://user:usuario1@ds119113.mlab.com:19113/db-its')
    .then(() => {
    console.log("Conexion a mongodb exitoso");
    server.app.set('port', server.port);
    //iniciando el servidor
    server.start(() => {
        console.log(`Servidor corriendo en el puerto ${server.port}`);
    });
});
