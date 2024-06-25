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
    updateTask(id, updatedTask);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
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

          <div className="other-action flex flex-nowrap">
            <img
              src={isImportant ? ImportantTaskIcon : UnimportantTaskIcon}
              alt="importance icon"
              className="icon"
              onClick={changeImportant}
            />
            <img
              src={DeleteIcon}
              alt="delete icon"
              className="delete-task icon"
              onClick={showDeleteModal}
            />
            <img
              src={EditIcon}
              alt="edit icon"
              className="icon"
              onClick={showEditModal}
            />
          </div>
        </div>
      </div>

      <Modal
        title="Edit Task"
        visible={isEditModalOpen}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <form className="space-y-4">
          <h3 className='font-bold text-lg'>Edit task</h3>
          <div className='form-control'>
            <label htmlFor="task-title" className="label">Title</label>
            <Input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="input input-bordered w-full"
              id="edit-task-title"
            />
          </div>
          <div className='form-control'>
            <label htmlFor="edit-task-date" className="label">Date</label>
            <DatePicker
              value={editDate}
              onChange={(date) => setEditDate(date)}
              format='DD/MM/YYYY'
              className="input input-bordered w-full"
              id="edit-task-date"
            />
          </div>
          <div className='form-control'>
            <label htmlFor="edit-task-description" className="label">Description</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="textarea textarea-bordered w-full"
              id="edit-task-description"
              rows={4}
            />
          </div>

          {/* Replace Checkbox with InputCheckbox for marking as important */}
          <InputCheckbox
            isChecked={editIsImportant}
            setChecked={setEditIsImportant}
            label="Mark as important"
          />

          {/* Replace Checkbox with InputCheckbox for marking as completed */}
          <InputCheckbox
            isChecked={editIsCompleted}
            setChecked={setEditIsCompleted}
            label="Mark as completed"
          />
        </form>

      </Modal>

      <Modal
        title="Delete Task"
        visible={isDeleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        okButtonProps={{ style: { backgroundColor: 'red' } }}
      >
        <p>Are you sure you want to delete this task?</p>
      </Modal>
    </div>
  );
};

export default Task;
