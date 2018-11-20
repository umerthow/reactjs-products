var express = require('express');
var cors = require('cors')
var mysql      = require('mysql');

var bodyParser = require('body-parser');

var app = express();




// Enable cors
app.use(cors());

// Enable body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())




const router = express.Router()

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'umarsstv',
    database:'gaji'
})

connection.connect(err => {
    if(err) 
        return err
})

app.get('/', (req, res ) => {
    return res.json('OK')
})

app.use('/product/store', (req, res, next) => {
    
    console.log(req.body)
   

    const { name , price, description, category_id } = req.body
    if (!req.body.name ) return res.send(`no product name `)

    const INSERT_PRODUCT = `INSERT INTO products (name, price , description, category_id ) VALUES ('${name}', ${price}, '${description}',  ${category_id} )`

    console.log(INSERT_PRODUCT);
    connection.query(INSERT_PRODUCT, (err, result) => {
        if (err) {
            return err
        } else {
            return res.send({result,
                'message':'Product was created'})
        }
    })
   
})

// update
app.use('/product/update', (req, res, next) => {
    
    console.log(req.body)
   

    const { id, name , price, description, category_id } = req.body
    if (!req.body.id ) return res.send(`no product id `)

    const productId = id;

    const UPDATE_PRODUCT = `UPDATE  products SET name='${name}', price=${price} , description='${description}', category_id=${category_id} WHERE id=? `;

    connection.query(UPDATE_PRODUCT,[productId ], (err, result) => {
        if (err) {
            return err
        } else {
            return res.send({result,
                'message':'Product was updated'})
        }
    })
   
})

app.get('/product/add', (req, res) => {
    const { name , price } = req.query
    if (!req.query.name ) return res.send(`no product name `)

    const INSERT_PRODUCT = `INSERT INTO products (name, price) VALUES ('${name}', ${price})`

    connection.query(INSERT_PRODUCT, (err, result) => {
        if (err) {
            return err
        } else {
            return res.json({
                'message': 'Product was created'
            })
        }
    })
   
})


app.get('/product/:id', (req, res) => {
    const id = req.params.id
    if (!id ) return res.send(`no id specified `)

    const SELECT_ONE_PRODUCT_QUERY = 'SELECT * FROM `products` a INNER JOIN `categories` b ON a.category_id = b.category_id WHERE a.id=?';

    connection.query(SELECT_ONE_PRODUCT_QUERY,[id], (err, result) => {
        if (err) {
            return err
        } else {
            return res.json({
                data : result 
            })
        }
    })
   
})



app.get('/products', (req, res ) => {
    const SELECT_ALL_PRODUCT_QUERY = 'SELECT * FROM `products` a INNER JOIN `categories` b ON a.category_id = b.category_id ';

    connection.query(SELECT_ALL_PRODUCT_QUERY, (err , result) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json({
                data : result
            })
        }
    })
})

app.get('/categories', (req, res ) => {
    const SELECT_ALL_CATEGORY_QUERY = 'SELECT * FROM `categories` ';
    
    connection.query(SELECT_ALL_CATEGORY_QUERY, (err , result) => {
        if (err) {
            return res.send(err)
        } else {
            return res.json({
                data : result
            })
        }
    })
})

app.listen( 5000,()=> {
    console.log(`server listening in port 5000`)
})
