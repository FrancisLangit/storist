import { localStorageConfig } from '../localStorageConfig.js';
import { tasksCard } from './tasksCard.js';

const inboxButton = (() => {
    /**"Inbox" button found on navigation card.*/
    
    const toggleStyle = () => {
        /**Checks if 'btn-outline-secondary' in classList of inbox button 
         * node. Replaces such with 'btn-secondary' is so.*/
        let _inboxButtonNode = document.querySelector('#inboxButton');
        _inboxButtonNode.classList.toggle('btn-outline-secondary');
        _inboxButtonNode.classList.toggle('btn-secondary');
    }

    const _setUpInboxButton = () => {
        /**Adds event listener to inbox button. Makes the tasks card only show
         * user's inbox tasks.*/
        let _inboxButtonNode = document.querySelector('#inboxButton');
        _inboxButtonNode.addEventListener('click', () => {
            let isStyleActive = _inboxButtonNode.classList.contains(
                'btn-outline-secondary') 
            if (isStyleActive) {
                toggleStyle();
            }
            tasksCard.showInbox();
        });
    }

    toggleStyle();
    _setUpInboxButton();

    return { toggleStyle }
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
            inboxButton.toggleStyle();
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

    updateDropdownMenu();

    return { updateDropdownMenu }
})();

export { inboxButton, projectsButton }