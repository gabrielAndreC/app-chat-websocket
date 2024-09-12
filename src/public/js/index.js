const socket = io();

let user; //lo define el cliente para identificarse
let chatbox = document.getElementById("chatbox")

//alerta de identificacion sweetalert2
Swal.fire({
    title: "Identificate",
    input: "text",
    text: "ingresá tu nombre de usuario",
    inputValidator: (value)=>{
        return !value && 'Escribe un nombre de usuario!'
    },
    allowOutsideClick: false
})
.then(result =>{//setear el nombre en user
    user = result.value
    document.getElementById("username").textContent = user
    socket.emit("userAuth")
})

//event listener para el chatbox
chatbox.addEventListener("keyup", (ev)=>{
    if (ev.key === "Enter"){
        if (chatbox.value.trim().length){
            socket.emit("message",{user: user, message: chatbox.value});
            chatbox.value = "";
        }
    }
})

//escuchar lo que emite el server y actualizar mensajes

socket.on("messageLogs", (data) =>{
    let log = document.getElementById("messageLogs");
    let messages = ``
    data.forEach(el => {
        messages += `${el.user}: ${el.message}<br>`
    });
    log.innerHTML = messages
})