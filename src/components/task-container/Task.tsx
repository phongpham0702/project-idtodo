import "../../assets/styles/TaskContainer/Task.css";
import CalendarIcon from "../../assets/icons/calendar.svg";
import ImportantTaskIcon from "../../assets/icons/important-star.svg";
import UnimportantTaskIcon from "../../assets/icons/unimportant-task.svg";
import DeleteIcon from "../../assets/icons/trash-bin.svg";
import EditIcon from "../../assets/icons/edit-task.svg";

export default function Task(
    {
        title, 
        description, 
        date, 
        isImportant, 
        isComplete,
        display,
        deleteTask,
        changeImportant,
        changeProgress
    }: 
    {
        title: string,
        description: string,
        date: string,
        isImportant: boolean,
        isComplete: boolean,
        display: string,
        deleteTask: () => void,
        changeImportant: () => void,
        changeProgress: () => void
    }
) {
    return (
        <div className={display !== "row" ?  "task isCard" : "task isRow"}>
            
            <div className="task-title">{title}</div>
            
            <div className="task-desciption">{description}</div>
            
            <div className="task-date">
                <img src={CalendarIcon} alt="" className="icon" />
                {date}
            </div>

            <div className="task-others-info">
                {isComplete ? 
                    <div className="complete-tag" onClick={changeProgress}>
                        completed
                    </div> :
                    <div className="uncomplete-tag" onClick={changeProgress}>
                        uncompleted
                    </div>
                }

                <div className="other-action">
                    <img src={isImportant ? ImportantTaskIcon : UnimportantTaskIcon} 
                        alt=""
                        className="icon" 
                        onClick={changeImportant}
                    />

                    <img src={DeleteIcon} alt="" 
                        className="delete-task icon"
                        onClick={deleteTask}
                    />

                    <img src={EditIcon} alt="" 
                        className="icon"
                    />
                </div>
            </div>
        </div>
    );
};