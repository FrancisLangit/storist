import './styles/bootstrap.min.css'
import './styles/style.css'

import './bootstrap.bundle.min.js'

import { createTask } from './objects/createTask.js'
import { createProject } from './objects/createProject.js'
import { localStorageConfig } from './objects/localStorageConfig.js'

localStorageConfig.pushTask(createTask('Buy groceries.'));
localStorageConfig.pushTask(createTask('Do laundry.'));

const userInterfaceConfiguration = (() => {

    const createTaskNode = ((taskObject) => {
        let taskCheckBox = document.createElement('div');
        taskCheckBox.classList.add('task-checkbox');

        let taskText = document.createElement('div');
        taskText.classList.add('task-text');
        taskText.textContent = taskObject.text;

        let taskNode = document.createElement('div');
        taskNode.classList.add('task');
        taskNode.classList.add('card-text');
        taskNode.append(taskCheckBox, taskText);

        return taskNode;
    })

    const updateTasksDiv = () => {
        let tasksDiv = document.querySelector('#tasks');
        tasksDiv.innerHTML = '';

        let currentLocalStorage = (
            localStorageConfig.getLocalStorageAsObject());
        let inbox = currentLocalStorage['inbox'];

        tasksDiv.append(createTaskNode(inbox[1]));
    }

    updateTasksDiv();
})();

localStorage.clear();