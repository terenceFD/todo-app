'use strict';
const classes = (classes) => {
	return document.querySelector(classes);
};
const id = (id) => {
	return document.getElementById(id);
};

/*
! getting elements from the html page

*/
const addTask = classes('.add_task'),
	closeEl = classes('.close'),
	wrrapper = classes('.wrrapper'),
	closeBtn = id('close'),
	dateEls = id('date'),
	areaEl = id('area'),
	dateEl = classes('.date'),
	taskEl = classes('.task'),
	tasks = classes('.tasks'),
	taxes = classes('.taxes'),
	gym = classes('.gym'),
	text = id('text'),
	inputEl = classes('input'),
	header = classes('.header'),
	xmark = classes('.xmark'),
	btn = classes('.btn2'),
	edit = classes('.edit'),
	thanksModal = id('after'),
	thanks = classes('.thanks'),
	overlay = classes('.overlay');

// ! making the modal with white background display


const openModal = () => {
	addTask.classList.add('active');
	document.body.classList.add('mode');
	wrrapper.classList.remove('active');
};
const closeModal = () => {
	addTask.classList.remove('active');
	wrrapper.classList.add('active');
	document.body.classList.remove('mode');
};

/*
! checking id the inputs in the modal is empty if not then we add an eventlistener on the form
*/

const addTaskEl = (e) => {
	e.preventDefault();

	if (
		inputEl.value.trim() === '' ||
		areaEl.value.trim() === '' ||
		dateEls.value.length === 0
	) {
		confirm('please fill all inputs before submiting');
	} else {
		acceptData();
		addTasks();
		closeModal();
		toastBtn.innerHTML = `
		     <p>
                    your task was saved in your browser's localstorage.to view it

                </p>
                <ul>
                    <li>right click</li>
                    <li> go to inspect</li>
                    <li> then application</li>
                    <li>localtstorage</li>
                    <li>key==== 'todo'</li>
                    <img src="database.svg">
                </ul>
		`;
		showMessage();
	}
};

let data = [];
function acceptData() {
	data.push({
		text: (dateEl.textContent = text.value),
		date: (taskEl.textContent = dateEls.value),
		description: (gym.textContent = areaEl.value),
	});
	localStorage.setItem('todo', JSON.stringify(data));
}

function dataEl() {
	data = localStorage.getItem('todo');
}

let addTasks = () => {
	taxes.innerHTML += `
	<div class="tasks">
	<p class="task">${(dateEl.textContent = text.value)}</p>
	<p class="date">${(taskEl.textContent = dateEls.value)}</p>
	<p class="gym">${(gym.textContent = areaEl.value)}</p>
	<div class="icon">
	<img src="scss/edit.svg" width="30px" class="edit">
	<img src="scss/trash-alt.svg" width="30px" class="delete">
	</div>
	</div>
	`;
	inputEl.value = '';
	areaEl.value = '';
	dateEls.value = '';
};

/*

! checking weather the div with the class taxes contains a specific class then if yes then we add an eventlistener to it

 */

const toastBtn = document.querySelector('.toastBtn');

const showMessage = () => {
	toastBtn.classList.add('hide');

	setTimeout(() => {
		toastBtn.classList.remove('hide');
	}, 9000);
};

const editTask = (e) => {
	if (e.target.classList.contains('edit')) {
		confirm('you are about to edit your task');
		e.target.parentElement.parentElement.remove();
		areaEl.value = gym.textContent;
		dateEls.value = taskEl.textContent;
		text.value = dateEl.textContent;
		openModal();
	}
};
function deleteTask(e) {
	if (e.target.classList.contains('delete')) {
		console.log('clicked the delete button');
		confirm('are you sure you want to delete this task?????????');
		e.target.parentElement.parentElement.remove();
		const toastBtn = document.querySelector('.toastBtn');
		toastBtn.innerHTML = `
 					<p>your task was successfully deleted
                    <img src="check-double.svg">
                </p>
		`;
		showMessage();
	}
}

//  ! starting the appliction with the button

const starttodo = () => {
	alert(
		'please delete the first task before adding any task or just click the clear all button',
	);
	wrrapper.classList.add('active');
};

/**
 *
 * ! the home screen pop up display with thw image on it
 *
 */

const thanksModalOpen = () => {
	if (!thanks.classList.contains('activeE')) {
		thanks.classList.add('activeE');
		overlay.classList.add('hidden');
	}
};

/**
 * ! clearing all the tasks in the display
 *
 */

const clearBtn = id('clear');
const clearTaskAll = () => {
	if (taxes.innerHTML === '') {
		confirm('no tasks to clear');
	} else {
		clearBtn.style.display = 'block';
		alert('are you are about to clear all tasks');
		taxes.innerHTML = '';
	}
};

/**
 *
 * ! adding eventlistener to the form, buttons, and pop up
 *
 */
btn.addEventListener('click', starttodo);
closeEl.addEventListener('click', openModal);
xmark.addEventListener('click', closeModal);
closeBtn.addEventListener('click', closeModal);
form.addEventListener('submit', addTaskEl);
taxes.addEventListener('click', deleteTask);
taxes.addEventListener('click', editTask);
header.addEventListener('click', openModal);
thanksModal.addEventListener('click', thanksModalOpen);
clearBtn.addEventListener('click', clearTaskAll);
