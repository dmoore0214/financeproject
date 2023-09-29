const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

const expenses = [];

app.get('/', (req,res) => {
    res.render('index');
});

app.post('/addExpense', (req,res) => {
    const {description, amount } = req.body;
    expenses.push({description, amount});
    res.redirect('/');
});

app.get('/getExpenses', (req, res) => {
    res.json(expenses);
});

app.listen(port, () => {
    console.log('Expense Tracker app is listening on port ${port}');
});
