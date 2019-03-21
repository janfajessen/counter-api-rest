const express = require('express');
const app = express();

const fs = require('fs');

const port = 4000;


// BODY PARSE TO JSON
app.use(express.json());


// enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.get('/data', (req, res) => {

    const jsonString = fs.readFileSync('./db.json', 'UTF-8');
    const data = JSON.parse(jsonString);
    res.json(data);

})

app.get('/increment', (req, res) => {

    // READ JSON FROM ROM
    const jsonString = fs.readFileSync('./db.json', 'UTF-8');
    const data = JSON.parse(jsonString);


    // UPDATE DATA ON RAM
    data.counterValue += 1;

    // WRITE BACK THE DATA TO ROM
    fs.writeFileSync('./db.json', JSON.stringify(data))

    res.json(data);

})

app.get('/decrement', (req, res) => {

    //READ JSON FROM ROM
    const jsonString = fs.readFileSync('./db.json', 'UTF-8');
    const data = JSON.parse(jsonString);


    //UPDATE DATA ON RAM
    data.counterValue -= 1;

    //WRITE BACK THE DATA TO ROM
    fs.writeFileSync('./db.json', JSON.stringify(data))

    res.json(data);

})

app.get('/reset', (req, res) => {

    //READ JSON FROM ROM
    const jsonString = fs.readFileSync('./db.json', 'UTF-8');
    const data = JSON.parse(jsonString);


    //UPDATE DATA ON RAM
    data.counterValue = 0;

    //WRITE BACK THE DATA TO ROM
    fs.writeFileSync('./db.json', JSON.stringify(data))

    res.json(data);

})

app.get('/decrement', (req, res) => {

    //READ JSON FROM ROM
    const jsonString = fs.readFileSync('./db.json', 'UTF-8');
    const data = JSON.parse(jsonString);


    //UPDATE DATA ON RAM
    data.counterValue -= 1;

    //WRITE BACK THE DATA TO ROM
    fs.writeFileSync('./db.json', JSON.stringify(data))

    res.json(data);

})

app.get('/picker/:color', (req, res) => {


    const jsonString = fs.readFileSync('./db.json', 'UTF-8');
    const data = JSON.parse(jsonString);



    data.color = req.params.color;


    fs.writeFileSync('./db.json', JSON.stringify(data))

    res.json(data);

})

app.get('/incrementBy/:amount', (req, res) => {

    // READ JSON FROM ROM
    const jsonString = fs.readFileSync('./db.json', 'UTF-8');
    const data = JSON.parse(jsonString);


    let amount = Number(req.params.amount)
    if (isNaN(amount)) {
        res.status(500).json({ message: 'UPS :(' })
        return;
    }
    // UPDATE DATA ON RAM
    data.counterValue += amount;

    // WRITE BACK THE DATA TO ROM
    fs.writeFileSync('./db.json', JSON.stringify(data));

    res.json(data);

})





app.listen(port, () => console.log('Servidor levantado en ' + port));
