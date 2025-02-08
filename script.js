function showLogin(){
    document.getElementById("register-box").style.display="none";
    document.getElementById("login-box").style.display="block";
}
function showRegister(){
    document.getElementById("login-box").style.display="none";
    document.getElementById("register-box").style.display="block";
}
function registerUser(){
    let name =document.getElementById("reg-name").value;
    let email =document.getElementById("reg-email").value;
    let password =document.getElementById("reg-password").value;
    let confirmpassword =document.getElementById("reg-confirm-password").value;



if (name === "" || email==="" || password ==="" || confirmpassword === ""){
    alert("All fields are required!");
    return;
}
if (!email.includes("@")){
    alert("Enter a calid email!");
    return;
}
if(password.length<6){
    alert("Password should be at least 6 characters!");
    return;
}
if(password !== confirmpassword){
    alert("Passwords do not match!");
    return;

}
let user= {name,email,password};
localStorage.setItem("user",JSON.stringify(user));

alert("Registration successful! you can now log in.");
showLogin();
}
function loginUser(){
    let email=document.getElementById("login-email").value;
    let password=document.getElementById("login-password").value;
    let user=JSON.parse(localStorage.getItem("user"));
    if(user && user.email === email && user.password ===password){
        alert("Login successful!");
       window.location.href="E:\E-Commerce Hotwax\home.html";
    } else{
        alert("Invalid email or password!");
    }
}