const inputElement  = document.querySelector('.new-task-input');
const addTaskButton = document.querySelector('.new-button');
const taskTarefa  = document.querySelector('.tarefas')

const validadeinput = () => inputElement.value.trim().length > 0;


const addtask =() =>{
const inputIsValid = validadeinput();
if(!inputIsValid){
return inputElement.classList.add('error');
}

//div com o conteudo 
const taskItemContainer = document.createElement('div')
taskItemContainer.classList.add('task-item');


//texto/paragrafo/titulo
const taskContent = document.createElement('p');
taskContent.innerText = inputElement.value;
taskContent.addEventListener('click', () => handleclick(taskContent))


//imagen
const deleteItem = document.createElement('i');
deleteItem.classList.add('fa-solid');
deleteItem.classList.add('fa-trash')
deleteItem.addEventListener('click', () => handledelete(taskItemContainer,taskContent) )


taskItemContainer.appendChild(taskContent);
taskItemContainer.appendChild(deleteItem);

taskTarefa.appendChild(taskItemContainer);

inputElement.value = '';

upDateLocalStorage()

};



//funçoes

const handleclick = (taskContent) =>{
 const tasks  = taskTarefa.childNodes;
 for (const task of tasks){
if(task.firstChild.isSameNode(taskContent))
{
task.firstChild.classList.toggle('completed');
}   
}
upDateLocalStorage()

} 



const handledelete = (taskItemContainer,taskContent) =>{
const tasks  = taskTarefa.childNodes;
for (const task of tasks){

    if(task.firstChild.isSameNode(taskContent)){
     taskItemContainer.remove();
    }   
}
upDateLocalStorage()
}




const handleInputChange = () => {
const inputIsValid = validadeinput();
if(inputIsValid == true){
return inputElement.classList.remove('error');
}
}

const upDateLocalStorage = () =>{
const tasks = taskTarefa.childNodes;
const localStorageTask = [...tasks].map(task =>{
const contente =  task.firstChild;
const isCompleted = contente.classList.contains('completed')

return {description:contente.innerText,isCompleted}
});
  
localStorage.setItem("tasks",JSON.stringify(localStorageTask))


};


const refreshTask =() =>{
   const taskFromLocalStorage = JSON.parse( localStorage.getItem('tasks'))
  
if(!taskFromLocalStorage){
return;
}

   for(const task of taskFromLocalStorage){


    const taskItemContainer = document.createElement('div')
    taskItemContainer.classList.add('task-item');
    
    
    //texto/paragrafo/titulo
    const taskContent = document.createElement('p');
    taskContent.innerText = task.description; 
 if(task.isCompleted){
taskContent.classList.add('completed')
 }


    taskContent.addEventListener('click', () => handleclick(taskContent))
    
    
    //imagen
    const deleteItem = document.createElement('i');
    deleteItem.classList.add('fa-solid');
    deleteItem.classList.add('fa-trash')
    deleteItem.addEventListener('click', () => handledelete(taskItemContainer,taskContent) )
    
    
    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
    
    taskTarefa.appendChild(taskItemContainer);
    

   }
}

refreshTask();
addTaskButton.addEventListener('click',() =>  addtask() );
inputElement.addEventListener('change', () => handleInputChange() );


