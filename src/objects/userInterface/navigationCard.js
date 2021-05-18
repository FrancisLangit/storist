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
            let isStyleOutline = inboxButtonNode.classList.contains(
                'btn-outline-secondary') 
            if (isStyleOutline) {
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

    const _getDropdownItemLinkNode = (projectName) => {
        /**Returns styled "a" node with event listener that updates tasksCard, 
         * inboxButton, and projectsButton.
         * 
         * Args:
         *  projectName : Name of project that link node will represent.*/
        let aNode = document.createElement('a');
        aNode.classList.add('dropdown-item');
        aNode.innerHTML = projectName;

        aNode.addEventListener('click', () => {
            tasksCard.showProject(projectName);
            inboxButton.updateStyle();
            updateStyle(projectName);
        });

        return aNode;
    }

    const _getDropdownItemNode = (projectName) => {
        /**Returns a node with link to a project in user's localStorage.
         * 
         * Args:
         *  projectName (string): Name of the project to be displayed.*/
        let linkNode = _getDropdownItemLinkNode(projectName);
        let liNode = document.createElement('li');
        liNode.appendChild(linkNode);
        liNode.style.cursor = 'pointer';
        return liNode;
    }

    const _getDropdownItems = () => {
        /**Returns array of nodes to be appended to "Projects" button dropdown 
         * menu. Returns null if user has no projects stored.*/
        let projectObjects = (
            localStorageConfig.getLocalStorageAsObject().projects);
        if (projectObjects.length < 1) {
            return null;
        }
        return projectObjects.map(projectObject => {
            return _getDropdownItemNode(projectObject.name);
        });
    }

    const _getResetDropdownMenu = () => {
        /**Clears Projects button dropdown menu and returns node of such.*/
        let dropdownMenu = (
            document.querySelector('#projectsButtonDropdownItems'));
        dropdownMenu.innerHTML = '';
        return dropdownMenu;
    }

    const updateDropdownMenu = () => {
        /**Updates "Projects" button dropdown menu. If user has projects 
         * stored, fills such with nodes containing links to projects.*/
        let resetDropdownMenu = _getResetDropdownMenu();
        let dropdownItems = _getDropdownItems();

        if (!dropdownItems) {
            resetDropdownMenu.appendChild(_getNoProjectsNode());
        } else {
            for (let i = 0; i < dropdownItems.length; i++) {
                resetDropdownMenu.appendChild(dropdownItems[i]);
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