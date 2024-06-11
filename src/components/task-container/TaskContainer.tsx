import "../../assets/styles/TaskContainer/TaskContainer.css";
import Task from "./Task";
import TaskDisplayRowIcon from "../../assets/icons/task-display-row.svg";
import TaskDisplayRowBlueIcon from "../../assets/icons/task-display-row-blue.svg";
import TaskDisplayCardIcon from "../../assets/icons/task-display-card.svg";
import TaskDisplayCardBlueIcon from "../../assets/icons/task-display-card-blue.svg";
import { useState } from "react";
import {TaskType} from "../../interfaces/TaskType";

type TaskContainerProps = {
    tasks: TaskType[];
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
    SetModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TaskContainer: React.FC<TaskContainerProps> = ({ tasks, setTasks, SetModalOpen }) => {
    const [display, setDisplay] = useState("card");
    const handleDisplayChange = (value: string) => {
        setDisplay(value);
    }

    const handleDeleteTask = (index: number) => {
        const newTasks = [...tasks];
      
        newTasks.splice(index, 1);
        setTasks(newTasks);
    }

    const handleChangeImportant = (index: number) => {
        const newTasks = [...tasks];
        newTasks[index].isImportant = !newTasks[index].isImportant;
        setTasks(newTasks);
    }

    const handChangeProgress = (index: number) => {
        const newTasks = [...tasks];
        newTasks[index].isComplete = !newTasks[index].isComplete;
        setTasks(newTasks);
    }


    return (
        <div className="task-container">

            <p className="total-task-count">All task ({tasks.length} tasks)</p>

            <div className="task-controls">
                <div className="task-display-controls">
                    <div className="task-display-option">
                        <img
                            src={display !== "card" ? TaskDisplayRowBlueIcon : TaskDisplayRowIcon}
                            alt=""
                            className="icon"
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
                </div>

                <div className="task-sorting-controls">
                    {/* Thêm các phần tử và logic cho controls sắp xếp nếu cần */}
                </div>
            </div>

            <div className={display !== "row" ? "task-list" : "task-list-row"}>
                {tasks.map((task, index) => (
                    <Task
                        key={index}
                        title={task.title}
                        description={task.description}
                        date={task.date}
                        isImportant={task.isImportant}
                        isComplete={task.isComplete}
                        display={display}
                        deleteTask={() => handleDeleteTask(index)}
                        changeImportant={() => handleChangeImportant(index)}
                        changeProgress={() => handChangeProgress(index)}
                    />
                ))}

                <div className="add-task-box" onClick={()=> SetModalOpen(true)}>
                    Add new task
                </div>
            </div>
        </div>
    );
}

export default TaskContainer;