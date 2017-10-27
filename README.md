# sql-review

Run npm init -y.
npm i --save express body-parser cors dotenv massive
Create a .env file.
Create a .gitignore to ignore the node_modules folder and the .env file.
Create an index.js file.


 <!-- .gitignore -->
node_modules
.env

<!-- index.js  -->
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
require('dotenv').config()

const app = express();
app.use( bodyParser.json() );
app.use( cors() );

const port = process.env.PORT || 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );


<!-- index.js  -->
massive( process.env.CONNECTION_STRING ).then( dbInstance => app.set('db', dbInstance) );


CREATE TABLE products (
  product_id SERIAL PRIMARY KEY NOT NULL,
  name varchar(40) NOT NULL,
  description varchar(80) NOT NULL,
  price integer NOT NULL,
  image_url text NOT NULL
);


  <!-- create_product.sql  -->
INSERT INTO products ( name, description, price, image_url ) VALUES ( $1, $2, $3, $4 );
  <!-- read_products.sql  -->
SELECT * FROM products;
  <!-- read_product.sql  -->
SELECT * FROM products WHERE product_id = $1;
  <!-- update_product.sql  -->
UPDATE products SET description = $2 WHERE product_id = $1;
  <!-- delete_product.sql  -->
DELETE FROM products WHERE product_id = $1;


<!-- index.js -->
app.post( '/api/product', products_controller.create );
app.get( '/api/products', products_controller.getAll );
app.get( '/api/product/:id', products_controller.getOne );
app.put( '/api/product/:id', products_controller.update );
app.delete( '/api/product/:id', products_controller.delete );


  <!-- products_controller.js  -->
module.exports = {
  create: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
    const { name, description, price, imageurl } = req.body;

    dbInstance.create_product([ name, description, price, imageurl ])
      .then( () => res.status(200).send() )
      .catch( () => res.status(500).send() );
  },

  getOne: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
    const { params } = req;

    dbInstance.read_product([ params.id ])
      .then( product => res.status(200).send( product ) )
      .catch( () => res.status(500).send() );
  },

  getAll: ( req, res, next ) => {
    const dbInstance = req.app.get('db');

    dbInstance.read_products()
      .then( products => res.status(200).send( products ) )
      .catch( () => res.status(500).send() );
  },

  update: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
    const { params, query } = req;

    dbInstance.update_product([ params.id, query.desc ])
      .then( () => res.status(200).send() )
      .catch( () => res.status(500).send() );
  },

  delete: ( req, res, next ) => {
    const dbInstance = req.app.get('db');
    const { params } = req;

    dbInstance.delete_product([ params.id ])
      .then( () => res.status(200).send() )
      .catch( () => res.status(500).send() );
  }
};
