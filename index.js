import { WebSocketServer,WebSocket } from "ws";

const wss = new WebSocketServer({port:8080})

//connection Event 
wss.on("connection",(socket,request) => {
    const ip = request.socket.remoteAddress;

    socket.on('message',(rawdata)=>{
        const message = rawdata.toString()
        console.log({rawdata})

        wss.clients.forEach((client) => {
            if (client.readyState == WebSocket.OPEN) {
                client.send(`server Broadcast:${message}`);
                
            }
        })

        socket.on("error",(err)=>{
            console.error(`Error:${err.message}:${ip}`);
        })


        socket.on('close',()=>{
            console.log("client disconnected")
        })
    })
})

console.log("Websocket server is live on ws://localhost:8080")