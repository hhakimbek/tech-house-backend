const textSwitcherBtn = document.getElementById("text-switcher-btn");
const heading = document.querySelector("h2");
const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const usernameLabel = document.getElementById("usernameLabel");

textSwitcherBtn.addEventListener("click", function () {
  if (heading.textContent === "Login") {
    switcher("Sign up", "Already have an account? Login", true);
  } else {
    switcher("Login", "Don't have an account? Sign up", false);
  }
});

function switcher(a, b, c) {
  loginBtn.value = a;
  heading.textContent = a;
  textSwitcherBtn.value = b;
  if (c) {
    usernameInput.classList.remove("hidden");
    usernameLabel.classList.remove("hidden");
  } else {
    usernameInput.classList.add("hidden");
    usernameLabel.classList.add("hidden");
  }
}

loginBtn.addEventListener("click", function () {
  if (loginBtn.value === "Sign up") {
    register();
  } else {
    login();
  }
});

async function register() {
  try {
    if(!usernameInput.value || !emailInput.value || !passwordInput.value) {
      alert("All fields are required");
      return
    }
    // fetch("http://localhost:3002/api/auth/register",{
    //   method: "POST",
    //   "Content-Type":"application/json",
    //   body: JSON.stringify({
    //     username:usernameInput.value.trim(),
    //     email:emailInput.value.trim(),
    //     password:passwordInput.value.trim()
    //   })
    // }).then(response=>response.json()).
    // then(data=>console.log(data)).catch(err=>alert(err.message));
    const response = await fetch("http://localhost:3002/api/auth/register",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        username:usernameInput.value.trim(),
        email:emailInput.value.trim(),
        password:passwordInput.value.trim()
      })
    });

    if (response.ok) {
      const data = await response.json();
      passwordInput.value = "";
      emailInput.value = "";
      usernameInput.value = "";
      alert(data.message);
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("Server bilan bog‘lanib bo‘lmadi");
  }

}

async function login() {
  try {
    if(!emailInput.value || !passwordInput.value) {
      alert("All fields are required");
      return
    }
    // fetch("http://localhost:3002/api/auth/register",{
    //   method: "POST",
    //   "Content-Type":"application/json",
    //   body: JSON.stringify({
    //     username:usernameInput.value.trim(),
    //     email:emailInput.value.trim(),
    //     password:passwordInput.value.trim()
    //   })
    // }).then(response=>response.json()).
    // then(data=>console.log(data)).catch(err=>alert(err.message));
    const response = await fetch("http://localhost:3002/api/auth/login",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email:emailInput.value.trim(),
        password:passwordInput.value.trim()
      })
    });
    if (response.ok) {
      const data = await response.json();
      passwordInput.value = "";
      emailInput.value = "";
      alert(data.message);
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("Server bilan bog‘lanib bo‘lmadi");
  }
}

function statusAlerts(code) {
  alert(code)
}