import { useEffect, useState } from "react";
import { green, red } from '@ant-design/colors';
import { Flex, Progress } from 'antd';
import "../../assets/styles/TaskContainer/TaskContainer.css";
import { Tasks } from "../../constant/Tasks";
import Task from "./Task";
import TaskDisplayRowIcon from "../../assets/icons/task-display-row.svg";
import TaskDisplayRowBlueIcon from "../../assets/icons/task-display-row-blue.svg";
import TaskDisplayCardIcon from "../../assets/icons/task-display-card.svg";
import TaskDisplayCardBlueIcon from "../../assets/icons/task-display-card-blue.svg";

export default function TaskContainer({tabId}: {tabId: number}) {
    const [display, setDisplay] = useState("card");
    const [tasks, setTasks] = useState(Tasks);
    const [completePercent, setCompletePercent] = useState(0);
    const [uncompletePercent, setUncompletePercent] = useState(0);

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

    

    useEffect(() => {
        switch(tabId) {
            case 1:
                setTasks(Tasks);
                break;
            case 2:
                const today = new Date();
                const day = String(today.getDate()).padStart(2, '0');
                const month = String(today.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-based month
                const year = today.getFullYear();
                const formattedDate = `${day}/${month}/${year}`;
                setTasks(Tasks.filter(task => task.date == formattedDate));
                break;
            case 3:
                setTasks(Tasks.filter(task => task.isImportant));
                break;
            case 4:
                setTasks(Tasks.filter(task => task.isComplete));
                break;
            case 5:
                setTasks(Tasks.filter(task => !task.isComplete));
                break;
        }

        const completedTasks = tasks.filter(task => task.isComplete);
        const uncompletedTasks = tasks.filter(task => !task.isComplete);
        const totalTasks = tasks.length;
        // Tính toán phần trăm hoàn thành của tất cả các task
        let percentComplete = completedTasks.length / totalTasks * 100;
        let percentUncomplete = uncompletedTasks.length / totalTasks * 100;

        setCompletePercent(percentComplete);
        setUncompletePercent(percentUncomplete);
        
    }, [tabId, tasks]);  // Thêm Tasks vào dependency array nếu cần

    return (
        <div className="task-container">

            <p className="total-task-count">All task ({Tasks.length} tasks)</p>
            
            <Flex gap="small" vertical>
                <Progress percent={completePercent} steps={10} strokeColor={green[6]}  />
                <Progress percent={uncompletePercent} steps={10} strokeColor={red[5]}  />
            </Flex>

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
        
            <div className={display !== "row" ?  "task-list" : "task-list-row"}>
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

                <div className="add-task-box">
                    Add new task
                </div>
            </div>
        </div>
    );
}
