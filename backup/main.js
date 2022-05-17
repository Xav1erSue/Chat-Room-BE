window.onload(() => {
  window;
});

const socket = new WebSocket("ws://192.168.3.217:8080/ws");
socket.onmessage = event => {
  const ta = document.getElementById("responseText");
  ta.value = ta.value + "\n" + event.data;
};
socket.onopen = event => {
  const ta = document.getElementById("responseText");
  ta.value = "连接开启!";
};
socket.onclose = event => {
  const ta = document.getElementById("responseText");
  ta.value = ta.value + "连接被关闭";
};

function send(data) {
  if (socket.readyState == WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  } else alert("连接没有开启.");
}
