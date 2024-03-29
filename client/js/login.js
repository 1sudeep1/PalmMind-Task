// using direct HTML DOM
// document.getElementById("loginUser").addEventListener("click", function () {
//   //getting form data
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   //performing form validation
//   if (!email || !password) {
//     document.getElementById("loginResponse").innerText = "❌ Please fill all the fields";
//     document.getElementById("toast").classList.add("show")
//     setTimeout(function () {
//       document.getElementById("toast").classList.remove('show')
//     }, 3000)
//   } else {
//     axios.post("http://localhost:5000/login", {
//       email: email,
//       password: password
//     })
//       .then(function (response) {
//         if (response.status === 200) {
//           document.getElementById("loginResponse").innerText = "✅ " + response.data.msg;
//           document.getElementById("toast").classList.add("show")
//           setTimeout(function () {
//             document.getElementById("toast").classList.remove('show')
//             setTimeout(function () {
//               window.location.assign("index.html");
//             }, 1000);
//           }, 3000)
//         } else {
//           document.getElementById("loginResponse").innerText = "❌ " + response.data.msg;
//           document.getElementById("toast").classList.add("show")
//           setTimeout(function () {
//             document.getElementById("toast").classList.remove('show')
//           }, 3000)
//         }
//       })
//       .catch(function (error) {
//         if (error.response.status === 401) {
//           document.getElementById("loginResponse").innerText = "❌ " + error.response.data.msg;
//           document.getElementById("toast").classList.add("show");
//           setTimeout(function () {
//             document.getElementById("toast").classList.remove('show');
//           }, 3000);
//         } else {
//           alert("An error occurred: " + error.response.data.msg);
//         }
//       });
//   }
// })

//using jquery
$(document).ready(function () {
  $("#loginUser").click(function () {
    // Getting form data
    const email = $("#email").val();
    const password = $("#password").val();

    // Performing form validation
    if (!email || !password) {
      $("#loginResponse").text("❌ Please fill all the fields");
      $("#toast").addClass("show");
      setTimeout(function () {
        $("#toast").removeClass('show');
      }, 3000);
    } else {
      // Sending login data to server using Axios
      axios.post("http://localhost:5000/login", {
        email: email,
        password: password
      })
        .then(function (response) {
          if (response.status === 200) {
            $("#loginResponse").text("✅ " + response.data.msg);
            $("#toast").addClass("show");
            setTimeout(function () {
              $("#toast").removeClass('show');
              setTimeout(function () {
                window.location.assign("index.html");
              }, 1000);
            }, 3000);
          } else {
            $("#loginResponse").text("❌ " + response.data.msg);
            $("#toast").addClass("show");
            setTimeout(function () {
              $("#toast").removeClass('show');
            }, 3000);
          }
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            $("#loginResponse").text("❌ " + error.response.data.msg);
            $("#toast").addClass("show");
            setTimeout(function () {
              $("#toast").removeClass('show');
            }, 3000);
          } else {
            alert("An error occurred: " + error.response.data.msg);
          }
        });
    }
  });
  // nav will fixed with animation after scrolling
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('nav').addClass('navFixedAnim')
    } else {
      $('nav').removeClass('navFixedAnim')
    }
  })
})
