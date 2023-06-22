// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("Project-2 JS imported successfully!");
});

function threadClick(threadId) {
  window.location.href = "/threads/" + threadId;
}
