"use client";

import { AiOutlinePlus } from 'react-icons/ai';
import Modal from './Modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addTask } from '../../store/Tasks.store';
import { TaskType } from '../../interfaces/TaskType';
import { openModal } from '../../store/modal.store';
import api from '../data/api';


const AddTask: React.FC<{}> = () => {

    const dispatch = useAppDispatch();

    const addTaskHandler = async (task: TaskType) => {
        try {
            await api.post<TaskType>('/tasks', task);
            dispatch(addTask(task));
        } catch (error) {
            console.error('Failed to save task', error);
        }
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
