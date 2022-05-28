const express = require('express');
const cors = require('cors');
const db = require('../database/connection');


class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      contacts: '/api/contacts'
    }

    // DB Connection
    this.dbConnection();

    //  Middlewares
    this.middlewares();

    // Routes
    this.routes();

  }

  // TODO: DB Connection 
  async dbConnection () {
    try {
      await db.authenticate();
      console.log('Database online');

    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  middlewares() {
    //  CORS
    this.app.use(cors());

    //  Read and parse the body
    this.app.use(express.json());

    //  Public directory
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.paths.auth, require('../routers/auth'));
    this.app.use(this.paths.contacts, require('../routers/contacts'));
  }


  listen() {
    this.app.listen(this.port, () => {
      console.log('App listening on port:', this.port);
    });
  }

}



module.exports = Server;