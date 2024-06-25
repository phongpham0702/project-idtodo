import React from 'react';
import { TaskType } from "../../interfaces/TaskType";
import EditIcon from "../../assets/icons/edit-task.svg";
import { useAppDispatch } from "../../store/hooks";
import { editTask } from '../../store/Tasks.store';
import { useState } from 'react';
import ModalContent from '../todo-add/ModalContent';
import api from '../data/api';

type editBtnProps = {
    task: TaskType
}


const EditTaskBtn: React.FC<editBtnProps> = ({ task }) => {
    const dispatch = useAppDispatch();
    const [modalEditTaskOpen, setModalEditTaskOpen] = useState<boolean>(false);
    const editTaskHandler = async (task: TaskType) => {
        try{
            await api.put(`/tasks/${task.id}`, task);
            dispatch(editTask(task))
        }
        catch(error){
            console.error('Failed to update task', error);
        }
    }

    return (
        <>
            <img src={EditIcon} alt=""
                className="icon"
                onClick={() => setModalEditTaskOpen(true)}
            />

            {modalEditTaskOpen
                &&
                <dialog id="my_modal_3" className={`modal modal-open`}>
                    <div className="modal-box">
                        <button
                            onClick={() => setModalEditTaskOpen(false)}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >
                            ✕
                        </button>
                        <ModalContent task={task} nameForm="Edit task" onConfirm={editTaskHandler} onClose={() => setModalEditTaskOpen(false)} >
                        </ModalContent>
                    </div>
                </dialog>
                
            }
        </>
    )
}

export default EditTaskBtn;
