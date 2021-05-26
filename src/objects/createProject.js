const createProject = (name) => {
    /**Returns object representing a project.
     * 
     * Args:
     *  name (string) : Name of the project.*/
    let id = 'project_' + Math.random().toString(36).substr(2, 9);
    let tasks = []
    
    const addTask = (task) => {
        /**Pushes a task object into the project's tasks array.*/
        tasks.push(task); 
    }

    return { name, id, tasks, addTask }
}

export { createProject }