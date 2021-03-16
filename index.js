const guides = document.querySelector(".guides");
const logInLinks = document.querySelectorAll(".logged-in");
const logOutLinks = document.querySelectorAll(".logged-out");
const adminItems = document.querySelectorAll(".admin");
const accountDetails = document.querySelector(".account-details");

const setupUI = (user) => {
  if (user) {
    if (user.admin) {
      adminItems.forEach((item) => (item.style.display = "block"));
    }
    // showing account details
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const html = `
    <div>
    Logged in as : ${user.email}
    </div>
    <div><strong>${doc.data().bio}</strong></div>
    <div><strong>${
      user.admin ? "User-Type: Admin" : "User-Type: Gen-User"
    }</strong></div>

    `;
        accountDetails.innerHTML = html;
      });

    // showing the appropiate links
    logInLinks.forEach((item) => {
      item.style.display = "block";
    });
    logOutLinks.forEach((item) => {
      item.style.display = "none";
    });
  } else {
    adminItems.forEach((item) => (item.style.display = "none"));
    // hidding account details
    accountDetails.innerHTML = "";

    logInLinks.forEach((item) => {
      item.style.display = "none";
    });
    logOutLinks.forEach((item) => {
      item.style.display = "block";
    });
  }
};

const createGuide = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const guide = doc.data();
      const li = `<li>
  <div class="collapsible-header grey lighten-4">${guide.title} </div>
  <div class="collapsible-body white">${guide.content}</div>
</li>`;

      html += li;
    });
    guides.innerHTML = html;
  } else {
    guides.innerHTML = `<h4 class='center-align'>Please login to see the guides</h4>`;
  }
};

// setup materialize components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
