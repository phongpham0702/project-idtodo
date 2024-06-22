import { useEffect, useState } from "react";
import { green, red } from '@ant-design/colors';
import { Flex, Progress } from 'antd';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeTask, toggleImportantTask, toggleTaskCompleted } from "../../store/Tasks.store";
import { openModal } from "../../store/modal.store";
import "../../assets/styles/TaskContainer/TaskContainer.css";
import Task from "./Task";
import TaskDisplayRowIcon from "../../assets/icons/task-display-row.svg";
import TaskDisplayRowBlueIcon from "../../assets/icons/task-display-row-blue.svg";
import TaskDisplayCardIcon from "../../assets/icons/task-display-card.svg";
import TaskDisplayCardBlueIcon from "../../assets/icons/task-display-card-blue.svg";
import { TaskType } from "../../interfaces/TaskType";


type TaskContainerProps = {
    tabId: number,
};


const TaskContainer: React.FC<TaskContainerProps> = ({ tabId }) => {

    const tasks = useAppSelector((state) => state.tasks);
    const dispatch = useAppDispatch();

    const [display, setDisplay] = useState("card");
    const [ableToDisplayRow, setAbleToDisplayRow] = useState(() => { return window.innerWidth >= 1048 });
    const [completePercent, setCompletePercent] = useState(0);
    const [uncompletePercent, setUncompletePercent] = useState(0);
    const handleDisplayChange = (value: string) => {
        setDisplay(value);
    }

    const handleDeleteTask = (id: string) => {
        dispatch(removeTask(id));
    }

    const handleChangeImportant = (id: string) => {
        dispatch(toggleImportantTask(id));
    }

    const handChangeProgress = (id: string) => {
        dispatch(toggleTaskCompleted(id));
    }

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
        let filteredTasks = filteringTask(tasks);

        const completedTasks = filteredTasks.filter(task => task.isComplete);
        const totalTasks = filteredTasks.length;
        // Tính toán phần trăm hoàn thành của tất cả các task
        let percentComplete = Math.floor(completedTasks.length / totalTasks * 100);
        let percentUncomplete = 100 - percentComplete;

        setCompletePercent(percentComplete);
        setUncompletePercent(percentUncomplete);

    }, [tabId, tasks]);  // Thêm Tasks vào dependency array nếu cần


    function filteringTask(tasks: TaskType[]) {
        switch (tabId) {
            case 1:
                return tasks;
            case 2:
                const today = new Date();
                //
                const day = String(today.getDate()).padStart(2, '0');
                //
                const month = String(today.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-based month
                //
                const year = today.getFullYear();

                const formattedDate = `${day}/${month}/${year}`;
                return (tasks.filter(task => task.date == formattedDate));
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
            <p className="total-task-count">All task ({filteringTask(tasks).length} tasks)</p>

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
                    {/* Thêm các phần tử và logic cho controls sắp xếp nếu cần */}
                </div>
            </div>

            <div className="task-container">
                <div className={display !== "row" ? "task-list" : "task-list-row"}>

                    {filteringTask(tasks).map((task, index) => (
                        <Task
                            key={index}
                            task={task}
                            display={display}
                            deleteTask={() => handleDeleteTask(task.id)}
                            changeImportant={() => handleChangeImportant(task.id)}
                            changeProgress={() => handChangeProgress(task.id)}
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