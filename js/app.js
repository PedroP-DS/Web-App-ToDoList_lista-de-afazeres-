//Selecionar os elementos
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_TROUGH = "lineThrough";
//

let LIST ,id;

//LocalStorage
let data = localStorage.getItem("TODO");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
  LIST = []
  id=0;
}

function loadList(array){
  array.forEach(function(item){
    addToDo(item.name, item.id, item.done, item.trash)
  })
}

//Limpar o localStorage
clear.addEventListener("click", function(){
  localStorage.clear();
  location.reload();
});

//Mostrar a data do dia
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("pt-br", options);


//Função para add
function addToDo(toDo, id, done, trash) {

  if(trash){ return; }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_TROUGH : "";

  const item = `
  <li class="item">
      <i class="fa ${DONE} co" job="complete" id="${id}"></i>
      <p class="text ${LINE}">${toDo}</p>
      <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
  </li>
  `;
  const position = "beforeend";

  list.insertAdjacentHTML(position, item);
}


//Adiconando item através do enter
document.addEventListener("keyup", function(even){
  if(event.keyCode == 13){
    const toDo = input.value;
    if(toDo){
        addToDo(toDo, id, false, false);

        LIST.push({
          name: toDo,
          id : id,
          done :false,
          trash: false
        });
        localStorage.setItem("TODO", JSON.stringify(LIST));
        id++;
    }
    input.value = ""
  }
});

//Funçao para qnd completar tarefa
function completeToDo(element){
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_TROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true; 
}

//função remover
function removeToDo(element){
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}
//

list.addEventListener("click", function(event){
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob =="complete"){
        completeToDo(element);
  }else if (elementJob =="delete"){
        removeToDo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});