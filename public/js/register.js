document
.getElementById("registerForm")
.addEventListener("submit",

async function(e){

    e.preventDefault();

    const username =
    document.getElementById("username").value;

    const fullname =
    document.getElementById("fullname").value;

    const email =
    document.getElementById("email").value;

    const phone =
    document.getElementById("phone").value;

    const password =
    document.getElementById("password").value;

    const confirmPassword =
    document.getElementById("confirmPassword").value;

    // ✅ Basic validation
    if(password !== confirmPassword){
        alert("Passwords do not match!");
        return;
    }

    if(password.length < 6){
        alert("Password must be at least 6 characters!");
        return;
    }

    try {

        const response =
        await fetch('/api/register',{

            method:'POST',

            headers:{
                'Content-Type':'application/json'
            },

            body:JSON.stringify({
                username,
                fullname,
                email,
                phone,
                password
            })
        });

        const data =
        await response.json();

        alert(data.message);

        if(data.success){
            window.location.href = "login.html";
        }

    } catch(err){
        console.log(err);
        alert("Server Error");
    }
});