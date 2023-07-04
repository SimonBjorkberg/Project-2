// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("Project-2 JS imported successfully!");
});

function threadClick(threadId) {
  window.location.href = "/threads/" + threadId;
}

const signupButton = document.getElementById("signup-modal-button");
const signupModal = document.getElementById("signupModal");
const signupCloseButton = document.getElementById("signup-close-modal");

const loginButton = document.getElementById("login-modal-button");
const loginModal = document.getElementById("loginModal");
const loginCloseButton = document.getElementById("login-close-modal");

if (loginButton) {
  loginButton.addEventListener("click", () => {
    loginModal.showModal();
  });
}

if (signupButton) {
  signupButton.addEventListener("click", () => {
    signupModal.showModal();
  });
}

if (loginCloseButton) {
  loginCloseButton.addEventListener("click", () => {
    loginModal.close();
  });
}

if (signupCloseButton) {
  signupCloseButton.addEventListener("click", () => {
    signupModal.close();
  });
}
