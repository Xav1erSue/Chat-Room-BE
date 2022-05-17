const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 }, () =>
  console.log("websocket server is running at port 8080")
);

server.on("open", () => {
  console.log("server is opened");
});

server.on("close", () => {
  console.log("server is closed");
});

server.on("connection", (ws, req) => {
  const user = `${req.socket.remoteAddress}:${req.socket.remotePort}`;
  console.log(`${user} is connected`);
  // 发送欢迎信息给客户端
  ws.send(
    JSON.stringify({
      isSystem: true,
      message: `${user}, you're connected!`,
    })
  );

  ws.on("message", msg => {
    const data = JSON.parse(msg);
    console.log(`received: ${data.message} from ${data.username}`);

    // 广播消息给所有客户端
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });
});
