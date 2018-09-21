var ref = firebase.database().ref("usuario");
var refImg = firebase.storage().ref();
var usuario = {};

var btnLogin = document.getElementById("btnLogin");
var btnLogout = document.getElementById("btnLogout");

firebase.auth().onAuthStateChanged(user => {

    if (user) {
        console.log("tenemos usuario");
        btnLogin.style.display = "none";
        btnLogout.style.display = "block";
    } else {
        console.log("no tenemos usuario");
        btnLogin.style.display = "block";
        btnLogout.style.display = "none";
    }
});



btnLogin.addEventListener("click", event => {
    event.preventDefault();

    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile');

    //(opcional) defino en que leguaje le va a salir el Popup de autenticacion
    firebase.auth().languageCode = 'es';

    firebase.auth().signInWithPopup(provider)
        .then(datosUsuario => {
            console.log(datosUsuario);
            usuario = {
                nombre: datosUsuario.user.displayName,
                email: datosUsuario.user.email,
                uid: datosUsuario.user.uid
            };
            agregarUsuario(usuario, usuario.uid);
        })
        .catch(err => console.log(err));
});

btnLogout.addEventListener("click", event => {
    event.preventDefault();

    firebase.auth().signOut()
        .then(() => alert("Se ha cerrado la sesion"));
});


function agregarUsuario(usuario, uid) {
    ref.child(uid).update(usuario);
}