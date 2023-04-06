const loginForm = document.querySelector(".login-form");
const idInput = document.querySelector("#emailId");
const passInput = document.querySelector("#password");

function onSubmitForm(event) {
  event.preventDefault();
  const id = idInput.value;
  const password = passInput.value;

  const [pass, nickName] = checkInput(id, password);
  if (pass) {
    sessionStorage.setItem("loggedInId", id);
    sessionStorage.setItem("loggedInPassword", password);
    sessionStorage.setItem("loggedInNickname", nickName);
    window.location.href = `login-success.html?${id},${password},${nickName}`;
  } else {
    alert("사용자가 없거나 비밀번호가 틀립니다.");
  }
}

function checkInput(id, password) {
  const customerInfo = JSON.parse(localStorage.getItem("customerInfo"));

  let pass = false;
  let nickName = "";

  for (let i = 0; i < customerInfo.length; i++) {
    if (id === customerInfo[i][0] && password === customerInfo[i][1]) {
      pass = true;
      nickName = customerInfo[i][2];
      break;
    }
  }
  return [pass, nickName];
}

loginForm.addEventListener("submit", onSubmitForm);
