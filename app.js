'use strict';

// Dependencias
const http = require('http');
const express = require('express');
const logger = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mail = require('nodemailer').mail;

// Creamos servidor y configuramos el puerto
const app = express();
app.set('port', process.env.PORT || 8080);

// Habilitamos log.
app.use(logger('combined'));

// Habilitamos compresion
app.use(compression());

// Habilitamos acceso al formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Habilitamos carpeta externa
app.use(express.static('public'));

// Habilitamos plugins externos
app.use('/assets', [
  express.static(__dirname + '/node_modules/jquery/dist/'),
  express.static(__dirname + '/node_modules/bootstrap/dist/'),
  express.static(__dirname + '/node_modules/normalize.css/'),
  express.static(__dirname + '/node_modules/animate.css/'),
  express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'),
  express.static(__dirname + '/node_modules/cookieconsent/build/')
]);

app.use(cookieParser('keyboard cat'));
app.use(session({ resave: true, saveUninitialized: true, secret: 'keyboard cat', cookie: { maxAge: 60000 } }));

// Habilitamos servidor
const server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

// Mail Configuration
app.post('/enviar-mensaje', function(req, res) {
  mail({
    from: req.body.txtMail,
    to: 'visitatodonuevayork@gmail.com',
    subject: 'Mensaje de ' + req.body.txtNombrels + ' desde visitatodonuevayork.es',
    html:
      '<p><h4>Nombre:</h4> ' +
      req.body.txtNombre +
      '</p>' +
      '<p><h4>Correo Electrónico</h4> ' +
      req.body.txtMail +
      '</p>' +
      '</p><h4>Mensaje</h4> ' +
      req.body.txtMensaje +
      '</p>'
  });

  res.redirect('/');
});
