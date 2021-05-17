import { localStorageConfig } from '../localStorageConfig.js';

const projectsButton = (() => {
    /**Projects dropdown button found on the card placed top-most on page.*/
    const _getDropdownItem = (projectName) => {
        /**Returns a node with link to a project in user's localStorage. Meant
         * to be placed in "Projects" button dropdown menu.
         * 
         * Args:
         *  projectName (string): Name of the project to be displayed.*/
        let aNode = document.createElement('a');
        aNode.classList.add('dropdown-item');
        aNode.innerHTML = projectName;

        let liNode = document.createElement('li');
        liNode.appendChild(aNode);

        return liNode;
    }

    const _getNoProjectsNode = () => {
        /**Returns .dropdown-header li node with textContent "No projects."*/
        let noProjectsNode = document.createElement('li');
        noProjectsNode.classList.add('dropdown-header');
        noProjectsNode.textContent = 'No projects.';
        return noProjectsNode;
    }

    const _setUpDropdownMenu = () => {
        /**Fills "Projects" button dropdown menu with nodes containing links 
         * to user's stored projects.*/
        let projectsDropdown = document.querySelector(
            '#projectsButtonDropdownItems');
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

    _setUpDropdownMenu();
})();

export { projectsButton }