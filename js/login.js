const btnIngresar = document.querySelector("#ingresar"),
user = document.querySelector("#user"),
pass = document.querySelector("#pass"),
check = document.querySelector("#recordar");

function inicioSesion(usuario){
    let userfound = usuario;/* usuario.find((usuario) =>{
        return usuario.nombre == user.value && usuario.pass == pass.value;
    }); */
    userfound ? (window.location.replace("./stock.html")) : alert("Usuario no encontrado");
    return userfound;
}

function recuperarLS(){
    const datos = JSON.parse(localStorage.getItem("usuarios"));
    return datos;
}

const usuariosLS = recuperarLS();

btnIngresar ? btnIngresar.addEventListener("click", (e)=>{
    e.preventDefault();
    inicioSesion(usuariosLS);
}) : false; 
