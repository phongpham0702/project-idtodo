import React from "react";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { TaskType } from '../../interfaces/TaskType';
import { closeModal } from "../../store/modal.store";
import ModalContent from "./ModalContent";

interface ModalProps {
    task?: TaskType,
    onConfirm: (task: TaskType) => void;
}

const Modal: React.FC<ModalProps> = ({ task, onConfirm }) => {
    const modal = useAppSelector((state) => state.modal);
    const dispatch = useAppDispatch();

    return (
        (modal.isModalOpen === true) && <dialog id="my_modal_3" className={`modal modal-open`}>
            <div className="modal-box">
                <button
                    onClick={() => dispatch(closeModal())}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                    ✕
                </button>
                <ModalContent task={task} nameForm="Add task" onConfirm={onConfirm} onClose={()=> dispatch(closeModal())}></ModalContent>
            </div>
        </dialog>
    );
};

export default Modal;
