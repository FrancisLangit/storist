const createProject = (name) => {
    /**Returns object representing a project.
     * 
     * Args:
     *  name (string) : Name of the project.*/
    let tasks = []
    
    const addTask = (task) => {
        /**Pushes a task object into the project's tasks array.*/
        tasks.push(task); 
    }

    return { name, tasks, addTask }
}

export { createProject }