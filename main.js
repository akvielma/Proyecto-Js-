const familyTask = document.getElementById('familia');
const gymTask = document.getElementById('gym');
const studyTask = document.getElementById('study');
const comprasTask = document.getElementById('compras');
const compromisoTask = document.getElementById('compromiso');
const trabajoTask = document.getElementById('trabajo');
const tareasContainer = document.querySelector('.tareas__container');
const btnAgregar = document.getElementById('agregar');
const agendaContainer = document.querySelector('.agenda__container');
const resetBtn = document.querySelector('.deleteBtn');
const porcentajeBtn = document.querySelector('.porcentajeBtn');
const popUp = document.querySelector('.pop-up__container');
const noBtn = document.getElementById('btn__no');
const yesBtn = document.getElementById('btn__yes');

let selectedColor, active;

tareasContainer.addEventListener('click', selectTask);
btnAgregar.addEventListener('click', showPanel);
agendaContainer.addEventListener('click', setColors);
resetBtn.addEventListener('click',openPopup);
porcentajeBtn.addEventListener('click',showPorentajes);
noBtn.addEventListener('click', closePopup);
yesBtn.addEventListener('click', deleteTasks);

// esta función es para agregar la tarea al calendario con un click - Se constituye con esta parte
function selectTask (e){
    resetTasks()

    taskColor = e.target.style.backgroundColor;
    activeTask(e.target, taskColor);
    icon =  `<span>${e.target.id}</span>`;

};

// y se complementa con esta
function setColors (e){
    if(e.target.classList.contains('tarea') && active === true){
        e.target.style.backgroundColor = selectedColor;
        e.target.innerHTML = icon;
    }else if(e.target.classList.contains('fas') && active === true){
        e.target.parentElement.style.backgroundColor = selectedColor;
        e.target.parentElement.innerHTML = icon;
    }
};
//panel para agregar la nueva tarea que no tenemos en el calendario
function showPanel (){
    const panel = document.querySelector('.panel__container__inputs');
    btnAgregar.style.display = "none";
    panel.className = ' input__active'
    const btnSubmit = document.getElementById('addBtn');
    btnSubmit.addEventListener('click', addTarea)
};

function addTarea(){
    const container = document.querySelector('.tareas__container');
    const nombre = document.getElementById('addName').value;
    const color = document.getElementById('addColor').value;
    const panel = document.querySelector('.input__active');
    btnAgregar.style.display = "flex";
    panel.className = 'panel__container__inputs'
    container.innerHTML += `<div class="nombre_tarea" id="${nombre}" style="background-color: ${color};">${nombre}</div>`
    document.getElementById('addName').value = '';
}



function activeTask(task, color){
    task.classList.toggle('selected');

    if(task.classList.contains('selected')){
        active = true;
        selectedColor = color;
        return selectedColor;
    } else {
        active = false;
    }
}


function resetTasks(){
    const allTasks = document.querySelectorAll('.nombre_tarea');

    allTasks.forEach((item)=>{
        item.className = 'nombre_tarea';
    })
}


function deleteTasks(){
    const tasks = document.querySelectorAll('.tarea');

    tasks.forEach((item)=>{
        item.innerHTML = '';
        item.style.backgroundColor = 'white';
    })

    closePopup();
}

// Open Pop-up
function openPopup(){
    popUp.style.display = 'flex';
}


function closePopup(){
    popUp.style.display = 'none';
}
//porcentajes de las tareas que lleve a cabo durante la semana 
function showPorentajes(){
    let titulos = [];
    let tiempos = [];
    const divPorcentajes = document.getElementById('pocertajes');
    const tasks = document.querySelectorAll('.tarea');
    
    tasks.forEach((t)=>{
        if (!(titulos.includes(t.innerHTML))) {
            titulos.push(t.innerHTML)
        }
    })
    
    titulos.forEach(r => {
        tiempos.push(0);
        tasks.forEach(t => {
            if(r == t.innerHTML){
                tiempos[tiempos.length - 1] += 2;
            }
        })
    });
    divPorcentajes.innerHTML = '';
    for (let i = 0; i < titulos.length; i++){
        divPorcentajes.innerHTML += `<div>${titulos[i] == '' ? '<span>Tiempo libre</span>' : titulos[i]}: ${tiempos[i]}h</div>`
    }
}