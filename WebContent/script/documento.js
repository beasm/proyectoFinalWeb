var contador = 0;
var numeroFotos = 5;
var select;


function next() {
    if (contador < numeroFotos - 1) {
        contador++;
    } else {
        contador = 0;
    }
    document.foto.src = "imagenes/" + contador + '.jpg';
    document.formulario.rb[contador].checked = true;
}

function previous() {
    if (contador > 0) {
        contador--;
    } else {
        contador = 4;
    }
    document.foto.src = "imagenes/" + contador + '.jpg'
    document.formulario.rb[contador].checked = true;
}

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

var config = {
    apiKey: "AIzaSyDcWt-Z7v5-qQgEMn0ZZKfxOQo_XF2ATO4",
    authDomain: "project-9ba52.firebaseapp.com",
};

/**
 * Handles the sign in button press.
 */
function iniciarSesion() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
        alert("Desconectado.");
    } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
            alert('Por favor introduzca una dirección de correo eléctronico.');
            return;
        }
        if (password.length < 4) {
            alert('Por favor introduzca una contraseña.');
            return;
        }
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Contraseña incorrecta.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
        salirLogin();
    }
}

/**
 * Handles the sign up button press.
 */
function registarUsuario() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
        alert('Por favor introduzca una dirección de correo eléctronico.');
        return;
    }
    if (password.length < 4) {
        alert('Por favor introduzca una contraseña.');
        return;
    }
    // Sign in with email and pass.
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('La contraseña es demasiado débil.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
}

function restablecerPassword() {
    var email = document.getElementById('email').value;

    firebase.auth().sendPasswordResetEmail(email).then(function() {
        alert('Restablecer contraseña de correo electrónico enviado!');
    }).catch(function(error) {
        // Handle Errors here.
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

// When the user clicks the button, open the modal
function mostrarLogin() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
        alert("Desconectado.");
    } else {
        document.getElementById("myModal").style.display = "block";
    }
}

// When the user clicks on <span> (x), close the modal
function salirLogin() {
    document.getElementById("myModal").style.display = "none";
}

window.onload = function() { // window.onload hace que se ejecute la funcion
    // al cargar la pagina

    // setting up slider
    setInterval("next()", 5000); // ejecucion periodica de una funcion
    document.formulario.botonA.addEventListener('click', previous);
    document.formulario.botonB.addEventListener('click', next);

    select = document.formulario.rb;
    select[0].addEventListener('click', cambiarFoto);
    select[1].addEventListener('click', cambiarFoto);
    select[2].addEventListener('click', cambiarFoto);
    select[3].addEventListener('click', cambiarFoto);
    select[4].addEventListener('click', cambiarFoto);

    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
        document.getElementById('myBtn').style.color = "white";
        if (user) {
            document.getElementById('myBtn').textContent = 'Desconectar';
        } else {
            document.getElementById('myBtn').textContent = 'Iniciar sesión';
            mostrarLogin();
        }
    });
    // [END authstatelistener]
    document.getElementById('iniciar-sesion').addEventListener('click', iniciarSesion, false);
    document.getElementById('registrarse').addEventListener('click', registarUsuario, false);
    document.getElementById('restablecer').addEventListener('click', restablecerPassword, false);
    document.getElementById('myBtn').addEventListener('click', mostrarLogin, false);
    document.getElementsByClassName("close")[0].addEventListener('click', salirLogin, false);
}