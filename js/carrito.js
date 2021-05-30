
window.onload=iniciar;

function iniciar(){
    anyadirCes();
    document.getElementById("vaciarCesta").addEventListener("click",vaciarCesta);
}


function anyadirCes(){
    var fila = document.createElement("div");
    var carro = document.querySelector(".shoppingCartItemsContainer");
   
    var carrito = separar();
    var contenido="";
  if(carrito!=null){
   
      for(i=0;i<carrito.length;i++){
          contenido +=  `<div class="row shoppingCartItem ">
    
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${carrito[i][0]} class="shopping-cart-image" style="width:30%">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${carrito[i][1]}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${carrito[i][2]}</p>
            </div>
        </div>
        <div class="col-4">
            <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <button class="btn btn-danger borrarBoton" type="button">X</button>
            </div>
        </div>
    </div>`;
      }
  }else{
      contenido = "<p class='mt-2' >No hay productos en la cesta</p>";
  }
      
    


fila.innerHTML=contenido;
carro.append(fila);
calcularPrecio();
eventoEliminar();
}

function calcularPrecio(){
    
    var pr = document.getElementsByClassName("shoppingCartItem");

    if(pr!=null){
        var precios = document.getElementsByClassName("shoppingCartItemPrice");

        var resultado = 0;
        for(i=0;i <precios.length;i++){
            resultado = Number(precios[i].textContent)+resultado;
        }

        document.getElementById("precioF").innerHTML=resultado;
    }

    
}

function eventoEliminar(){
    var botones = document.getElementsByClassName("borrarBoton");
  

    for(i=0;i<botones.length;i++){
        botones[i].addEventListener("click",eliminarPr);
    }
}

function eliminarPr(e){


    var boton = e.target;
    //Coger el elemento más cercano con la clase imp
    var elemento = boton.closest('.shoppingCartItem');
   var img = elemento.querySelector('.shopping-cart-image').src;
   var titulo= elemento.querySelector('.shoppingCartItemTitle').textContent;
   var precio = elemento.querySelector('.shoppingCartItemPrice').textContent;
  
  
  
   var array=[
  
    img,titulo,precio
  
   ];
   var pr = separar();

   if(pr != null){ //por si no llega nada

    for(i=0;i<pr.length;i++){
        if(pr[i][0]==array[0] && pr[i][1]==array[1] && pr[i][2]==array[2]){
            if(pr.length<2){ 
                pr.splice(i,1);
                localStorage.removeItem('nuevo');
            }else{
                pr.splice(i,1);
                localStorage.setItem('nuevo',convertirString(pr));
            }   
        
        }
    }

   
    location.reload();

    
    
  }


}

function convertirString(producto){


    for(i=0;i<producto.length;i++){
        producto[i] =producto[i].join(';');
      }

    producto = producto.join(',');  

    return producto;
}

function vaciarCesta(){

    var ok = confirm("Quieres borrar todos los elementos de la cesta?");
    if(ok){
        localStorage.removeItem('nuevo');
        location.reload();
        if (!("Notification" in window)) {
            alert("Este navegador no soporta las notificaciones del sistema");
        
          } else if (Notification.permission == 'granted') {
            var notificacion = new Notification('CityWalk.es | Tienda', {
              icon: '../img/logo.jpg',
              body: 'Borrado de cesta exitoso!'
            })
        
          } else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
              if (permission === "granted") {
                var notificacion = new Notification('CityWalk.es | Tienda', {
                  icon: '../img/logo.jpg',
                  body: 'Borrado de cesta exitoso!'
                })
        
              }
            });
          }
    }
  
}