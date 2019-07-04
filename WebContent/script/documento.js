var contador = 0;
var numeroFotos = 5;
var select;

/**
 *  Validación y envía el formulario de la página contactar
 */
function validar() {
    if (firebase.auth().currentUser) { // si el usuario esta logeado
    	if (document.getElementsByName('contactar')[0].checkValidity()) { // Si el formulario es valido
    		
    		// Se guardan los datos en la base de datos
    		firebase.database().ref('contactar/' + firebase.auth().currentUser.uid + '/' + new Date() ).set({
    			nombre: document.getElementById('nombre').value,
    			telefono: document.getElementById('telefono').value,
    			correo: document.getElementById('correo').value,
    			valorar: document.getElementById('valorado').value,
    			pais: document.getElementById('pais').value,
    			edad: document.getElementById('mas40si').checked,
    			opinion: document.getElementById('mejora').value
    		  }, function(error) {
    			    if (error) { // en caso de error
    			    	alert('Error: ' + error);
    			      } else { // en de guarda correctamente la info
    			    		alert('Gracias por contactar con nosotros. Datos enviados!');
    			    		document.getElementsByName('contactar')[0].submit();    
    			      }
    			    });		
    	} else { // si los datos del formulario no pasa la validación
    		alert('Por favor revisa los datos del formulario.');
    		document.getElementsByName('contactar')[0].reportValidity();
    	}
    } else { // si no esta logeado el usuario se muestra el login
        document.getElementById("myModal").style.display = "block";
    }
}


/**
 * funcion que muestra la siguiente imagen en el slider
 */
function next() {
    if (contador < numeroFotos - 1) {
        contador++;
    } else {
        contador = 0;
    }
    document.foto.src = "imagenes/" + contador + '.jpg';
    document.formulario.rb[contador].checked = true;
}

/**
 * función que muestra la imagen anterior en el slider
 */
function previous() {
    if (contador > 0) {
        contador--;
    } else {
        contador = 4;
    }
    document.foto.src = "imagenes/" + contador + '.jpg'
    document.formulario.rb[contador].checked = true;
}

/**
 *  Cambia la foto del slider seleccionada
 */
function cambiarFoto() {
    var temContador;
    for (var i = 0; i < select.length; i++) {
        if (select[i].checked) {
            temContador = i;
        }
    }
    document.foto.src = "imagenes/" + temContador + '.jpg';
    contador = temContador;
}

/**
 * Configuración de firebase
 */
var config = {
    apiKey: "AIzaSyDcWt-Z7v5-qQgEMn0ZZKfxOQo_XF2ATO4",
    authDomain: "project-9ba52.firebaseapp.com",
    databaseURL: "https://project-9ba52.firebaseio.com/",
};

/**
 * funcion para el botón de inicio de sesión
 */
function iniciarSesion() {
	// se usa el email y la password para el inicio de sesión
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    // validaciones
    if (email.length < 4) {
        alert('Por favor introduzca una dirección de correo electrónico.');
        return;
    }
    if (password.length < 4) {
        alert('Por favor introduzca una contraseña.');
        return;
    }
    
    // llamada a fire base
    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
            // en caso de error
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Contraseña incorrecta.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
    salirLogin(); // cerramos el modal del login
}

/**
 * funcion para el botón de registrase
 */
function registarUsuario() {
	// se usa el email y la password para el registro
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    // Validaciones
    if (email.length < 4) {
        alert('Por favor introduzca una dirección de correo electrónico.');
        return;
    }
    if (password.length < 4) {
        alert('Por favor introduzca una contraseña.');
        return;
    }
    
    // llamada a firebase
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
            // en caso de error
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('La contraseña es demasiado débil.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
    salirLogin();
}

/**
 * función para el botón de restablecer contraseña
 */
function restablecerPassword() {
	// se usa el email
    var email = document.getElementById('email').value;

    // se llama a firebase
    firebase.auth().sendPasswordResetEmail(email).then(function() {
        alert('Restablecer contraseña de correo electrónico enviado!');
    }).catch(function(error) {
        // en caso de error
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/invalid-email') {
            alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
            alert(errorMessage);
        }
        console.log(error);
    });
}

/**
 * Cuando el usuario haga clic en el botón para iniciar o desconectar
 */
function mostrarLogin() {
    if (firebase.auth().currentUser) { // si esta logeado
        firebase.auth().signOut(); // desloguea al usuario
        alert("Desconectado.");
    } else { // si no esta logeado muestra el modal para iniciar o registrarse
        document.getElementById("myModal").style.display = "block";
    }
}

/**
 * Cuando el usuario haga clic en <span> (x), cierre el modal
 */
function salirLogin() {
    document.getElementById("myModal").style.display = "none";
}


/**
 * window.onload hace que se ejecute la función
 */
window.onload = function() {
    // al cargar la pagina

    // configuración slider
    setInterval("next()", 5000); // ejecución periódica de la función next
    
    // event listener para el slider
    document.formulario.botonA.addEventListener('click', previous);
    document.formulario.botonB.addEventListener('click', next);

    select = document.formulario.rb;
    select[0].addEventListener('click', cambiarFoto);
    select[1].addEventListener('click', cambiarFoto);
    select[2].addEventListener('click', cambiarFoto);
    select[3].addEventListener('click', cambiarFoto);
    select[4].addEventListener('click', cambiarFoto);

    // Escuchando los cambios de estado de autenticación para cambiar el aspecto del botón
    firebase.auth().onAuthStateChanged(function(user) {
        document.getElementById('myBtn').style.color = "white";
        if (user) { // si el usuario esta logeado
            document.getElementById('myBtn').textContent = 'Desconectar';
        } else { // si no esta logeado
            document.getElementById('myBtn').textContent = 'Iniciar sesión';
            mostrarLogin();
        }
    });
    
    // evento para el botón de login
    document.getElementById('myBtn').addEventListener('click', mostrarLogin, false);

    // eventos de los botones del modal
    document.getElementById('iniciar-sesion').addEventListener('click', iniciarSesion, false);
    document.getElementById('registrarse').addEventListener('click', registarUsuario, false);
    document.getElementById('restablecer').addEventListener('click', restablecerPassword, false);
    document.getElementsByClassName("close")[0].addEventListener('click', salirLogin, false);
}
