"use client";

import { AiOutlinePlus } from 'react-icons/ai';
import { FormEventHandler, useState } from 'react';
import Modal_addTask from './Modal_addTask';
import InputCheckbox from './InputCheckbox';
import CompleteCheckbox from './CompletedCheckbox';


type TaskType = {
    title: string;
    description: string;
    date: string;
    isImportant: boolean;
    isComplete: boolean;
};
type AddTaskProps = {
    tasks: TaskType[];
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddTask: React.FC<AddTaskProps> = ({ tasks, setTasks, modalOpen, setModalOpen }) => {
    
    const [newTaskValue, setNewTaskValue] = useState<string>('');
    const [taskDescription, setTaskDescription] = useState<string>('');
    const [taskDate, setTaskDate] = useState<string>('');
    const [isImportant, setIsImportant] = useState<boolean>(false);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const newTasks = [...tasks];
        
        newTasks.push({
            title: newTaskValue,
            description: taskDescription,
            date: formatDate(taskDate),
            isImportant: isImportant,
            isComplete: isCompleted,
        }
        );
        setTasks(newTasks);
        setNewTaskValue('');
        setTaskDescription('');
        setTaskDate('');
        setIsImportant(false);
        setIsCompleted(false);
        setModalOpen(false); // Close the modal after submitting the form
    };


    function formatDate(date: string) {
        const dd = date.split('-')[1];
        const mm = date.split('-')[2];
        const yyyy = date.split('-')[0];

        const formattedDate = dd + '/' + mm + '/' + yyyy;
        return formattedDate;
    }

    return (
        <div>
            <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">
                Add New Task
                <AiOutlinePlus className='ml-2' size={18} />
            </button>
            <Modal_addTask modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handleSubmitNewTodo} className="space-y-4">
                    <h3 className='font-bold text-lg'>Add new task</h3>
                    <div className='form-control'>
                        <label htmlFor="task-title" className="label">Title</label>
                        <input
                            type="text"
                            placeholder="Type here"
                            value={newTaskValue}
                            onChange={(e) => setNewTaskValue(e.target.value)}
                            className="input input-bordered w-full"
                            id="task-title"
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="task-date" className="label">Date</label>
                        <input
                            type="date"
                            value={taskDate}
                            onChange={(e) => setTaskDate(e.target.value)}
                            className="input input-bordered w-full"
                            id="task-date"
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="task-description" className="label">Description</label>
                        <textarea
                            placeholder="Type here"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            className="textarea textarea-bordered w-full"
                            id="task-description"
                        />
                    </div>

                    <InputCheckbox
                        isChecked={isImportant}
                        setChecked={setIsImportant}
                        label="Mark as important"
                    />
                    <CompleteCheckbox
                        isCompleted={isCompleted}
                        setCompleted={setIsCompleted}
                        label="Mark as Completed"
                    />
                    <div className='modal-action'>
                        <button type="submit" className="btn btn-primary w-full rounded-full">Submit</button>
                    </div>
                </form>
            </Modal_addTask>
        </div>
    );
};

export default AddTask;
