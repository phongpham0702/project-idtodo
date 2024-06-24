"use client";

import { AiOutlinePlus } from 'react-icons/ai';
import Modal from './Modal';
import { useAppDispatch } from '../../store/hooks';
import { addTask } from '../../store/Tasks.store';
import { TaskType } from '../../interfaces/TaskType';
import { openModal } from '../../store/modal.store';


const AddTask: React.FC<{}> = () => {

    const dispatch = useAppDispatch();

    const addTaskHandler = (task: TaskType) => {
        dispatch(addTask(task));
    }
    
    


    return (
        <div>
            <button onClick={() => dispatch(openModal())} className="btn btn-primary w-full">
                Add New Task
                <AiOutlinePlus className='ml-2' size={18} />
            </button>
            <Modal onConfirm={addTaskHandler}>
            </Modal>
        </div>
    );
};

export default AddTask;
