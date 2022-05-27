const express = require('express');
const cors = require('cors');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //  Middlewares
    this.middlewares();

  }

  middlewares() {
    //  CORS
    this.app.use(cors());

    //  Read and parse the body
    this.app.use(express.json());

    //  Public directory
    this.app.use(express.static('public'));
  }


  listen() {
    this.app.listen(this.port, () => {
      console.log('App listening on port:', this.port);
    });
  }

}



module.exports = Server;