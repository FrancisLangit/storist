window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');

import { createProject } from '../createProject.js';
import { localStorageConfig } from '../localStorageConfig.js';

const addProjectModal = (() => {
    let _modalNode = new bootstrap.Modal(
        document.querySelector('#addProjectModal'));
    
    const _setUpAddProjectButton = () => {
        let addProjectButton = document.querySelector('#addProjectButton');
        addProjectButton.addEventListener('click', () => {
            let projectName = (
                document.querySelector('#addProjectInputName').value);
            let projectObj = createProject(projectName);
            localStorageConfig.pushProject(projectObj);
            console.log(localStorage.getItem('storist'));
        });
    }

    _setUpAddProjectButton();
})();