let loginButton = document.getElementById("loginButton");
const loginURL = "/login";

loginButton.addEventListener("click", handleResponse);

async function handleResponse(e) {
  e.preventDefault();
  let loginFeedback = document.getElementById("loginFeedback");
  const invalidClass = "bg-danger";
  const validClass = "bg-success";

  makePost().then((data) => {
    console.log(data);
    if (data.type) {
      console.log("facts");
      loginFeedback.className = validClass;
      loginFeedback.innerText = "Great Succ!";
    } else {
      console.log("not facts");
      loginFeedback.className = invalidClass;
      let loginError = "Error logging in...\nCheck username and password";
      if (data.message == "EMPTY") {
        loginError = "Username and Password cannot be empty...";
      }
      loginFeedback.innerText = loginError;
    }
  });
}

async function makePost() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  const response = await fetch(loginURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: user,
      password: pass,
    }),
  });

  return response.json();
}
