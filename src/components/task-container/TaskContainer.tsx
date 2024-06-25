import { useEffect, useState } from "react";
import { green, red } from '@ant-design/colors';
import { Flex, Progress } from 'antd';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeTask, toggleImportantTask, toggleTaskCompleted } from "../../store/Tasks.store";
import { openModal } from "../../store/modal.store";
import "../../assets/styles/TaskContainer/TaskContainer.css";
import Task from "./Task";

import { Tasks } from "../../constant/Tasks";

import TaskDisplayRowIcon from "../../assets/icons/task-display-row.svg";
import TaskDisplayRowBlueIcon from "../../assets/icons/task-display-row-blue.svg";
import TaskDisplayCardIcon from "../../assets/icons/task-display-card.svg";
import TaskDisplayCardBlueIcon from "../../assets/icons/task-display-card-blue.svg";
import { TaskType } from "../../interfaces/TaskType";

import api from '../../components/data/api'; // Import the API instance

import useSearchQuerry from "../../hooks/useSearchQuerry";
import api from "../data/api";


type TaskContainerProps = {
    tabId: number,
};



const TaskContainer: React.FC<TaskContainerProps> = ({ tabId }) => {

    const tasks = useAppSelector((state) => state.tasks);
    const matchedTasks = useSearchQuerry();
    const dispatch = useAppDispatch();
    const [display, setDisplay] = useState("card");
    const [ableToDisplayRow, setAbleToDisplayRow] = useState(() => { return window.innerWidth >= 1048 });
    const [completePercent, setCompletePercent] = useState(0);
    const [uncompletePercent, setUncompletePercent] = useState(0);

    const handleDisplayChange = (value: string) => {
        setDisplay(value);
    }


    const handleDeleteTask = async (id: string) => {
        try {
            await api.delete(`/tasks/${id}`);
            dispatch(removeTask(id));
        } catch (error) {
            console.error('Failed to delete task', error);
        }
    }

    const handleChangeImportant = async (task: TaskType) => {
        dispatch(toggleImportantTask(task.id));
        let newTask = { ...task, isImportant: !task.isImportant }
        await api.put(`/tasks/${task.id}`, newTask);
    }


    const handChangeProgress = async (task: TaskType) => {
        dispatch(toggleTaskCompleted(task.id));
        let newTask = { ...task, isComplete: !task.isComplete }
        await api.put(`/tasks/${task.id}`, newTask);
    }

    const handleUpdateTask = async (id: string, updatedTask: TaskType) => {
        try {
            await api.put(`/tasks/${id}`, updatedTask);
            const newTasks = tasks.map(task => task.id === id ? updatedTask : task);
            setTasks(newTasks);
        } catch (error) {
            console.error("Failed to update task", error);

    

    const handleWindowSizeChange = () => {

        if (window.innerWidth < 1048) {
            setDisplay("card");
            setAbleToDisplayRow(false);
        } else {
            setAbleToDisplayRow(true);
        }
    }

    useEffect(() => {

        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        }
    }, []);


    useEffect(() => {
        let filteredTasks = !(matchedTasks.length == 0) ? filteringTask(matchedTasks) : filteringTask(tasks);

        const completedTasks = filteredTasks.filter(task => task.isComplete);
        const totalTasks = filteredTasks.length;
        // Tính toán phần trăm hoàn thành của tất cả các task
        let percentComplete = Math.floor(completedTasks.length / totalTasks * 100);
        let percentUncomplete = 100 - percentComplete;

        setCompletePercent(percentComplete);
        setUncompletePercent(percentUncomplete);

    }, [tabId, tasks, matchedTasks]);  // Thêm Tasks vào dependency array nếu cần


    }, [tabId, tasks]);


    function filteringTask(tasks: TaskType[]) {
        switch (tabId) {
            case 1:
                return tasks;
            case 2:
                const today = new Date();
                const day = String(today.getDate()).padStart(2, '0');
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const year = today.getFullYear();
                const formattedDate = `${day}/${month}/${year}`;
                return tasks.filter(task => task.date === formattedDate);
            case 3:
                return (tasks.filter(task => task.isImportant));
            case 4:
                return (tasks.filter(task => task.isComplete));
            case 5:
                return (tasks.filter(task => !task.isComplete));
        }
        return tasks;
    }


    return (

        <>
            <p className="total-task-count">All task ({!(matchedTasks.length == 0) ? filteringTask(matchedTasks).length : filteringTask(tasks).length} tasks)</p>

            <Flex gap="small" vertical>
                <Progress percent={completePercent} steps={10} strokeColor={green[6]} />
                <Progress percent={uncompletePercent} steps={10} strokeColor={red[5]} status={(uncompletePercent === 100) ? "exception" : "normal"} />
            </Flex>
            <div className="task-controls">
                {ableToDisplayRow && (<div className="task-display-controls">
                    <div className="task-display-option">
                        <img
                            src={display !== "card" ? TaskDisplayRowBlueIcon : TaskDisplayRowIcon}
                            alt=""
                            className="icon row-icon"
                            onClick={() => handleDisplayChange("row")}
                        />
                    </div>
                    <div className="task-display-option">
                        <img
                            src={display === "card" ? TaskDisplayCardBlueIcon : TaskDisplayCardIcon}
                            alt=""
                            className="icon"
                            onClick={() => handleDisplayChange("card")}
                        />
                    </div>

                </div>)}
              
                <div className="task-sorting-controls">
                    {/* Add sorting controls if needed */}
                </div>
            </div>


            <div className="task-container">
                <div className={display !== "row" ? "task-list" : "task-list-row"}>

                    {filteringTask(!(matchedTasks.length == 0) ? (matchedTasks) : (tasks)).map((task, index) => (
                        <Task
                            key={index}
                            task={task}
                            display={display}
                            deleteTask={() => handleDeleteTask(task.id)}
                            changeImportant={() => handleChangeImportant(task)}
                            changeProgress={() => handChangeProgress(task)}
                        />
                    ))}


                    <div className="add-task-box" onClick={() => dispatch(openModal())}>

                        Add new task
                    </div>
                </div>
            </div>

        </>


    );
}

export default TaskContainer;
