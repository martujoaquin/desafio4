const register = document.querySelector(".register"), email = document.querySelector("#email"), nombre = document.querySelector("#nombre"), userReg = document.querySelector ("#userReg"), passReg = document.querySelector("#passReg"), btnRegistrar = document.querySelector("#registrar");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

class Usuario {
    constructor (nombre, usuario, email, password){
        this.nombre = nombre;
        this.usuario = usuario;
        this.email = email;
        this.pass = password;
    }
}

function limpiarCampos(){
    nombre.value = ""
    userReg.value = ""
    passReg.value = ""
    email.value = ""
}

function guardarUsuario(usuario){
    let userSaved = {};
    userSaved = usuario;
    return userSaved;
}

function guardarEnStorage(elemento){
    const enJSON = JSON.stringify(elemento); 
    let ls = localStorage.setItem("usuarios", enJSON);
    return ls;
}

function volver(){
    window.location.replace("./index.html");
}

btnRegistrar.addEventListener("click", (e)=>{
    e.preventDefault();
    let newUser = new Usuario(nombre, userReg, email, passReg);
    guardarUsuario(newUser);
    guardarEnStorage(newUser);
    /*limpiarCampos(); */
    volver();
}); 
