const express = require('express');
require('dotenv').config();
const { dbConnection } = require('../database/config')
const Automovil = require('./automovil');
const { body, validationResult, check } = require('express-validator');
const port = process.env.PORT;
class Server {
    constructor() {
        this.app = express();
        this.conectarDB();
        this.middlewares();
        this.rutas();
    }
    middlewares() {
        this.app.use(express.json()) //Middleware para leer json;
        this.app.use(express.static('public'));
        //^Middleware para servir la carpeta public
    }
    async conectarDB() {
        await dbConnection()
    }
    rutas() {
        /******* RUTAS DEL Automovil *****/
        this.app.get('/webresources/generic/automovil/:id', async function(req, res) {
            const id = req.params.id;
            let automovil = await Automovil.findById(id);
            res.json(
                automovil
            )
        })
        this.app.get('/webresources/generic/automovil', async function(req, res) {
            let Automoviles = await Automovil.find();
            res.json(
                Automoviles
            )
        })
        this.app.post('/webresources/generic/automovil', function(req, res) {
                const body = req.body;
                let miAutomovil = new Automovil(body);
                miAutomovil.save();
                res.json({
                    ok: true,
                    msg: 'post API Automovil',
                    miAutomovil
                })
            })
            //put-Automovil
        this.app.put('/webresources/generic/automovil/:id', async function(req, res) {
                const body = req.body;
                const id = req.params.id;
                await Automovil.findByIdAndUpdate(id, body);
                res.json({
                    ok: true,
                    msg: 'post API Automovil',
                    body
                })
            })
            //delete Automovil
        this.app.delete('/webresources/generic/automovil/:id', async function(req, res) {
            const id = req.params.id;
            await Automovil.findByIdAndDelete(id);
            res.status(200).json({
                ok: true,
                msg: 'delete API'
            })
        })
    }

    listen() {
        this.app.listen(port, function() {
            console.log('Escuchando el puerto', port)
        });
    }
}
module.exports = Server;