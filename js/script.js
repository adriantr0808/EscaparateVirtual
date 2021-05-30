$(document).ready(iniciar);




function iniciar() {
  $('#botonImagen').on("click", voz);

  

  $('.fa-times').on("click", aceptar_cookies)
 
  
 

 
  cargarImagenesCarrusel();
  cargarImagenesCatalogo();


}


function cogerBotones(){
  var botones = $('.boton');

  for (i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", anyadirCar);
  }
}


function voz() {

  const SpeechRecognition = webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.start();

  recognition.onstart = function () {

  };

  recognition.onspeechend = function () {

    recognition.stop();
  };


  recognition.onresult = function (e) {

    var transcript = e.results[0][0].transcript;

    $('#inputSearch').val(transcript);



  };
}




function anyadirCar(e){

  if(localStorage.getItem("valor")==null){
    alert("Para comprar debes iniciar sesión");
    if (window.confirm("¿Quieres ir a la página de inicio de sesión?")) {
      window.location.href = "login.html";
    }
  }else{
    if (window.confirm("¿Quieres agregar este producto a la cesta?")) {
      


      if (!("Notification" in window)) {
        alert("Este navegador no soporta las notificaciones del sistema");
    
      } else if (Notification.permission == 'granted') {
        var notificacion = new Notification('CityWalk.es | Tienda', {
          icon: '../img/logo.jpg',
          body: 'Producto agregado a la cesta correctamente!'
        })
    
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          if (permission === "granted") {
            var notificacion = new Notification('CityWalk.es | Tienda', {
              icon: '../img/logo.jpg',
              body: 'Producto agregado a la cesta correctamente!'
            })
    
          }
        });
      }

    
    var boton = e.target;
  //Coger el elemento más cercano con la clase imp
  var elemento = boton.closest('.imp');
 var img = elemento.querySelector('img').src;
 var titulo= elemento.querySelector('h4').textContent;
 var precio = elemento.querySelector('#precio').textContent;



 var array=[

  img,titulo,precio

 ];

 array = array.join(";");


unir(array);
separar();
  }
  
  }

}

//parametro nueva zapatilla
function unir(producto){

  // en este array me guardo el array todos los productos
  var array= [
    producto
  ];

  var pr = localStorage.getItem('nuevo');
  if(pr != null){ //por si no llega nada
    pr = pr.split(','); //los productos, cada zapatilla separada por comas
   

    array.push(pr); //agrego los productos que ya tenemos
    
  }

  localStorage.setItem('nuevo',array);

}

function separar(){
  var pr = localStorage.getItem('nuevo');
  if(pr != null){ //por si no llega nada
    pr = pr.split(','); //los productos, cada zapatilla separada por comas
   
    for(i=0;i<pr.length;i++){
      pr[i] =pr[i].split(';');
    }


    
    
  }
 
  return pr;
}









function cargarImagenesCarrusel() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../json/imagenesCarrusel.json", true);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cargarImagenes(this);
    }
  };
  xhr.send();
}


function cargarImagenes(json) {

  var datos = JSON.parse(json.responseText);

  var caja = $('.carrusel');


  for (i = 0; i < caja.length; i++) {
    $("<img>").attr("src", datos[i].ruta).attr("class", "d-block img-fluid").appendTo(caja[i]);


  }
}


function cargarImagenesCatalogo() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../json/imagenesCatalogo.json", true);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cargarJSONBueno(this);
    }
  };
  xhr.send();
}

function cargarJSONBueno(json) {
  var datos = JSON.parse(json.responseText);

  for (i = 0; i < datos.length; i++) {

    if (datos[i].tipo == "novedades") {
      $('#nov').append(
        carta(datos[i])
     
      )
    
    } else if (datos[i].tipo == "ofertas") {
      $('#of').append(
        cartaOf(datos[i])
      )
   
    }
   
  }
  cogerBotones();
 

}




function carta(datos) {

  return $('<div>', {
    'class': "col-lg-4 col-md-4 mb-4 imp"
  }).append(
    $('<div>', {
      'class': 'card h-100 '
    }).append(
      $('<img>', {
        'src': datos.ruta,
        'class': 'card-img-top zoom',
        css: {
          'height': '400px'
        }
      }),
      $('<div>', {
        'class': 'card-body',
      }).append(
        $('<h4>', {
          'class': 'card-title text-primary',
          'text': datos.titulo
        }),

        $('<h5>').html('<span id="precio">'+datos.precio+'</span> €' ),
        $('<p>', {
          'class': 'card-text',
          'text': datos.des
        })
      ),
      $('<div>', {
        'class': 'card-footer'
      }).append(
        $('<button>', {
          'class': 'boton shake-horizontal  ',
          'type': 'button'
          
        }).append(
          $('<i>', {
            'class': 'fa fa-shopping-cart',
            css: {
              'font-size': '1em'
            }
          })
        )
      )



    )
  )
}

function cartaOf(datos) {


  return $('<div>', {
    'class': "col-lg-4 col-md-4 mb-4"
  }).append(
    $('<div>', {
      'class': 'card h-100 imp '
    }).append(
      $('<img>', {
        'src': datos.ruta,
        'class': 'card-img-top zoom',
        css: {
          'height': '400px'
        }
      }),
      $('<div>', {
        'class': 'card-body',
      }).append(
        $('<h4>', {
          'class': 'card-title text-primary',
          'text': datos.titulo
        }),
        $('<del>', {
         
          'text': datos.oferta+" €"
        }),
        $('<h5>').html('<span id="precio" class="text-danger">'+datos.precio+'</span> <span class="text-danger" > €</span>' ),
         
        $('<p>', {
          'class': 'card-text',
          'text': datos.des
        })
      ),
      $('<div>', {
        'class': 'card-footer'
      }).append(
        $('<button>', {
          'class': 'boton shake-horizontal ',
          'type': 'button'
        
        }).append(
          $('<i>', {
            'class': 'fa fa-shopping-cart',
            css: {
              'font-size': '1em'
            }
          })
        )
      )



    )
  )
}


function GetCookie(nombre) {
  var nombre = nombre + "=";
  var array = nombre.length;
  var n = document.cookie.length;
  var i = 0;
  while (i < n) {
    var j = i + array;
    if (document.cookie.substring(i, j) == nombre){
      return "1";
    } 
    i = document.cookie.indexOf(" ", i) + 1;
   
  }
  return null;
}

function aceptar_cookies() {
  var expire = new Date();
  expire = new Date(expire.getTime() + 7776000000);
  document.cookie = "info=aceptada; expires=" + expire;
  var visit = GetCookie("info");
  if (visit == 1) {
    cookie();
  }
}
$(function () {
  var visit = GetCookie("info");
  if (visit == 1) {
    cookie();
  }
});

function cookie() {
  $('#cookies').toggle();
}

