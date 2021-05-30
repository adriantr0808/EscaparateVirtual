$(document).ready(iniciar);

function iniciar(){
   
    cargarImagenesCatalogo();
}
function cogerBotones(){
  var botones = $('.boton');

  for (i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", anyadirCar);
  }
}



function cargarImagenesCatalogo(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../json/imagenesCatalogo.json", true);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cargarJSONBueno(this);
    }
  };
  xhr.send();
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
 
  //Cojo los elementos que quiero sacar depues en el carrito, en mi caso la imagen el titulo y el precio
 var img = elemento.querySelector('img').src;
 var titulo= elemento.querySelector('h4').textContent;
 var precio = elemento.querySelector('#precio').textContent;



 var array=[ img,titulo,precio ]; //Me creo un array con los atributos



 array = array.join(";"); //Junto los atributos por ;


unir(array); 
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
    pr = pr.split(','); //Cada objeto en mi caso una zapatilla estará separada por comas y sus atributos(img,titulo,precio) por ;
   

    array.push(pr); //agrego los productos que ya tenemos
    
  }

  localStorage.setItem('nuevo',array); //creo un localStorage con un nuevo producto

}

function separar(){
  var pr = localStorage.getItem('nuevo');
  if(pr != null){ //por si no llega nada
    pr = pr.split(','); 
   
    for(i=0;i<pr.length;i++){
      pr[i] =pr[i].split(';'); //Separo los atributos
    }


    
    
  }

  return pr;
}





function cargarJSONBueno(json){
  var datos = JSON.parse(json.responseText);

  for(i=0;i<datos.length;i++){
    
    if(datos[i].tipo=="deportes"){
      $('#dep').append(
       carta(datos[i])
      )
    }else if(datos[i].tipo=="street"){
      $('#calle').append(
        carta(datos[i])
       )
    }

  }
  cogerBotones()
}

function carta(datos){
  
  return $('<div>',{
    'class':"col-lg-4 col-md-4 mb-4 imp"
  }).append(
    $('<div>',{
      'class':'card h-100'
    }).append(
      $('<img>',{
        'src': datos.ruta,
        'class':'card-img-top zoom',
        css:{'height': '400px'}
      }),
      $('<div>',{
          'class':'card-body',
      }).append(
        $('<h4>',{
          'class':'card-title text-primary',
          'text':datos.titulo
        }),
        
        $('<h5>').html('<span id="precio">'+datos.precio+'</span> €' ),
         
        $('<p>',{
          'class':'card-text',
          'text': datos.des
        })
      ),
      $('<div>',{
        'class':'card-footer'
      }).append(
        $('<button>',{
          'class': 'boton shake-horizontal',
          'type': 'button',
          'id':'carro'
        }).append(
          $('<i>',{
            'class':'fa fa-shopping-cart',
            css:{'font-size':'1em'}
          })
        )
      )
      

      
    )
  )
}
