const createTask = (text, parentProjectName) => {
    /**Returns object representing task.
     * 
     * Args:
     *  text (string) : Main text of the task.
     *  parentProject (string) : Name of the project task belongs to.*/
    let isDone = false;
    let id = 'task_' + Math.random().toString(36).substr(2, 9);
    return { text, parentProjectName, isDone, id }
}

export { createTask }