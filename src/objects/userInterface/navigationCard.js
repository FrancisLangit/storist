import { localStorageConfig } from '../localStorageConfig.js';
import { tasksCard } from './tasksCard.js';

const inboxButton = (() => {
    /**"Inbox" button found on navigation card.*/

    const setStyleAsFilled = () => {
        /**Replaces 'btn-outline-secondary' with 'btn-dark' in classList of 
         * inbox button node.*/
         let inboxButtonNode = document.querySelector('#inboxButton');
         inboxButtonNode.classList.remove('btn-outline-light');
         inboxButtonNode.classList.add('btn-light');
    }

    const setStyleAsOutline  = () => {
        /**Replaces 'btn-dark' with 'btn-outline-secondary' in classList of 
         * inbox button node.*/
        let inboxButtonNode = document.querySelector('#inboxButton');
        inboxButtonNode.classList.remove('btn-light');
        inboxButtonNode.classList.add('btn-outline-light');
    }


    const _setUpInboxButton = () => {
        /**Adds event listener to inbox button. Makes the tasks card only show
         * user's inbox tasks.*/
        let inboxButtonNode = document.querySelector('#inboxButton');
        inboxButtonNode.addEventListener('click', () => {
            let isStyleOutline = inboxButtonNode.classList.contains(
                'btn-outline-light')
            if (isStyleOutline) {
                setStyleAsFilled();
                projectsButton.updateStyle();
            }
            tasksCard.showInbox();
            tasksCard.toggleDeleteProjectButton(true);
        });
    }

    setStyleAsFilled();
    _setUpInboxButton();

    return { setStyleAsFilled, setStyleAsOutline }
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
            tasksCard.toggleDeleteProjectButton();
            inboxButton.setStyleAsOutline();
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
        /**Updates the styling of the button. Sets as filled or outline 
         * dependent on whether argument is passed.
         * 
         * Args:
         *  projectName (string) : Name of project to be displayed. */
        let projectsButton = document.querySelector('#projectsButton');
        if (projectName) {
            projectsButton.innerHTML = `Project: ${projectName}`;
            projectsButton.classList.remove('btn-outline-light');
            projectsButton.classList.add('btn-light');
        } else {
            projectsButton.innerHTML = 'Projects';
            projectsButton.classList.remove('btn-light');
            projectsButton.classList.add('btn-outline-light');
        } 
    }

    updateDropdownMenu();

    return { updateDropdownMenu, updateStyle }
})();

export { inboxButton, projectsButton }