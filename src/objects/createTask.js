const createTask = (text) => {
    /**Returns object representing task.
     * 
     * Args:
     *  text (string) : Main text of the task.*/
    let isDone = false;
    let id = 'task_' + Math.random().toString(36).substr(2, 9);
    return { text, isDone, id}
}

export { createTask }