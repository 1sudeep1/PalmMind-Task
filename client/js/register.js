//By using HTML DOM

// document.getElementById("registerButton").addEventListener("click", function () {

//   //getting form data
//   const fullName = document.getElementById("fullName").value;
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;
//   const confirmPassword = document.getElementById("confirmPassword").value;
//   //pefrorming form validation
//   if (!fullName || !email || !password || !confirmPassword) {
//     document.getElementById("registrationResponse").innerText = "❌ Please fill all the fields";
//     document.getElementById("toast").classList.add("show")
//     setTimeout(function () {
//       document.getElementById("toast").classList.remove('show')
//     }, 3000)
//   }

//   if (password !== confirmPassword) {
//     document.getElementById("registrationResponse").innerText = "❌ Password did not matched";
//     document.getElementById("toast").classList.add("show")
//     setTimeout(function () {
//       document.getElementById("toast").classList.remove('show')
//     }, 3000)
//   } else {
//     //sending field data to server
//     axios.post("http://localhost:5000/register", {
//       fullName: fullName,
//       email: email,
//       password: password
//     })
//       .then(function (response) {
//         //Handle successfull registration
//         console.log(response.data.msg)
//         document.getElementById("registrationResponse").innerText = "✅ " + response.data.msg;
//         document.getElementById("toast").classList.add('show');
//         setTimeout(function () {
//           document.getElementById("toast").classList.remove('show')
//           setTimeout(function () {
//             window.location.assign("login.html");
//           }, 1000);
//         }, 1000)
//       })
//       .catch(function (error) {
//         // Handle registration error
//         // alert("Registration failed. Please try again.");
//         console.error(error);

//       });

//   }

// })

//By using jquery
$("#registerButton").click(function () {
  // Getting form data
  const fullName = $("#fullName").val();
  const email = $("#email").val();
  const password = $("#password").val();
  const confirmPassword = $("#confirmPassword").val();

  // Performing form validation
  if (!fullName || !email || !password || !confirmPassword) {
    $("#registrationResponse").text("❌ Please fill all the fields");
    $("#toast").addClass("show");
    setTimeout(function () {
      $("#toast").removeClass('show');
    }, 3000);
  }

  if (password !== confirmPassword) {
    $("#registrationResponse").text("❌ Passwords do not match");
    $("#toast").addClass("show");
    setTimeout(function () {
      $("#toast").removeClass('show');
    }, 3000);
  } else {
    // Sending field data to server using Axios
    axios.post("http://localhost:5000/register", {
      fullName: fullName,
      email: email,
      password: password
    })
    .then(function (response) {
      // Handle successful registration
      console.log(response.data.msg);
      $("#registrationResponse").text("✅ " + response.data.msg);
      $("#toast").addClass('show');
      setTimeout(function () {
        $("#toast").removeClass('show');
        setTimeout(function () {
          window.location.assign("login.html");
        }, 1000);
      }, 1000);
    })
    .catch(function (error) {
      // Handle registration error
      console.error(error);
    });
  }
});


