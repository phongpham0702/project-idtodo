import { useState, useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import { TaskType } from "../interfaces/TaskType";

const useSearchQuerry = () => {
    const tasks = useAppSelector((state) => state.tasks);

    const searchQuerry = useAppSelector((state) => state.searchQuerry.searchQuerry);

    const [matchedTasks, setMatchedTasks] = useState<TaskType[]>([]);

    useEffect(() => {
        const filteredTasks = tasks.filter((task) => {
            return task.title.toLowerCase().includes(searchQuerry.toLowerCase());
        });
        if(searchQuerry.trim().length){
            setMatchedTasks(filteredTasks);
        }else{
            setMatchedTasks([]);
        }
    },[tasks, searchQuerry]);

    return matchedTasks;
}

export default useSearchQuerry;