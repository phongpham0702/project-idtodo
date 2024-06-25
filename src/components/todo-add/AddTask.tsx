"use client";

import { AiOutlinePlus } from 'react-icons/ai';
import { FormEventHandler, useState, useEffect } from 'react';
import Modal_addTask from './Modal_addTask';
import InputCheckbox from './InputCheckbox';
import CompleteCheckbox from './CompletedCheckbox';
import { TaskType } from '../../interfaces/TaskType';
import api from '../../components/data/api';

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

  useEffect(() => {
    api.get<TaskType[]>('/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks', error);
      });
  }, [setTasks]);

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const newTask: Omit<TaskType, 'id'> = {
      title: newTaskValue,
      description: taskDescription,
      date: formatDate(taskDate),
      isImportant: isImportant,
      isComplete: isCompleted,
    };

    try {
      const response = await api.post<TaskType>('/tasks', newTask);
      setTasks([...tasks, response.data]);

      setNewTaskValue('');
      setTaskDescription('');
      setTaskDate('');
      setIsImportant(false);
      setIsCompleted(false);
      setModalOpen(false); // Close the modal after submitting the form
    } catch (error) {
      console.error('Failed to save task', error);
    }
  };

  function formatDate(date: string): string {
    const [yyyy, mm, dd] = date.split('-');
    return `${dd}/${mm}/${yyyy}`;
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
