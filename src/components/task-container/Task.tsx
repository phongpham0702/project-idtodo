import "../../assets/styles/TaskContainer/Task.css";
import CalendarIcon from "../../assets/icons/calendar.svg";
import ImportantTaskIcon from "../../assets/icons/important-star.svg";
import UnimportantTaskIcon from "../../assets/icons/unimportant-task.svg";
import DeleteIcon from "../../assets/icons/trash-bin.svg";
import EditIcon from "../../assets/icons/edit-task.svg";
import { useState } from "react";
import { Modal, Input, DatePicker, Checkbox } from 'antd';
import dayjs from 'dayjs';
import InputCheckbox from '../../components/todo-add/InputCheckbox'; // Adjust the import path based on your project structure


interface TaskProps {
  id: string;
  title: string;
  description: string;
  date: string;
  isImportant: boolean;
  isComplete: boolean;
  display: string;
  deleteTask: () => void;
  changeImportant: () => void;
  changeProgress: () => void;
  updateTask: (id: string, updatedTask: TaskType) => void;
}

const Task: React.FC<TaskProps> = ({
  id,
  title,
  description,
  date,
  isImportant,
  isComplete,
  display,
  deleteTask,
  changeImportant,
  changeProgress,
  updateTask
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editDate, setEditDate] = useState(dayjs(date, 'DD/MM/YYYY'));
  const [editIsImportant, setEditIsImportant] = useState(isImportant);
  const [editIsCompleted, setEditIsCompleted] = useState(isComplete); // State for marking task as completed

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteOk = () => {
    setIsDeleteModalOpen(false);
    deleteTask();
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const showEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleEditOk = () => {
    setIsEditModalOpen(false);
    const updatedTask = {
      id,
      title: editTitle,
      description: editDescription,
      date: editDate.format('DD/MM/YYYY'),
      isImportant: editIsImportant,
      isComplete: editIsCompleted // Update isComplete based on edited state
    };
    updateTask(id, updatedTask);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div>
      <div className={display !== "row" ? "task isCard" : "task isRow"}>
        <div className="task-title">{title}</div>
        <div className="task-description">{description}</div>
        <div className="task-date">
          <img src={CalendarIcon} alt="calendar icon" className="icon" />
          {date}
        </div>

        <div className="task-others-info">
          {editIsCompleted ? (
            <div className="complete-tag cursor-pointer" onClick={changeProgress}>
              completed
            </div>
          ) : (
            <div className="uncomplete-tag cursor-pointer" onClick={changeProgress}>
              uncompleted
            </div>
          )}

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
