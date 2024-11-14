const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const {config} = require('./config');
const {routes} = require("./REST/routes");


// Instancja serwera
const app = express();
app.use(express.static(__dirname + '/public'));

// middleware (funkcje) developerskie
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '2048kb'}));

// cors - mechanizm umożliwiający współdzielenie zasobów pomiędzy serwerami znajdującymi się w różnych domenach
app.use(cors());

routes(app);

// uruchomienie serwera
app.listen(config.port, function () {
  console.info(`Server is running at ${config.port}`)
});
