const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

let modal = document.getElementById("modal");
let modalMessage = document.getElementById("modal-message");
let hearts = document.querySelectorAll(".like-glyph");

modal.classList.add("hidden");

function handleHeartClick(event) {
  let heart = event.target;

  mimicServerCall()
    .then(() => {
      if (heart.innerHTML === EMPTY_HEART) {
        heart.innerHTML = FULL_HEART;
        heart.classList.add("activated-heart");
      } else {
        heart.innerHTML = EMPTY_HEART;
        heart.classList.remove("activated-heart");
      }
    })
    .catch((error) => {
      modal.classList.remove("hidden");
      modalMessage.innerText = error;
      setTimeout(() => {
        modal.classList.add("hidden");
      }, 3000);
    });
}

hearts.forEach(heart => {
  heart.addEventListener("click", handleHeartClick);
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
