// ================================
// ADMIN LOGIN SYSTEM
// ================================

function login(){

let adminId =
document.getElementById("admin_id").value;

let password =
document.getElementById("password").value;

let error =
document.getElementById("error");

error.innerText="";

if(
adminId==="" ||
password===""
){

error.innerText=
"Please enter Admin ID and Password";

return;

}

if(
adminId==="admin" &&
password==="12345"
){

window.location.href="./index.html";

}
else{

error.innerText=
"Invalid Admin ID or Password";

}

}


// ================================
// ENTER KEY LOGIN
// ================================

document.addEventListener(
"keypress",
function(event){

if(event.key==="Enter"){

login();

}

}
);


// ================================
// FORGOT PASSWORD
// ================================

function forgotPassword(){

alert(
"Admin Login Details\n\n"+
"Admin ID : admin\n"+
"Password : 12345"
);

}
