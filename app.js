'use strict';

// Dependencias
const http = require('http');
const express = require('express');
const logger = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const sendmail = require('sendmail');

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
  express.static(__dirname + '/node_modules/cookieconsent/build/'),
]);

app.use(cookieParser('keyboard cat'));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 },
  }),
);

// Mail Configuration
app.post('/enviar-mensaje', function(req, res) {
  let mailFrom = req.body.txtMail;
  let mailTo = 'edufrojo@gmail.com';
  let mailSubject = 'Mensaje de ' + req.body.txtNombre + ' desde visitatodonuevayork.es';
  let mailHtml =
    '<p><h4>Nombre:</h4>' +
    req.body.txtNombre +
    '</p>' +
    '<p><h4>Correo Electrónico</h4> ' +
    req.body.txtMail +
    '</p>' +
    '</p><h4>Mensaje</h4> ' +
    req.body.txtMensaje +
    '</p>';

  sendmail(
    {
      from: mailFrom,
      to: mailTo,
      subject: mailSubject, // Subject line
      html: mailHtml,
      attachments: [],
    },
    function(err, reply) {
      console.log(err && err.stack);
      console.dir(reply);
    },
  );
});

// Habilitamos servidor
const server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
