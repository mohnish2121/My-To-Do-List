window.addEventListener("load",RenderTodoFromLocalOnLoad);

const inputbox = document.getElementById("todo-input");

inputbox.addEventListener("keyup", addNewTask);

let checkbutton;

let trashbutton;

const select = document.getElementById("select-all");
select.addEventListener("click", filterTodo);

function addNewTask(event){
    if(event.key === "Enter" && inputbox.value){
        const div = document.createElement("div");
        div.classList.add("newtask");
        
        const p = document.createElement("p");
        p.innerHTML = inputbox.value;
        p.classList.add("task-text");
        
        const checkicon = document.createElement("i");
        checkicon.classList.add("fas");
        checkicon.classList.add("fa-check");
        
        const trashicon = document.createElement("i");
        trashicon.classList.add("fas");
        trashicon.classList.add("fa-trash");

        const body = document.querySelector("body");
        
        // saving each made text to localstorage so as to retrive after
        addToLocalStorage(inputbox.value);
        
        div.appendChild(p);
        div.appendChild(checkicon);
        div.appendChild(trashicon);
        body.appendChild(div);
        inputbox.value = "";

        // initializing check btn and trash button at every or click;

        checkbutton = document.getElementsByClassName("fa-check");

        trashbutton = document.getElementsByClassName("fa-trash");
        for(let i = 0;i< checkbutton.length;i++){
            checkbutton[i].addEventListener("click", checktask);
            trashbutton[i].addEventListener("click", removeTask);
        }
    }
}


function removeTask(event) {
    const parentdiv = event.target.parentElement;
    parentdiv.classList.add("fall");
    removeFromLocal(parentdiv);
    parentdiv.addEventListener("transitionend",()=>{
        parentdiv.remove();
    })
    
}
function checktask(event){
    const parentdiv = event.target.parentElement;
    parentdiv.classList.toggle("completed");
    markCompleteClassInLocal(parentdiv);
}
function markCompleteClassInLocal(parentdiv){
    let todos = JSON.parse(localStorage.getItem('todos'));
    const todo = parentdiv.children[0].innerHTML;
    
    for(let i = 0;i<todos.length;i++){
        if(Object.keys(todos[i])[0] === todo){
            todos[i][todo] = 1;
            break;
        }
    }
    localStorage.setItem('todos',JSON.stringify(todos));
        
}
function filterTodo(event) {
    let option = event.target.value;
    let div = document.getElementsByClassName("newtask");
    for(let item of div){
        if(option === "completed"){
           if(item.classList.contains("completed")){
               item.style.display = "flex";
           } 
           else{
               item.style.display = "none";
           }
        }
        else if(option === "uncompleted"){
            if(item.classList.contains("completed")){
                item.style.display = "none";
            }
            else{
                item.style.display = "flex";
            }
        }
        else{
            item.style.display = "flex";
        }
    }
}


function addToLocalStorage(todo){
    let obj = {[todo]:0};
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(obj);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function RenderTodoFromLocalOnLoad(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        const div = document.createElement("div");
        div.classList.add("newtask");
        
        const p = document.createElement("p");
        p.innerHTML = Object.keys(todo)[0];
        p.classList.add("task-text");

        if ((Object.values(todo)[0]) == 1){
            div.classList.toggle("completed");
        }

        
        const checkicon = document.createElement("i");
        checkicon.classList.add("fas");
        checkicon.classList.add("fa-check");
        
        const trashicon = document.createElement("i");
        trashicon.classList.add("fas");
        trashicon.classList.add("fa-trash");

        const body = document.querySelector("body");
        
        div.appendChild(p);
        div.appendChild(checkicon);
        div.appendChild(trashicon);
        body.appendChild(div);
    

        // initializing check btn and trash button at every  or click;

        checkbutton = document.getElementsByClassName("fa-check");

        trashbutton = document.getElementsByClassName("fa-trash");
        for(let i = 0;i< checkbutton.length;i++){
            checkbutton[i].addEventListener("click", checktask);
            trashbutton[i].addEventListener("click", removeTask);
        }
    });
}

// remove todo from local on clicking trash button
function removeFromLocal(todo){
    let textToDelete = todo.children[0].innerHTML;
    // find index of it 
    let todos = JSON.parse(localStorage.getItem('todos'));
    let index;
    for(let i = 0;i<todos.length;i++){
        if(todos[i] === todo){
            index = i;
            break;
        }
    }
    todos.splice(index,1);
    localStorage.setItem('todos',JSON.stringify(todos));
}