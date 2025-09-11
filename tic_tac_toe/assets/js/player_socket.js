import { Socket } from "phoenix"

let socket = new Socket("/socket", { authToken: window.userToken });
socket.connect();

let channel = socket.channel("game:69", {});
let chatInput = document.querySelector("#chat-input")
let messagesContainer = document.querySelector("#messages")

const selector = [
  "#square_1x1",
  "#square_1x2",
  "#square_1x3",

  "#square_2x1",
  "#square_2x2",
  "#square_2x3",

  "#square_3x1",
  "#square_3x2",
  "#square_3x3",
];
const matchingElements = document.querySelectorAll(selector);

// Eventos Emitidos
matchingElements.forEach((e) => {
  e.addEventListener("click", event => {
    if (e.innerText.trim() === "X") {
      alert("This item is already checked");
      return;
    }
    channel.push("check_square", {square: e.id.split("_").pop()});
    e.innerText = 'X';
  })
});

const checkSquare = function (square_id) {
  const square = document.getElementById(square_id);
  square.innerHTML = "X";
}

// Eventos Emitidos
channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })
  .receive("square_checked", resp => {console.log("Received: ", resp)});

export default socket;
