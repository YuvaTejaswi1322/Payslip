// ================================
// ADMIN LOGIN SYSTEM
// ================================

function login(){

let username =
document.getElementById("username").value;

let password =
document.getElementById("password").value;

if(username==="admin" && password==="1234"){

window.location.href="index.html";

}
else{

alert("Invalid Username or Password");

}

}


// ================================
// ADMIN CREDENTIALS
// ================================

let correctId =
"admin";

let correctPassword =
"12345";


// Clear old error

error.innerText="";


// Empty field validation

if(
adminId==="" ||
password===""
){

error.innerText=
"Please enter Admin ID and Password";

return;

}


// Login validation

if(

adminId===correctId &&
password===correctPassword

){

// Open payslip page

window.location.href=
"/payslip";

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

if(
event.key==="Enter"
){

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
