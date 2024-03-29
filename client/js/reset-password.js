document.getElementById("createNewPassword").addEventListener("click", function () {
    //getting form data
    const resetCode = document.getElementById("resetCode").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmNewPassword = document.getElementById("confirmNewPassword").value;
    //performing form validation
    if (!resetCode || !newPassword || !confirmNewPassword) {
        document.getElementById("verifyResponse").innerText = "❌ Please fill all the fields";
        document.getElementById("toast").classList.add("show")
        setTimeout(function () {
            document.getElementById("toast").classList.remove('show')
        }, 3000)
    } else {
        axios.post("http://localhost:5000/reset-password", {
            resetCode: resetCode,
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword
        })
            .then(function (response) {
                console.log(response.status)
                if (response.status === 200) {
                    document.getElementById("resetResponse").innerText = "✅ " + response.data.msg + ". please login";
                    document.getElementById("toast").classList.add("show")
                    setTimeout(function () {
                        document.getElementById("toast").classList.remove('show')
                        setTimeout(function () {
                            window.location.assign("login.html");
                        }, 1000);
                    }, 3000)
                }
            })
            .catch(function (error) {
                if (error.response.status === 404) {
                    document.getElementById("resetResponse").innerText = "❌ " + error.response.data.msg;
                    document.getElementById("toast").classList.add("show")
                    setTimeout(function () {
                        document.getElementById("toast").classList.remove('show')
                    }, 3000)
                }else{
                    document.getElementById("resetResponse").innerText = "❌ " + error.response.data.msg;
                    document.getElementById("toast").classList.add("show")
                    setTimeout(function () {
                        document.getElementById("toast").classList.remove('show')
                    }, 3000)
                }
            })
    }
})
