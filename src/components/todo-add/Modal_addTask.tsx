import React from "react";

interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    children: React.ReactNode;
}

const Modal_addTask: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
    return (
        <dialog id="my_modal_3" className={`modal ${modalOpen ? "modal-open" : ""}`}>
            <div className="modal-box">
                <button
                    onClick={() => setModalOpen(false)}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                    ✕
                </button>
                {children}
            </div>
        </dialog>
    );
};

export default Modal_addTask;
