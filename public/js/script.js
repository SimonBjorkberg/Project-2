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


document.addEventListener('DOMContentLoaded', function() {
  const post = document.getElementsByClassName('bg-[#d1dbdb]');
  if (post.length > 1) {
    const firstPost = post[0]
    const lastPost = post[post.length - 1]

    firstPost.classList.remove('rounded-lg')
    firstPost.classList.add('rounded-t-lg')
    firstPost.classList.add('border-b-0')

    lastPost.classList.remove('rounded-lg')
    lastPost.classList.add('rounded-b-lg')

    for (let i = 0; i < post.length - 1; i++) {
      post[i].classList.remove('rounded-lg')
      post[i].classList.add('border-b-0')
    }
  }
});