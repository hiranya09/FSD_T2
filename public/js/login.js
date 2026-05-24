document
.getElementById("loginForm")
.addEventListener("submit",

async function(e){

    e.preventDefault();

    const username =
    document.getElementById("username")
    .value;

    const password =
    document.getElementById("password")
    .value;

    try {

        const response =
        await fetch('/api/login',{

            method:'POST',

            headers:{
                'Content-Type':'application/json'
            },

            body:JSON.stringify({

                username,
                password
            })
        });

        const data =
        await response.json();

        if(data.success){

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            window.location.href =
            "index.html";

        } else {

            alert(data.message);
        }

    } catch(err){

        console.log(err);

        alert("Server Error");
    }
});