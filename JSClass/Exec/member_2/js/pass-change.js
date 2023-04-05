function changePassword() {
  const nowInputPassword = document.getElementById("nowPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const newPasswordConfirm =
    document.getElementById("newPasswordConfirm").value;

  let nowLocalPassword = "";
  const nowLoggedInId = sessionStorage.getItem("loggedInId");
  const customerInfo = JSON.parse(localStorage.getItem("customerInfo"));

  let i = 0;
  for (i = 0; i < customerInfo.length; i++) {
    if (customerInfo[i][0] === nowLoggedInId) {
      nowLocalPassword = customerInfo[i][1];
      break;
    }
  }

  if (nowLocalPassword === nowInputPassword) {
    if (newPassword === newPasswordConfirm) {
      sessionStorage.removeItem("loggedInPassword");
      sessionStorage.setItem("loggedInPassword", newPassword);
      customerInfo[i][1] = newPassword;
      localStorage.clear();
      localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
      alert("변경 완료.");
      window.location.href = "index.html";
    } else {
      alert("변경할 비밀번호가 일치하지 않습니다.");
    }
  } else {
    console.log(nowLocalPassword, nowInputPassword);
    alert("현재 비밀번호가 일치하지 않습니다.");
  }
}
