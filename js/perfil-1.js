var refTest = firebase.database().ref("test");
var ref = firebase.database().ref("usuario");

var btnGLogin = document.getElementById("btnGLogin");
var btnFLogin = document.getElementById("btnFLogin");
var btnTLogin = document.getElementById("btnTLogin");
var btnLogout = document.getElementById("btnLogout");

var btnPush = document.getElementById("btnPush");
var btnSet = document.getElementById("btnSet");
var btnUpdate = document.getElementById("btnUpdate");
var btnRemove = document.getElementById("btnRemove");

btnPush.addEventListener("click", event => {
    event.preventDefault();

    var objeto = {
        curso: "firebase",
        profesor: "angel",
        contenidos: {
            primero: "autenticación"
        }
    };
    refTest.push(objeto)
        .then(() => console.log("Se subió correctamente"))
        .catch(err => {
            console.log(err);
            alert("Hubo un error.");
        });

});

btnSet.addEventListener("click", event => {
    event.preventDefault();

    var objeto = {
        curso: "Responsive",
        profesor: "Leonidas",
        contenidos: {
            primero: "media-query"
        }
    }

    refTest.set(objeto)
        .then(() => console.log("Se subió set correctamente"))
        .catch(err => {
            console.log(err);
            alert("Hubo un error set.");
        });

});

btnUpdate.addEventListener("click", event => {
    event.preventDefault();

    var objeto = {
        curso: "desarrollo web",
        profesor: "leonidas",
        contenidos: {
            primero: "formularios"
        }
    };
    //refTest.update(objeto)
    refTest.child("-LLWPF3h0c9egGdNMhqV").update(objeto)
        .then(() => console.log("Se subió update correctamente"))
        .catch(err => {
            console.log(err);
            alert("Hubo un error.");
        });

});

btnRemove.addEventListener("click", event => {
    event.preventDefault();

    ref.child("y0cFsg4CTOQeIQBhMRtzZyuuJ4L2").remove()
        .then(() => console.log("Se removió correctamente"))
        .catch(err => {
            console.log(err);
            alert("Hubo un error.");
        });

});


var usuario = {};

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

    console.log("Autenticando con Google");
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

    console.log("Autenticando con Facebook");
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

btnTLogin.addEventListener("click", event => {
    event.preventDefault();

    console.log("Autenticando con Twitter");
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

// function agregarUsuario(usuario) {
//     ref.push(usuario);
// }

function agregarUsuario(usuario, uid) {
    ref.child(uid).update(usuario);
}