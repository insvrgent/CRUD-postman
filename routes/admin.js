const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
const models = require('../models/index'); 
const admin = models.admin;
//end

//get data
app.get("/", (req,res) => {
    admin.findAll()
        .then(admin => {
            res.json(admin)
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.get("/:admin_id", (req, res) =>{
    admin.findOne({where: {admin_id: req.params.admin_id}})
    .then(result => {
        res.json({
            admin: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})
//menyimpan data admin, method: POST, function: create

app.post("/", (req,res) => {
    let data = {
        name: req.body.name,
        username: req.body.username,
        password: md5(req.body.password)
    }
    admin.create(data)
        .then(result => {
            res.json({
                message: "data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.put("/:id", (req,res) => {
    let param = { admin_id: req.params.id}
    let data = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    }
    admin.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    })

app.delete("/:id", (req,res) => {
    let param = {
        admin_id : req.params.id
    }
    admin.destroy({where: param})
        .then(result => {
            res.json({
                message: "data has been deleted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

module.exports = app;