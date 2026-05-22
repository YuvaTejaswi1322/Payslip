// ================================
// NR SOFTECH PAYSLIP SYSTEM
// ================================

document.addEventListener("DOMContentLoaded", function(){

// ======================================
// FIELD REFERENCES
// ======================================

const payStart=document.getElementById("pay_start");
const payEnd=document.getElementById("pay_end");
const paidDays=document.getElementById("paid_days");

const actualBasicPay=
document.getElementById("actual_basic_pay");

const basic=
document.getElementById("basic");

const meal=
document.getElementById("meal");

const transport=
document.getElementById("transport");

const profTax=
document.getElementById("prof_tax");

const insurance=
document.getElementById("insurance");

const sodexo=
document.getElementById("sodexo");

const leaves=
document.getElementById("leaves");

// ===============================
// FIELD VALIDATIONS
// ===============================

// Field references

const name=document.getElementById("name");
const department=document.getElementById("department");
const designation=document.getElementById("designation");
const pers_no=
document.getElementById("pers_no");
const pan=document.getElementById("pan");
const pf_no=document.getElementById("pf_no");
const uan_no=document.getElementById("uan_no");
const bank_account=document.getElementById("bank_account");


// Name - only alphabets + uppercase

name?.addEventListener("input",function(){

this.value=
this.value
.toUpperCase()
.replace(/[^A-Z ]/g,'');

});


// Department - only alphabets + uppercase

department?.addEventListener("input",function(){

this.value=
this.value
.toUpperCase()
.replace(/[^A-Z ]/g,'');

});


// Designation - only alphabets + uppercase

designation?.addEventListener("input",function(){

this.value=
this.value
.toUpperCase()
.replace(/[^A-Z ]/g,'');

});


// Employee Number - alphabets + digits

pers_no?.addEventListener("input",function(){

this.value=
this.value
.toUpperCase()
.replace(/[^A-Z0-9]/g,'');

});


// PAN
// First 5 letters + 4 digits + last letter

pan?.addEventListener("input",function(){

let value=
this.value
.toUpperCase()
.replace(/[^A-Z0-9]/g,'');

if(value.length>10){

value=
value.slice(0,10);

}

let first5=
value.substring(0,5)
.replace(/[^A-Z]/g,'');

let next4=
value.substring(5,9)
.replace(/[^0-9]/g,'');

let last1=
value.substring(9,10)
.replace(/[^A-Z]/g,'');

this.value=
first5+
next4+
last1;

});


// PF Number
// Alphabets + digits + /

pf_no?.addEventListener("input",function(){

this.value=
this.value
.toUpperCase()
.replace(/[^A-Z0-9/]/g,'');

});


// UAN Number
// Alphabets + digits

uan_no?.addEventListener("input",function(){

this.value=
this.value
.toUpperCase()
.replace(/[^A-Z0-9]/g,'');

});


// Bank Account
// Digits only

bank_account?.addEventListener("input",function(){

this.value=
this.value
.replace(/[^0-9]/g,'');

});


// ======================================
// PAYSLIP HEADING
// ======================================

function updatePayslipHeading(){

let heading=
document.getElementById(
"payslip_heading"
);

if(!payStart.value){

heading.innerText=
"PAYSLIP";

return;
}

let date=
new Date(payStart.value);

let month=
date.toLocaleString(
'en-US',
{month:'long'}
).toUpperCase();

let year=
date.getFullYear();

heading.innerText=
`PAYSLIP OF ${month}/${year}`;

}


// ======================================
// SET PAY END
// ======================================

function setPayPeriodEnd() {

let startDate =
document.getElementById("pay_start").value;

if(!startDate) return;

let date =
new Date(startDate);

let lastDay =
new Date(
date.getFullYear(),
date.getMonth()+1,
0
);

let year =
lastDay.getFullYear();

let month =
String(
lastDay.getMonth()+1
).padStart(2,'0');

let day =
String(
lastDay.getDate()
).padStart(2,'0');

document.getElementById(
"pay_end"
).value=
`${year}-${month}-${day}`;

calculatePaidDays();

}

document.getElementById(
"pay_start"
).addEventListener(
"change",
setPayPeriodEnd
);


// ======================================
// CALCULATE PAID DAYS
// ======================================

function calculatePaidDays(){

if(
!payStart.value ||
!payEnd.value
){

paidDays.value="";
return;

}

let start=
new Date(payStart.value);

let end=
new Date(payEnd.value);

let totalDays=
Math.floor(
(end-start)
/(1000*60*60*24)
)+1;

let leaveDays=
parseFloat(
leaves.value
)||0;

let finalDays=
totalDays-leaveDays;

if(finalDays<0){

finalDays=0;

}

paidDays.value=
finalDays.toFixed(0);

calculateSalary();

}


// ======================================
// REMOVE ZERO ON FOCUS
// ======================================

[
"leaves",
"actual_basic_pay",
"meal",
"transport",
"prof_tax",
"insurance",
"sodexo"
]
.forEach(id=>{

let field=
document.getElementById(id);

field?.addEventListener(
"focus",
function(){

if(this.value=="0"){

this.value="";

}

});

field?.addEventListener(
"blur",
function(){

if(this.value==""){

this.value="0";

}

});

});


// ======================================
// CALCULATE SALARY
// ======================================

function calculateSalary(){

let actualBasic=
parseFloat(actualBasicPay.value)||0;

let paid=
parseFloat(paidDays.value)||0;

let mealVal=
parseFloat(meal.value)||0;

if(meal.value!=""){

sodexo.value=
meal.value;

}

let transportVal=
parseFloat(transport.value)||0;

let prof=
parseFloat(profTax.value)||0;

let insuranceVal=
parseFloat(insurance.value)||0;

let sodexoVal=
parseFloat(sodexo.value)||0;


// MONTH DAYS

let monthDays=31;

if(payStart.value){

let d=
new Date(payStart.value);

monthDays=
new Date(
d.getFullYear(),
d.getMonth()+1,
0
).getDate();

}


// BASIC

let basicPay=0;

if(
actualBasic>0 &&
paid>0
){

basicPay=
(actualBasic/monthDays)
*paid;

}

basic.value=
basicPay.toFixed(2);


// HRA / PF

let hraVal=
basicPay*0.50;

let pfVal=
basicPay*0.12;


// EARNINGS

let earnings=
basicPay+
hraVal+
mealVal+
transportVal;


// TAX

let yearlyGross=
earnings*12;

let standardDeduction=
75000;

let taxableIncome=
yearlyGross-
standardDeduction;

if(taxableIncome<0){

taxableIncome=0;

}

let yearlyTax=0;

if(taxableIncome<=400000){

yearlyTax=0;

}
else if(taxableIncome<=800000){

yearlyTax=
(taxableIncome-400000)
*0.05;

}
else{

yearlyTax=
20000+
(
(taxableIncome-800000)
*0.10
);

}

let cess=
yearlyTax*0.04;

yearlyTax+=cess;

let incomeTax=
yearlyTax/12;


// DEDUCTIONS

let deductions=
pfVal+
prof+
insuranceVal+
sodexoVal;


// NET PAY

let netPay=
earnings-
(
incomeTax+
deductions
);


// VALUES

document.getElementById("hra").value=hraVal.toFixed(2);
document.getElementById("pf").value=pfVal.toFixed(2);
document.getElementById("income_tax").value=incomeTax.toFixed(2);
document.getElementById("total_tax").value=incomeTax.toFixed(2);
document.getElementById("total_earnings").value=earnings.toFixed(2);
document.getElementById("total_deductions").value=deductions.toFixed(2);
document.getElementById("net_pay").value=netPay.toFixed(2);

// YTD CALCULATIONS

basic_ytd.value=
(basicPay*12).toFixed(2);

hra_ytd.value=
(hraVal*12).toFixed(2);

meal_ytd.value=
(mealVal*12).toFixed(2);

transport_ytd.value=
(transportVal*12).toFixed(2);

pf_ytd.value=
(pfVal*12).toFixed(2);

income_tax_ytd.value=
(incomeTax*12).toFixed(2);

total_tax_ytd.value=
(incomeTax*12).toFixed(2);

total_earnings_ytd.value=
(earnings*12).toFixed(2);

prof_ytd.value=
(prof*12).toFixed(2);

insurance_ytd.value=
(insuranceVal*12).toFixed(2);

sodexo_ytd.value=
(sodexoVal*12).toFixed(2);

total_deductions_ytd.value=
(deductions*12).toFixed(2);

net_total_earnings.value=
earnings.toFixed(2);

net_total_tax.value=
incomeTax.toFixed(2);

net_total_deductions.value=
deductions.toFixed(2);

}


// EVENTS

payStart?.addEventListener(
"change",
function(){

updatePayslipHeading();

setPayPeriodEnd();

calculatePaidDays();

}
);

payEnd?.addEventListener(
"change",
calculatePaidDays
);

leaves?.addEventListener(
"input",
calculatePaidDays
);

[
actualBasicPay,
meal,
transport,
profTax,
insurance,
sodexo
]
.forEach(field=>{

field?.addEventListener(
"input",
calculateSalary
);

});


// TAB ONLY MANUAL FIELDS

[
"paid_days",
"basic",
"hra",
"pf",
"income_tax",
"total_tax",
"total_earnings",
"total_deductions",
"net_pay"
]
.forEach(id=>{

let field=
document.getElementById(id);

if(field){

field.readOnly=true;
field.tabIndex=-1;

}

});
// TAB ONLY FOR MANUAL ENTER FIELDS

[
"paid_days",
"basic",
"hra",
"pf",
"income_tax",
"total_tax",
"total_earnings",
"total_deductions",
"net_pay",

"basic_ytd",
"hra_ytd",
"meal_ytd",
"transport_ytd",
"total_earnings_ytd",

"income_tax_ytd",
"total_tax_ytd",

"pf_ytd",
"prof_ytd",
"insurance_ytd",
"sodexo_ytd",
"total_deductions_ytd",

"net_total_earnings",
"net_total_tax",
"net_total_deductions"

]
.forEach(id=>{

let field=
document.getElementById(id);

if(field){

field.readOnly=true;
field.tabIndex=-1;

}

});



calculateSalary();

});
function logout(){

sessionStorage.removeItem(
"loggedIn"
);

window.location.href=
"login.html";

}
