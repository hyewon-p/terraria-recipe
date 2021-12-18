const mongoose = require('mongoose');
const fs = require('fs');
const ejs = require('ejs')
const { Db } = require('mongodb');
const internal = require('stream');
const { number } = require('joi');
const path = require('path');
const static = require('serve-static');
const http = require('http')



const express = require("express");
const exp = require('constants');
const app = express();
let items = {};
let foundItems = {};

//bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

app.set("view engine", "ejs");
//app.use(express.static(__dirname + '/'));

app.listen(3000, 'localhost', () => {
    console.log('listening for request on port 3000');
})

require('dotenv').config({path: 'variables.env'});

//static files
app.use(express.static(path.join(__dirname+'/../public')));

//schema&model 정의
//----------


const itemSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    recipe1: Number,
    recipe2: Number,
    recipe3: Number,
    recipe4: Number,
    recipe5: Number,
    recipe6: Number,
    image: {type: String, required: true},
    table: {type: Array}
}, {collection: 'terraria_item2'});


const tableSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    name: {type: String},
    alternate_name: {type: String}
})

const reciptSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    table: {type: Number},
    name: {type: Number},
    quantity: {type: Number},
    ingredient1: {type: Number},
    amount1: {type: Number},
    ingredient2: {type: Number},
    amount2: {type: Number},
    ingredient3: {type: Number},
    amount3: {type: Number},
    ingredient4: {type: Number},
    amount4: {type: Number},
    ingredient5: {type: Number},
    amount5: {type: Number},
    ingredient6: {type: Number},
    amount6: {type: Number},
})

const terraria_table = mongoose.model("terraria_table", tableSchema);
const terraria_item = mongoose.model("terraria_item2", itemSchema);
const terraria_recipe = mongoose.model("terraria_recipe2", reciptSchema);

//-------------


mongoose.connect(process.env.MongoDB_URL, {useNewUrlParser: true}, (err)=>{
    if(err){
        console.log(err);
    }else{   
        console.log("looking up data");
        terraria_item.aggregate([
            {'$limit': 207},
            {
            $lookup:{
                from: "terraria_recipe2",
                localField: "recipe1",
                foreignField: "id",
                as: "r1"
            }},
            {$unwind: {path: '$r1', preserveNullAndEmptyArrays: true}},
            {$lookup:{
                from: "terraria_recipe2",
                localField: "recipe2",
                foreignField: "id",
                as: "r2"
            }},
            {$unwind: {path: '$r2', preserveNullAndEmptyArrays: true}},    
            {$project:{'_id':0}}
            
        ],
        function(err, result){
            if (err){
                console.log(err)
            }
            else{
                items = result
                foundItems = result
            }
        });
    }
})

app.use(express.static(path.join(__dirname, '../views')));


app.get("/", (req,res)=> {
    console.log("테스트 페이지");
    terraria_item.aggregate([
        {'$limit': 207},
        {
        $lookup:{
            from: "terraria_recipe2",
            localField: "recipe1",
            foreignField: "id",
            as: "r1"
        }},
        {$unwind: {path: '$r1', preserveNullAndEmptyArrays: true}},
        {$lookup:{
            from: "terraria_recipe2",
            localField: "recipe2",
            foreignField: "id",
            as: "r2"
        }},
        {$unwind: {path: '$r2', preserveNullAndEmptyArrays: true}},    
        {$project:{'_id':0}}
        
    ],
    function(err, result){
        if (err){
            console.log(err)
        }
        else{
            items = result
            foundItems = result
        }
    });
    //let item_list = [{'name':'pickaxe'},{'name':'gold'}]
    return res.render("index",{'items': items})
})

app.get('/findByForm', (req, res) => {
    let id = req.query.search;
   console.log("name:",id);
   terraria_item.aggregate([
    {$match: {$or:[{name: {$regex:id, $options: 'i'}},{id:id}]}},
    {
    $lookup:{
        from: "terraria_recipe2",
        localField: "recipe1",
        foreignField: "id",
        as: "r1"
    }},
    {$unwind: {path: '$r1', preserveNullAndEmptyArrays: true}},
    {$lookup:{
        from: "terraria_recipe2",
        localField: "recipe2",
        foreignField: "id",
        as: "r2"
    }},
    {$unwind: {path: '$r2', preserveNullAndEmptyArrays: true}},    
    {$project:{'_id':0}}
    
],
function(err, result){
    if (err){
        console.log(err)
    }
    else{
        items = result;
        foundItems = result;
        module.exports = {
            items:items
        }
    }
});
    return res.render("index",{'items': foundItems})
    // res.redirect('/?'+foundItems)
 })

