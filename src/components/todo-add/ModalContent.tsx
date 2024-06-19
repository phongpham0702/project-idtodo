import React, { useState } from 'react';    
import { TaskType } from '../../interfaces/TaskType';
import CompleteCheckbox from './CompletedCheckbox';
import InputCheckbox from './InputCheckbox';
import formatDate from '../../utilities/formatDate';
import toISODate from '../../utilities/toISODate';


type ModalContentProps = {
    task?: TaskType,
    onConfirm: (task: TaskType) => void;
    nameForm: string;
    onClose: () => void;
}

const ModalContent: React.FC<ModalContentProps> = ({task,onConfirm,nameForm,onClose}) => {


    const [newTaskValue, setNewTaskValue] = useState<string>(() => {
        if (task) {
            return task.title;
        }
        return "";
    });
    const [taskDescription, setTaskDescription] = useState<string>(() => {
        if(task) {
            return task.description;
        }
        return "";
    });
    const [taskDate, setTaskDate] = useState<string>(()=>{
        if(task){
            return toISODate(task.date);
        }
        return "";
    });

    const [isImportant, setIsImportant] = useState<boolean>(()=>{
        if(task){
            return task.isImportant;
        }
        return false;
    });
    const [isCompleted, setIsCompleted] = useState<boolean>(()=>{
        if(task){
            return task.isComplete;
        }
        return false;
    });



    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        task ? onConfirm({
            id: task.id,
            title: newTaskValue,
            description: taskDescription,
            date: formatDate(taskDate),
            isImportant: isImportant,
            isComplete: isCompleted
        }) : onConfirm({
            id: Math.random().toString(36).substring(2, 8),
            title: newTaskValue,
            description: taskDescription,
            date: formatDate(taskDate),
            isImportant: isImportant,
            isComplete: isCompleted
        })
        onClose();

        
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className='font-bold text-lg'>{nameForm}</h3>
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
                        <button type="submit" className="btn btn-primary w-full rounded-full">{nameForm}</button>
                    </div>
                </form>
    )
}

export default ModalContent;