import { Router } from 'express';//npm install @types/express
import Server from '../classes/server'; // exporta 
import { model } from '../classes/user';
import passport = require('passport');

export var router = Router();

router.get('/mensajes', (req, res) => {
    res.status(200).send(
        {
            ok: true,
            mensaje: "Mensaje correcto"
        });
});

router.post('/mensajes', (req, res) => {
    var de = req.body.de;
    var entrada = req.body.entrada;

    const payload = {
        de,
        entrada
    }

    const server = Server.instance;
    server.io.emit('mensaje-together', payload);

    res.status(200).send(
        {
            ok: true,
            mensaje: "Mensaje correcto",
            entrada: entrada
        });
});

router.post('/mensajes/:id', (req, res) => {
    var entrada = req.body.entrada;
    var de = req.body.de; // para ver de quien viene el mensaje
    var id = req.params.id;

    const payload = {
        de,
        cuerpo: entrada
    }

    const server = Server.instance;
    server.io.in(id).emit('mensaje-privado', payload); //envia mensaje a ese cliente en especifico

    res.status(200).send(
        {
            ok: true,
            mensaje: "Mensaje correcto",
            // entrada:entrada,
            entrada, //es lo mismo
            // id:id
            id
        });
});

router.get('/usuarios', (req, res) => {
    const server = Server.instance;
    //retorna el arreglo de clientes conectados string[]
    server.io.clients((err: any, clientes: string[]) => {
        if (err) {
            return res.status(505).send({
                ok: false,
                err
            });
        } else {
            return res.status(200).send({
                ok: true,
                clientes
            });

        }
    });
});

router.post('/register', (req, res) => {
    console.log(req.body.username);
    console.log(req.body.email);

    var user = new model();
    user.username = req.body.username;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    user.save((err, usuarioRegistrado) => {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token": token
        });
    });
});

router.post("/login", (req, res) => {
    passport.authenticate('local', function (err, user, info) {
        console.log("[login|authenticate]");
        console.log(user);

        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);
});

router.post("/testUsername", (req, res) => {
    model.findOne({ username: req.body.username }, (err, usuario) => {
        if (err) {
            return res.status(500).send({ Error: "Error 500 probar username" });
        }
        if (usuario) {
            return res.status(200).send({ disponible: false });

        } else {
            console.log("[testUsername|findOne] usuarioEncontrado:");
            console.log(usuario);
            return res.status(200).send({ disponible: true });
        }
    })
});