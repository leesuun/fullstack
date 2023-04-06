const email = document.getElementById("emailId");
const password = document.getElementById("password");
const password_confirm = document.getElementById("password_confirm");
const phone = document.getElementById("phone");
const nickname = document.getElementById("nickname");
const email_error_msg = document.querySelector(".email_error_msg");
const password_error_msg = document.querySelector(".password_error_msg");
const passwordConfirm_error_msg = document.querySelector(
  ".passwordConfirm_error_msg"
);
const phone_error_msg = document.querySelector(".phone_error_msg");
const loginForm = document.querySelector(".login-form");

email.focus();

const regExp = {
  email: /[a-z0-9]+@[a-z]+.[a-z]{2,3}/,
  password: /((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[a-zA-Z])(?=.*[0-9]))/g,
  phone: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
};

const error = {
  email: {
    blank_check: "아이디를 입력해주세요.",
    length_check: "8자이상 16자 이하로 입력해주세요.",
    emailForm_check: "이메일 형식이 아닙니다. ex) xx@naver.com",
  },
  password: {
    passwordForm_check: "패스워드 형식이 아닙니다.",
    passwordConfirm_check: "패스워가 일치하지 않습니다.",
  },
  phone: {
    phoneForm_check: "핸드폰 번호 형식이 아닙니다.",
  },
};

let result = false;

function onblurEmail() {
  const regexID = new RegExp(regExp.email);
  const ID_MIN_LENGTH = 8;
  const ID_MAX_LENGTH = 16;

  // 1 공백 체크
  result = validate(
    email.value.length !== 0,
    email_error_msg,
    error.email.blank_check
  );
  if (!result) {
    return email.focus();
  }

  // 2 길이 체크
  result = validate(
    ID_MIN_LENGTH <= email.value.length && email.value.length <= ID_MAX_LENGTH,
    email_error_msg,
    error.email.length_check
  );
  if (!result) {
    return email.focus();
  }

  // 3 이메일 형식 체크
  result = validate(
    regexID.test(email.value),
    email_error_msg,
    error.email.emailForm_check
  );
  if (!result) {
    return email.focus();
  }
}

function onblurPassword() {
  const regexPass = new RegExp(regExp.password);

  result = validate(
    regexPass.test(password.value),
    password_error_msg,
    error.password.passwordForm_check
  );
  if (!result) {
    return password.focus();
  }
}

function onblurPasswordConfirm() {
  result = validate(
    password.value === password_confirm.value,
    passwordConfirm_error_msg,
    error.password.passwordConfirm_check
  );
  if (!result) {
    return password.focus();
  }
}

function onblurPhone() {
  const regPhone = regExp.phone;

  result = validate(
    regPhone.test(phone.value),
    phone_error_msg,
    error.phone.phoneForm_check
  );
  if (!result) {
    return phone.focus();
  }
}

function validate(testResult, errorElement, errorMsg) {
  if (testResult) {
    errorElement.style.display = "none";
    return true;
  } else {
    errorElement.style.display = "block";
    errorElement.innerText = errorMsg;
    return false;
  }
}

function onSubmitForm(event) {
  event.preventDefault();
  if (result) {
    const users = JSON.parse(localStorage.getItem("customerInfo")) || [];
    users.push([email.value, password.value, nickname.value]);
    localStorage.setItem("customerInfo", JSON.stringify(users));
    alert("가입 성공");
    window.location.href = "index.html";
  } else {
    alert("가입 실패");
  }
}

email.addEventListener("blur", onblurEmail);
password.addEventListener("blur", onblurPassword);
password_confirm.addEventListener("blur", onblurPasswordConfirm);
phone.addEventListener("blur", onblurPhone);
loginForm.addEventListener("submit", onSubmitForm);
