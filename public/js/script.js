const user =
JSON.parse(localStorage.getItem("user"));

if(!user){

    window.location.href =
    "login.html";
}

const taskList =
document.getElementById("taskList");

let currentTaskId = null;

/* LOAD TASKS */

async function loadTasks(){

    try{

        const response =
        await fetch(
            `/api/tasks/${user._id}`
        );

        const tasks =
        await response.json();

        taskList.innerHTML = "";

        if(tasks.length === 0){

            taskList.innerHTML = `

            <div class="empty-task">

                No Tasks Added Yet

            </div>
            `;

            return;
        }

        tasks.forEach(task => {

            const li =
            document.createElement("li");

            const taskDate =
            new Date(task.createdAt);

            const formattedDate =
            taskDate.toLocaleDateString(
                'en-GB'
            );

            const formattedTime =
            taskDate.toLocaleTimeString(
                'en-US',
                {
                    hour:'2-digit',
                    minute:'2-digit',
                    hour12:true
                }
            );

            li.innerHTML = `

            <div class="task-left">

                <div class="task-content">

                    <span class="${
                        task.completed ?
                        'completed' : ''
                    }">

                        ${task.task}

                    </span>

                </div>

                <div class="task-date">

                    📅 ${formattedDate}

                    🕒 ${formattedTime}

                </div>

            </div>

            <div class="task-buttons">

                <button
                class="complete-btn">

                    ✔

                </button>

                <button
                class="edit-btn">

                    ✏

                </button>

                <button
                class="delete-btn">

                    🗑

                </button>

            </div>
            `;

            /* COMPLETE */

            li.querySelector(
                ".complete-btn"
            ).addEventListener(
                "click",
                () => completeTask(task._id)
            );

            /* EDIT */

            li.querySelector(
                ".edit-btn"
            ).addEventListener(
                "click",
                () => editTask(
                    task._id,
                    task.task
                )
            );

            /* DELETE */

            li.querySelector(
                ".delete-btn"
            ).addEventListener(
                "click",
                () => deleteTask(task._id)
            );

            taskList.appendChild(li);
        });

    }catch(err){

        console.log(err);

        alert("Error Loading Tasks");
    }
}

/* ADD TASK */

async function addTask(){

    try{

        const taskInput =
        document.getElementById(
            "taskInput"
        );

        const taskDate =
        document.getElementById(
            "taskDate"
        );

        const task =
        taskInput.value.trim();

        const dueDate =
        taskDate.value;

        if(task === "" || dueDate === ""){

            alert("Please Enter Task And Date");

            return;
        }

        await fetch('/api/addTask',{

            method:'POST',

            headers:{
                'Content-Type':'application/json'
            },

            body:JSON.stringify({

                userId:user._id,

                task,

                dueDate
            })
        });

        taskInput.value = "";
        taskDate.value = "";

        loadTasks();

    }catch(err){

        console.log(err);

        alert("Error Adding Task");
    }
}
/* DELETE TASK */

async function deleteTask(id){

    try{

        await fetch(

            `/api/deleteTask/${id}`,

            {
                method:'DELETE'
            }
        );

        loadTasks();

    }catch(err){

        console.log(err);

        alert("Delete Failed");
    }
}

/* COMPLETE TASK */

async function completeTask(id){

    try{

        await fetch(

            `/api/completeTask/${id}`,

            {
                method:'PUT'
            }
        );

        loadTasks();

    }catch(err){

        console.log(err);

        alert("Update Failed");
    }
}

/* OPEN EDIT MODAL */

function editTask(id, oldTask){

    currentTaskId = id;

    document.getElementById(
        "editTaskInput"
    ).value = oldTask;

    document.getElementById(
        "editModal"
    ).style.display = "flex";
}

/* SAVE EDITED TASK */

async function saveEditedTask(){

    const updatedTask =
    document.getElementById(
        "editTaskInput"
    ).value.trim();

    if(updatedTask === ""){

        alert("Task Cannot Be Empty");

        return;
    }

    try{

        await fetch(

            `/api/editTask/${currentTaskId}`,

            {

                method:'PUT',

                headers:{
                    'Content-Type':'application/json'
                },

                body:JSON.stringify({

                    task:updatedTask
                })
            }
        );

        closeEditModal();

        loadTasks();

    }catch(err){

        console.log(err);

        alert("Edit Failed");
    }
}

/* CLOSE MODAL */

function closeEditModal(){

    document.getElementById(
        "editModal"
    ).style.display = "none";
}

/* LOGOUT */

function logout(){

    localStorage.removeItem("user");

    window.location.href =
    "login.html";
}

/* SEARCH TASKS */

function searchTasks(){

    const input =
    document.getElementById(
        "searchTask"
    ).value.toLowerCase();

    const tasks =
    document.querySelectorAll("li");

    tasks.forEach(task => {

        const text =
        task.innerText.toLowerCase();

        if(text.includes(input)){

            task.style.display =
            "flex";

        }else{

            task.style.display =
            "none";
        }
    });
}

loadTasks();