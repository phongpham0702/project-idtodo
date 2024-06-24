import "../../assets/styles/TaskContainer/Task.css";
import CalendarIcon from "../../assets/icons/calendar.svg";
import ImportantTaskIcon from "../../assets/icons/important-star.svg";
import UnimportantTaskIcon from "../../assets/icons/unimportant-task.svg";
import DeleteIcon from "../../assets/icons/trash-bin.svg";
import EditTaskBtn  from "./EditTaskBtn.tsx";
import { useState} from "react";
import { Modal } from 'antd';
import { TaskType } from "../../interfaces/TaskType";
export default function Task(
    {
        task,
        display,
        deleteTask,
        changeImportant,
        changeProgress
    }: 
    {   
        task: TaskType,
        display: string,
        deleteTask: () => void,
        changeImportant: () => void,
        changeProgress: () => void
    }
) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
      deleteTask();
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };


    return (
        <div>
            
            <div className={display !== "row" ?  "task isCard" : "task isRow"}>
                
                <div className="task-main-info">
                    <div className="task-title">{task.title}</div>
                    
                    <div className="task-desciption">{task.description}</div>
                    
                    <div className="task-date">
                        <img src={CalendarIcon} alt="" className="icon" />
                        {task.date}
                    </div>
                </div>

                <div className="task-others-info">
                    {task.isComplete ? 
                        <div className="complete-tag cursor-pointer" onClick={changeProgress}>
                            completed
                        </div> :
                        <div className="uncomplete-tag cursor-pointer" onClick={changeProgress}>
                            uncompleted
                        </div>
                    }

                    <div className="other-action">
                        <img src={task.isImportant ? ImportantTaskIcon : UnimportantTaskIcon} 
                            alt=""
                            className="icon" 
                            onClick={changeImportant}
                        />

                        <img src={DeleteIcon} alt="" 
                            className="delete-task icon"
                            onClick={showModal}
                        />

                        <EditTaskBtn task={task}></EditTaskBtn> 
                    </div>
                </div>
            </div>
                
            <Modal 
                title="Delete Task" 
                open={isModalOpen} 
                style={{ top: '50%' }}
                onOk={handleOk} 
                onCancel={handleCancel}
                okButtonProps={{ style: { backgroundColor: 'red' } }}
            >    
            </Modal>

        </div>
    );
}