// const http = require('http');

// const server = http.createServer((request, response) => {
//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.end("Hello World!");
// });

// const port = process.env.PORT || 1337;
// server.listen(port);

// console.log("Server running at http://localhost:%d", port);

var express = require('express');
var app = express();
const PORT = 3000;
app.get('/', function (req, res) {
res.send('Hola mundo desde el sena');
});
app.listen(3000, function () {
console.log(`Server running at port ${PORT}`);
});


var obtenerTiempo = function (requerimiento, respuesta, siguiente) {

    var text = '{ "employees" : [' +
                                    '{ "firstName":"John" , "lastName":"Doe" },' +
                                    '{ "firstName":"Anna" , "lastName":"Smith" },' +
                                    '{ "firstName":"Peter" , "lastName":"Jones" } ]}'; 

    requerimiento.obtenerTiempo =  text;
    siguiente();
};

app.use(obtenerTiempo);

app.get('/escritura', function(requerimiento, respuesta){
    var textoRespuesta = ' texto de respuesta middelware DCE, LOD ';
    
    textoRespuesta += ' solicitud de funcion  ' + requerimiento.obtenerTiempo + ' ';
    console.log(requerimiento.obtenerTiempo);

    respuesta.send(textoRespuesta);
})


app.get('/sql', function (req, res) {
   
    var sql = require("mssql");

    var config = {
        server: "dceserve.database.windows.net", // Use your SQL server name
        database: "BD_DCE", // Database to connect to
        user: "dcubides@dceserve", // Use your username
        password: 'Omegaboston40', // Use your password
        port: 1433,
        // Since we're on Windows Azure, we need to set the following options
        options: {
              encrypt: true
          }
       };

 // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from geoparques', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});

app.delete