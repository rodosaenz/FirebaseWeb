var btnGLogin = document.getElementById("btnGLogin");
var btnFLogin = document.getElementById("btnFLogin");
var btnTLogin = document.getElementById("btnTLogin");
var btnLogout = document.getElementById("btnLogout");

firebase.auth().onAuthStateChanged(user => {

    if (user) {
        console.log("tenemos usuario");
        btnGLogin.style.display = "none";
        btnFLogin.style.display = "none";
        btnTLogin.style.display = "none";
        btnLogout.style.display = "block";
    } else {
        console.log("no tenemos usuario");
        btnGLogin.style.display = "block";
        btnFLogin.style.display = "block";
        btnTLogin.style.display = "block";
        btnLogout.style.display = "none";
    }
});

btnGLogin.addEventListener("click", event => {
    event.preventDefault();

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    //(opcional) defino en que leguaje le va a salir el Popup de autenticacion
    firebase.auth().languageCode = 'es';

    firebase.auth().signInWithPopup(provider)
        .then(datosUsuario => console.log(datosUsuario))
        .catch(err => console.log(err));
});

btnFLogin.addEventListener("click", event => {
    event.preventDefault();

    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile');

    //(opcional) defino en que leguaje le va a salir el Popup de autenticacion
    firebase.auth().languageCode = 'es';

    firebase.auth().signInWithPopup(provider)
        .then(datosUsuario => console.log(datosUsuario))
        .catch(err => console.log(err));
});

btnTLogin.addEventListener("click", event => {
    event.preventDefault();

    var provider = new firebase.auth.TwitterAuthProvider();
    //provider.addScope('public_profile');

    //(opcional) defino en que leguaje le va a salir el Popup de autenticacion
    firebase.auth().languageCode = 'es';

    firebase.auth().signInWithPopup(provider)
        .then(datosUsuario => console.log(datosUsuario))
        .catch(err => console.log(err));
});

btnLogout.addEventListener("click", event => {
    event.preventDefault();

    firebase.auth().signOut()
        .then(() => alert("Se ha cerrado la sesion"));
});