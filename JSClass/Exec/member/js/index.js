const loginForm = document.querySelector(".login-form");
const idInput = document.querySelector("#emailId");
const passInput = document.querySelector("#password");

// localStorage.clear();
// localStorage.setItem(
//   "customerInfo",
//   JSON.stringify([
//     ["dltndns@naver.co", "q123456@12", "시계"],
//     ["007ask@naver.com", "qkfkadml@12", "김밥"],
//     ["qqqqqq@naver.com", "qqqqqq@#12", "라면"],
//   ])
// );

function onSubmitForm(event) {
  event.preventDefault();
  const id = idInput.value;
  const password = passInput.value;
  const regexID = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  // 이게뭐였지?
  const regexPass = new RegExp(
    /((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[a-zA-Z])(?=.*[0-9]))/g
  );
  const ID_MIN_LENGTH = 8;
  const ID_MAX_LENGTH = 16;

  // 입력 양식 유효성 검증
  // 1
  if (ID_MIN_LENGTH <= id.length && id.length <= ID_MAX_LENGTH) {
    idValidation = true;
  } else {
    idValidation = false;
    return alert("아이디는 8자이상 16자이하여야 합니다.");
  }

  // 2
  if (id.length !== 0) {
    idValidation = true;
  } else {
    idValidation = false;
    return alert("아이디를 입력해주세요.");
  }

  // 3
  if (regexID.test(id)) {
    idValidation = true;
  } else {
    idValidation = false;
    return alert("이메일 형식이 아닙니다.");
  }

  if (regexPass.test(password)) {
    passValidateion = true;
  } else {
    passValidateion = false;
    return alert("패스워드 형식이 아닙니다.");
  }

  const [pass, nickName] = checkInput(id, password);
  if (pass) {
    sessionStorage.setItem("loggedInId", id);
    sessionStorage.setItem("loggedInPassword", password);
    sessionStorage.setItem("loggedInNickname", nickName);
    window.location.href = `login-success.html?${id},${password},${nickName}`;
  } else {
    alert("없는 사용자 계정입니다.");
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
