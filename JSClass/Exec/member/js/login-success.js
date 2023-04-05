const [email, password, nickname] = window.location.search.slice(1).split(",");
const loggedInEmail = document.querySelector("#success-email");
const loggedInName = document.querySelector("#success-nickname");

loggedInEmail.textContent = "아이디: " + email;
loggedInName.textContent = "닉네임: " + decodeURI(nickname);

function logout() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

function showChangePassScreen() {
  window.location.href = "pass-change.html";
}
