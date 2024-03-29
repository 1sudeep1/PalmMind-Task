
document.getElementById("registerButton").addEventListener("click", function () {

  //getting form data
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  //pefrorming form validation
  if (!fullName || !email || !password || !confirmPassword) {
    document.getElementById("registrationResponse").innerText = "❌ Please fill all the fields";
    document.getElementById("toast").classList.add("show")
    setTimeout(function () {
      document.getElementById("toast").classList.remove('show')
    }, 3000)
  }

  if (password !== confirmPassword) {
    document.getElementById("registrationResponse").innerText = "❌ Password did not matched";
    document.getElementById("toast").classList.add("show")
    setTimeout(function () {
      document.getElementById("toast").classList.remove('show')
    }, 3000)
  } else {
    //sending field data to server
    axios.post("http://localhost:5000/register", {
      fullName: fullName,
      email: email,
      password: password
    })
      .then(function (response) {
        //Handle successfull registration
        console.log(response.data.msg)
        document.getElementById("registrationResponse").innerText = "✅ " + response.data.msg;
        document.getElementById("toast").classList.add('show');
        setTimeout(function () {
          document.getElementById("toast").classList.remove('show')
          setTimeout(function () {
            window.location.assign("login.html");
          }, 1000);
        }, 1000)
      })
      .catch(function (error) {
        // Handle registration error
        // alert("Registration failed. Please try again.");
        console.error(error);

      });

  }

})
