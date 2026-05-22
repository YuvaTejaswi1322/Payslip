// ================================
// ADMIN LOGIN SYSTEM
// ================================

function login() {

let adminId =
document.getElementById("admin_id").value.trim();

let password =
document.getElementById("password").value.trim();

let error =
document.getElementById("error");

error.innerText = "";

if (adminId === "" || password === "") {

error.innerText =
"Please enter Admin ID and Password";

return false;
}

if (
adminId === "admin" &&
password === "12345"
) {

window.location.assign("index.html");

return false;

} else {

error.innerText =
"Invalid Admin ID or Password";

return false;
}

}


// ENTER KEY

document.addEventListener(
"keydown",
function(event){

if(event.key==="Enter"){

event.preventDefault();

login();

}

}
);


// FORGOT PASSWORD

function forgotPassword(){

alert(
"Admin Login Details\n\n" +
"Admin ID : admin\n" +
"Password : 12345"
);

}
