document.addEventListener("DOMContentLoaded", function () {
  function fetchAllUsers() {
    axios.get('http://localhost:5000/users')
      .then(response => {
        displayUsers(response.data.allUsers)
      })
      .catch(error => {
        console.log(error)
      })
  }

  //this function will set value to table
  function displayUsers(users) {
    const tbody = document.getElementById("userTableBody");
    tbody.innerHTML = ''; // Clear the table body before populating

    users.forEach(user => {
      const tr = document.createElement("tr");
      const nameTd = document.createElement("td");
      const nameLink = document.createElement("a");
      nameLink.href = "#";
      nameLink.textContent = user.fullName;
      nameLink.addEventListener("click", function () {
        displayUserDetails(user)
      })
      nameTd.appendChild(nameLink);

      const emailTd = document.createElement("td");
      const emailLink = document.createElement("a");
      emailLink.href = "#";
      emailLink.textContent = user.email;
      emailLink.addEventListener("click", function () {
        displayUserDetails(user)
      })
      emailTd.appendChild(emailLink);

      const actionsTd = document.createElement("td");
      const searchLink = createTableLink("fa-search-plus");
      const editLink = createTableLink("fa-pencil");
      const deleteLink = createTableLink("fa-trash-o");
      actionsTd.append(searchLink, editLink, deleteLink);
      searchLink.addEventListener("click", function () {
        displayUserDetails(user)
      })
      editLink.addEventListener("click", function () {
        handleEditModal(user)
      })
      deleteLink.addEventListener("click", function () {
        handleDeleteUser(user)
      })


      tr.append(nameTd, emailTd, actionsTd);
      tbody.appendChild(tr);
    });
  }

  //this function will set class to icon
  function createTableLink(iconClass) {
    const link = document.createElement("a");
    link.href = "#";
    link.classList.add("table-link");

    const span = document.createElement("span");
    span.classList.add("fa-stack");

    const squareIcon = document.createElement("i");
    squareIcon.classList.add("fa", "fa-square", "fa-stack-2x");

    const actionIcon = document.createElement("i");
    actionIcon.classList.add("fa", iconClass, "fa-stack-1x", "fa-inverse");

    span.append(squareIcon, actionIcon);
    link.appendChild(span);

    return link;
  }

  //this function will set value to modal
  function displayUserDetails(user) {
    const modalTitle = document.querySelector("#exampleModalLabel");
    modalTitle.textContent = user.fullName;

    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = `<img src="./images/avatar.jpg" alt="profile pic" class="img-fluid w-25" /><p><strong>Name:</strong> ${user.fullName}</p> <p><strong>Email:</strong> ${user.email}</p>`;
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
  }

    //this function will set value to modal
    function handleEditModal(user) {
    const modalTitle = document.querySelector("#exampleModalLabel1");
    modalTitle.textContent = "Update user";
    document.getElementById("fullName").value=user.fullName
    document.getElementById("email").value=user.email
    const modal = new bootstrap.Modal(document.getElementById('exampleModal1'));
    modal.show();
  

  //function to handle edit user
  document.getElementById("updateButton").addEventListener("click", function(){
    const fullName= document.getElementById("fullName").value
    const email= document.getElementById("email").value
    axios.post(`http://localhost:5000/update-user/${user._id}`, {
      fullName:fullName,
      email:email
    })
    .then(function (response) {
        //Handle successfull edit
        document.getElementById("toastResponse").innerText = "✅ " + response.data.msg;
        document.getElementById("toast").classList.add('show');
        setTimeout(function () {
          document.getElementById("toast").classList.remove('show')
        }, 1000)
      })
      .catch(function (error) {
        console.log(error.response.data.check)
        if (error.response.status === 304) {
          document.getElementById("toastResponse").innerText = "❌ No changes.Try something different"
          document.getElementById("toast").classList.add("show");
          setTimeout(function () {
            document.getElementById("toast").classList.remove('show');
          }, 3000);
        }else{
          // Handle registration error
          // alert("Registration failed. Please try again.");
          console.error(error);
        }

      });
  })
}

  //this function will delete the user
  function handleDeleteUser(user) {
    console.log(user._id)
    axios.delete(`http://localhost:5000/delete-user/${user._id}`)
      .then(function (response) {
        if (response.status === 200) {
          document.getElementById("toastResponse").innerText = "✅ " + response.data.msg;
          document.getElementById("toast").classList.add("show")
          setTimeout(function () {
            document.getElementById("toast").classList.remove('show')
          }, 3000)
          // Call fetchAllUsers after successful deletion
          fetchAllUsers();
        }
      })
  }

  // Fetch users when the page loads
  fetchAllUsers();
});