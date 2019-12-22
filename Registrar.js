var http = require("http");
var url = require("url");
var fs = require('fs');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert'); //utilitzem assercions

var ObjectId = require('mongodb').ObjectID;

var assert = require('assert'); //utilitzem assercions
function iniciar() {
    

   
    function onRequest(request, response) {
        var sortida;
        var pathname = url.parse(request.url).pathname;
        var consulta = url.parse(request.url, true).query;
        console.log("Petició per a  " + pathname + " rebuda.");
        
        if (pathname == '/Registrar') {
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });

            fs.readFile('./registrar.html', function (err, sortida) {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.write(sortida);
                response.end();
            });
           
            

        }
        else if (pathname == '/index') {
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });

            fs.readFile('./index.html', function (err, sortida) {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.write(sortida);
                response.end();
            });
        
        
        }
        else if (pathname == '/jquery.js'){
        response.writeHead(200, {
				"Content-Type": "text/html; charset=utf-8"
			});
            fs.readFile('./jquery.js', function (err, sortida) {
				response.writeHead(200, {
					'Content-Type': 'text/javascript'
				});

				response.write(sortida);
				response.end();
			});


        }
        else if (pathname == '/othello.css') {
			response.writeHead(200, {
				"Content-Type": "text/html; charset=utf-8"
			});

			fs.readFile('./othello.css', function (err, sortida) {
				response.writeHead(200, {
					'Content-Type': 'text/css'
				});

				response.write(sortida);
				response.end();
			});

        }
        else if (pathname == '/fondo.jpg') {
            fs.readFile('./fondo.jpg', function(err, sortida) {
                response.writeHead(200, {
                    'Content-Type': 'image/jpg'
                });
                response.write(sortida);
                response.end();
            });
        } else if (pathname == '/desa') {
            var ruta = 'mongodb://localhost:27017/daw2';
            console.log(consulta.nombre);
             MongoClient.connect(ruta, function (err, db) {
                   assert.equal(null, err);
                 console.log("Connexió correcta para agregar");
                  console.log('conexion de agregar');
                   db.db('daw2').collection('usuarios').insertOne({
                      "nom": consulta.nombre,
                        "nacio": consulta.nacio,
                         "Contraseña":consulta.Contraseña
                
                     });
                    });
            response.write("<a href='/Registrar'>Torna </a>");
            response.write("<a href='/index'>Torna </a>");
            response.end();
                      
                    
                    
                   
             
            
           
      
        }else if(pathname == '/iniciarco'){
            var array_user=[];
            function listadousuarios(array_user){
                var ruta = 'mongodb://localhost:27017/daw2';
            MongoClient.connect(ruta, function (err, db) {
                assert.equal(null, err);
                console.log("Connexió correcta");

                response.writeHead(200, {
                    "Content-Type": "text/html; charset=utf-8"
                });
                console.log("consulta document a col·lecció usuaris");
                    
                var cursor = db.collection('usuarios').find({});
                cursor.each(function (err, doc) {
                    
                    
                    array_user.push(doc.nom,doc.nacio,doc.Contraseña);

                    });
                });
                
                for (x=0;x < array_user; x++){
                    response.write('<p>'.array_user[x][0],array_user[x][1],array_user[x][2]);
                }
           
        }
        listadousuarios(array_user);
       
        response.end();
        }
     else {
        response.writeHead(404, {
            "Content-Type" : "text/html; charset=utf-8"
        });
        sortida = "404 NOT FOUND";
        response.write(sortida);
        response.end();
    }
    
    
    }
   
  
    
    http.createServer(onRequest).listen(8888);
    console.log("Servidor iniciat.");
   
}

exports.iniciar = iniciar;