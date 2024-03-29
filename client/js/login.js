document.getElementById("loginUser").addEventListener("click", function () {
  //getting form data
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  //performing form validation
  if (!email || !password) {
    document.getElementById("loginResponse").innerText = "❌ Please fill all the fields";
    document.getElementById("toast").classList.add("show")
    setTimeout(function () {
      document.getElementById("toast").classList.remove('show')
    }, 3000)
  } else {
    axios.post("http://localhost:5000/login", {
      email: email,
      password: password
    })
      .then(function (response) {
        if (response.status === 200) {
          document.getElementById("loginResponse").innerText = "✅ " + response.data.msg;
          document.getElementById("toast").classList.add("show")
          setTimeout(function () {
            document.getElementById("toast").classList.remove('show')
            setTimeout(function () {
              window.location.assign("index.html");
            }, 1000);
          }, 3000)
        } else {
          document.getElementById("loginResponse").innerText = "❌ " + response.data.msg;
          document.getElementById("toast").classList.add("show")
          setTimeout(function () {
            document.getElementById("toast").classList.remove('show')
          }, 3000)
        }
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          document.getElementById("loginResponse").innerText = "❌ " + error.response.data.msg;
          document.getElementById("toast").classList.add("show");
          setTimeout(function () {
            document.getElementById("toast").classList.remove('show');
          }, 3000);
        } else {
          alert("An error occurred: " + error.response.data.msg);
        }
      });
  }
})