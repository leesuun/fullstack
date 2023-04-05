const emailIdInput = document.getElementById("emailId");
const passwordInput = document.getElementById("password");
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

emailIdInput.focus();

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
  const email = emailIdInput.value;
  const regexID = new RegExp(regExp.email);
  const ID_MIN_LENGTH = 8;
  const ID_MAX_LENGTH = 16;

  // 1
  const emailValidation_1 = email.length !== 0;
  result = validateInput(
    emailValidation_1,
    email_error_msg,
    error.email.blank_check
  );
  if (!result) {
    return emailIdInput.focus();
  }

  // 2
  const emailValidation_2 =
    ID_MIN_LENGTH <= email.length && email.length <= ID_MAX_LENGTH;
  result = validateInput(
    emailValidation_2,
    email_error_msg,
    error.email.length_check
  );
  if (!result) {
    return emailIdInput.focus();
  }

  // 3
  const emailValidation_3 = regexID.test(email);
  result = validateInput(
    emailValidation_3,
    email_error_msg,
    error.email.emailForm_check
  );
  if (!result) {
    return emailIdInput.focus();
  }
}

function onblurPassword() {
  const password = passwordInput.value;
  const regexPass = new RegExp(regExp.password);

  const passwordValidation = regexPass.test(password);
  result = validateInput(
    passwordValidation,
    password_error_msg,
    error.password.passwordForm_check
  );
  if (!result) {
    return passwordInput.focus();
  }
}

function onblurPasswordConfirm() {
  const password = passwordInput.value;
  const passwordConfirm = password_confirm.value;

  const passwordConfirmValidation = password === passwordConfirm;
  result = validateInput(
    passwordConfirmValidation,
    passwordConfirm_error_msg,
    error.password.passwordConfirm_check
  );
  if (!result) {
    return passwordInput.focus();
  }
}

function onblurPhone() {
  const phoneValue = phone.value;
  const regPhone = regExp.phone;

  const phoneValidation = regPhone.test(phoneValue);
  result = validateInput(
    phoneValidation,
    phone_error_msg,
    error.phone.phoneForm_check
  );
  if (!result) {
    return phone.focus();
  }
}

function validateInput(verificationResult, errorElement, errorMsg) {
  if (verificationResult) {
    errorElement.style.display = "none";
    errorElement.innerText = "";
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
    users.push([emailIdInput.value, passwordInput.value, nickname.value]);
    localStorage.clear();
    localStorage.setItem("customerInfo", JSON.stringify(users));

    alert("가입 성공");
    window.location.href = "index.html";
  } else {
    alert("가입 실패");
  }
}

emailId.addEventListener("blur", onblurEmail);
password.addEventListener("blur", onblurPassword);
password_confirm.addEventListener("blur", onblurPasswordConfirm);
phone.addEventListener("blur", onblurPhone);
loginForm.addEventListener("submit", onSubmitForm);
