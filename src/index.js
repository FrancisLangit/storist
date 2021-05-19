import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';

import { addProjectModal } from './objects/userInterface/addProjectModal.js';
import { addTaskModal } from './objects/userInterface/addTaskModal.js';
import { projectsButton } from './objects/userInterface/navigationCard.js';
import { tasksCard } from './objects/userInterface/tasksCard.js';

const settings = (() => {
    /**Settings of the web application.*/
    
    const _disableEnterButtonInInputs = () => {
        /**Disables usage of enter button in all input fields.*/
        let inputs = document.getElementsByTagName('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('keypress', () => {
                if (event.keyCode === 13) {
                    event.preventDefault();
                }
            });
        }
    }

    _disableEnterButtonInInputs();
})();