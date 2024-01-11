
const form = document.querySelector('.exercise-form');
const alert = document.querySelector('.alert');
const exercise = document.getElementById('exercise');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.exercise-container');
const list = document.querySelector('.exercise-list');
const clearBtn = document.querySelector('.clear-btn');


let editElement;
let editFlag = false;
let editID= "";


form.addEventListener('submit', addItem);


clearBtn.addEventListener('click', clearItems);


function addItem(e){
    e.preventDefault();
    const value = exercise.value
    const id = new Date().getTime().toString();

    if(value !== "" && editFlag === false){
        const element = document.createElement('section');
       
        element.classList.add('exercise-item');
      
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
            <button class="edit-btn">
                <i>edit</i>
            </button>
            <button class="delete-btn">
                <i>delete</i>
            </button>
        </div>`;
        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');
        deleteBtn.addEventListener('click',deleteItem);
        editBtn.addEventListener('click',editItem);

      
        list.appendChild(element);
       
        displayAlert("items added to the list", "danger");
       
        container.classList.add("show-container");
       
        setBackToDefault();
        
    }
    else if( value !== "" && editFlag === true){
       editElement.innerHTML =  value;
       displayAlert('value changed', "success")
       setBackToDefault()  
    }
    else{
      displayAlert("plaese enter the value", "danger")
    } 
}


function displayAlert(text, action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    
    setTimeout(function(){
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    },1000);
}


function clearItems(){
    const items = document.querySelectorAll('.exercise-item');
     
    if (items.length > 0){
        items.forEach(function(item){
            list.removeChild(item);
        });
    }

    container.classList.remove("show-container");
    displayAlert('empty list', "danger");
    setBackToDefault();
}


function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0){
        container.classList.remove("show-container");
    }
    displayAlert("item removed", "danger")
    setBackToDefault();
    
}

function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    exercise.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit"
}


function setBackToDefault(){
    exercise.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}