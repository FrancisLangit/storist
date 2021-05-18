import { localStorageConfig } from '../localStorageConfig.js';
import { tasksCard } from './tasksCard.js';

const inboxButton = (() => {
    /**"Inbox" button found on navigation card.*/
    
    const updateStyle = () => {
        /**Replaces 'btn-secondary' with 'btn-dark' in classList of inbox 
         * button node.*/
        let inboxButtonNode = document.querySelector('#inboxButton');
        inboxButtonNode.classList.toggle('btn-outline-secondary');
        inboxButtonNode.classList.toggle('btn-dark');
    }

    const _setUpInboxButton = () => {
        /**Adds event listener to inbox button. Makes the tasks card only show
         * user's inbox tasks.*/
        let inboxButtonNode = document.querySelector('#inboxButton');
        inboxButtonNode.addEventListener('click', () => {
            let isStyleActive = inboxButtonNode.classList.contains(
                'btn-outline-secondary') 
            if (isStyleActive) {
                updateStyle();
                projectsButton.updateStyle();
            }
            tasksCard.showInbox();
        });
    }

    updateStyle();
    _setUpInboxButton();

    return { updateStyle }
})();

const projectsButton = (() => {
    /**Projects dropdown button found on navigation card.*/

    const _getNoProjectsNode = () => {
        /**Returns .dropdown-header li node with textContent "No projects."*/
        let noProjectsNode = document.createElement('li');
        noProjectsNode.classList.add('dropdown-header');
        noProjectsNode.textContent = 'No projects.';
        return noProjectsNode;
    }

    const _getDropdownItem = (projectName) => {
        /**Returns a node with link to a project in user's localStorage. Meant
         * to be placed in "Projects" button dropdown menu.
         * 
         * Args:
         *  projectName (string): Name of the project to be displayed.*/
        let aNode = document.createElement('a');
        aNode.classList.add('dropdown-item');
        aNode.innerHTML = projectName;
        aNode.addEventListener('click', () => {
            tasksCard.showProject(projectName);
            inboxButton.updateStyle();
            updateStyle(projectName);
        });

        let liNode = document.createElement('li');
        liNode.appendChild(aNode);
        liNode.style.cursor = 'pointer';

        return liNode;
    }

    const updateDropdownMenu = () => {
        /**Fills "Projects" button dropdown menu with nodes containing links 
         * to user's stored projects.*/
        let projectsDropdown = document.querySelector(
            '#projectsButtonDropdownItems');
        projectsDropdown.innerHTML = '';

        let projects = localStorageConfig.getLocalStorageAsObject().projects;
        if (projects.length <= 0) {
            projectsDropdown.appendChild(_getNoProjectsNode());
        } else {
            for (let i = 0; i < projects.length; i++) {
                let projectName = projects[i].name;
                let projectsDropdownItem = _getDropdownItem(projectName)
                projectsDropdown.appendChild(projectsDropdownItem);
            }
        }
    }

    const updateStyle = (projectName) => {
        /**Replaces 'btn-secondary' with 'btn-dark' in classList of project 
         * button node and updates its text.*/
        let projectsButton = document.querySelector('#projectsButton');
        projectsButton.classList.toggle('btn-outline-secondary');
        projectsButton.classList.toggle('btn-dark');

        if (projectName) {
            projectsButton.innerHTML = `Project: ${projectName}`;
        } else {
            projectsButton.innerHTML = 'Projects';
        } 
    }

    updateDropdownMenu();

    return { updateDropdownMenu, updateStyle }
})();

export { inboxButton, projectsButton }