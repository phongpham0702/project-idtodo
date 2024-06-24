import { TaskType } from "../interfaces/TaskType";
const checkIncludes = (tasks: TaskType[], value: string):Boolean => {
    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(value.toLowerCase()));
    return filteredTasks.length > 0 ? true : false;
}

export default checkIncludes;