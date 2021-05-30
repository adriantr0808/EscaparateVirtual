let er = /^(\w+@[a-zA-Z_]+?.[a-zA-Z]{2,6})$/;
let datos;

$('#formInicioSesion').on('submit', comprUsu);


function comprUsu(e){
    e.preventDefault();
    datos = [$('#user').val(), $('#pass').val()];

    var valForm = validarForm(datos);

    if(valForm){
        cargarJSON();
    }


}


function validarForm(datos){

    $('#error').html('');
    var confirm = true;

    if(er.test(datos[0])==false){ //valido la posición 0 del array que es el email
        confirm = false;
        $('#error').html("<p>Por favor, utiliza un formato correcto de email</p>");
    }

    return confirm;
}

function cargarJSON(){
    let fichero = '../json/usuarios.json';
    fetch(fichero, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function(res) {
            if (res.ok) {
                return res.json();

            } else {
                console.log('El archivo fallo al cargar');
            }
        })
        .then(data => comprobarDatos(data));
}


function comprobarDatos(data){
    var name;
    var salida=false;
    for (let i = 0; i < data.length && !salida; i++) {
        if (data[i].correo === datos[0] && data[i].contrasenya === datos[1]) {
            name=data[i].nombre;
            salida = true;
            
        }
    }
    if (salida) {
        localStorage.setItem('valor', true);
        localStorage.setItem('nombreUsu', name)
        window.location.href = '../html/index.html';
    } else {
        $('#error').html('<p>No se ha encontrado el Usuario</p>')
    }
}

