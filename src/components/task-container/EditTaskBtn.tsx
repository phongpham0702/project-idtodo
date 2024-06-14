import React from 'react';
import { TaskType } from "../../interfaces/TaskType";
import EditIcon from "../../assets/icons/edit-task.svg";
import { useAppDispatch } from "../../store/hooks";
import { editTask } from '../../store/Tasks.store';
import { useState } from 'react';
import ModalContent from '../todo-add/ModalContent';

type editBtnProps = {
    task: TaskType
}


const EditTaskBtn: React.FC<editBtnProps> = ({ task }) => {
    const dispatch = useAppDispatch();
    const [modalEditTaskOpen, setModalEditTaskOpen] = useState<boolean>(false);
    const editTaskHandler = (task: TaskType) => {
        dispatch(editTask(task))
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
                        <ModalContent task={task} nameForm="edit task" onConfirm={editTaskHandler} onClose={() => setModalEditTaskOpen(false)} >
                        </ModalContent>
                    </div>
                </dialog>
                
            }
        </>
    )
}

export default EditTaskBtn;
