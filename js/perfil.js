var ref = firebase.database().ref("usuario");

var btnLogin = document.getElementById("btnLogin");
var btnLogout = document.getElementById("btnLogout");

var datosPerfil = document.getElementById("datosPerfil");
var formularioPerfil = document.getElementById("formularioPerfil");
var perfilNombre = document.getElementById("perfilNombre");
var perfilEmail = document.getElementById("perfilEmail");
var perfilTelefono = document.getElementById("perfilTelefono");
var perfilDireccion = document.getElementById("perfilDireccion");


var cancelForm = document.getElementById("cancelForm");
var nombreForm = document.getElementById("nombreForm");
var telefonoForm = document.getElementById("telefonoForm");
var emailForm = document.getElementById("emailForm");
var calleForm = document.getElementById("calleForm");
var interiorForm = document.getElementById("interiorForm");
var coloniaForm = document.getElementById("coloniaForm");
var cpForm = document.getElementById("cpForm");

var cancelForm = document.getElementById("cancelForm");
var guardarForm = document.getElementById("guardarForm");

var perfilEditar = document.getElementById("perfilEditar");

var usuario = {};

function leerInformacion(uid) {
    ref.child(uid)
        .on('value', data => {
            var dat = data.val();
            console.log(data.val());
            llenarInformacion(dat.nombre, dat.email, dat.telefono, dat.direccion);
        });

    // once: lee solo una vez la basede datos
    // on: queda escuchando la base de datos
}

function llenarInformacion(nombre, email, telefono, direccion) {
    console.log(nombre, email);
    perfilNombre.innerHTML = nombre;
    perfilEmail.innerHTML = email;
    perfilTelefono.innerHTML = telefono;
    perfilDireccion.innerHTML = direccion.calle + " " +
        direccion.interior + " " +
        direccion.colonia + " " +
        direccion.cp;
}


firebase.auth().onAuthStateChanged(user => {

    if (user) {
        console.log("tenemos usuario");
        leerInformacion(user.uid);
    } else {
        console.log("no tenemos usuario");
        window.location.href = "index.html";
    }
});



btnLogout.addEventListener("click", event => {
    event.preventDefault();

    firebase.auth().signOut()
        .then(() => alert("Se ha cerrado la sesion"));
});

perfilEditar.addEventListener("click", event => {
    datosPerfil.style.display = 'none';
    formularioPerfil.style.display = 'block';
});

cancelForm.addEventListener("click", event => {
    datosPerfil.style.display = 'block';
    formularioPerfil.style.display = 'none';
});

guardarForm.addEventListener('click', event => {

    event.preventDefault();
    console.log("Editar datos");

    var uid = firebase.auth().currentUser.uid;

    var obj = {
        nombre: nombreForm.value,
        email: emailForm.value,
        telefono: telefonoForm.value,
        direccion: {
            calle: calleForm.value,
            interior: interiorForm.value,
            colonia: coloniaForm.value,
            cp: cpForm.value
        }
    }

    console.log(obj);
    ref.child(uid).set(obj)
        .then(() => {
            datosPerfil.style.display = "block";
            formularioPerfil.style.display = "none";
        });
});