const loginForm = document.querySelector(".login-form");
const id = document.querySelector("#id");
const password = document.querySelector("#password");

function onSubmitForm(e) {
  e.preventDefault();

  const idRegExp = new RegExp(/^[a-zA-Z0-9]{8,}$/);
  const passwordRegExp = new RegExp(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
  );

  if (!idRegExp.test(id.value)) {
    alert("아이디 형식이 일치하지 않습니다.");
  } else if (!passwordRegExp.test(password.value)) {
    alert("패스워드 형식이 일치하지 않습니다.");
  } else {
    alert("로그인 완료");
  }
}

loginForm.addEventListener("submit", onSubmitForm);
