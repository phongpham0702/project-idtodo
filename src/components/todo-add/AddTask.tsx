"use client";

import { AiOutlinePlus } from 'react-icons/ai';

import Modal from './Modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addTask } from '../../store/Tasks.store';
import { TaskType } from '../../interfaces/TaskType';
import { openModal } from '../../store/modal.store';
import api from '../data/api';


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


    const addTaskHandler = async (task: TaskType) => {
        try {
            await api.post<TaskType>('/tasks', task);
            dispatch(addTask(task));
        } catch (error) {
            console.error('Failed to save task', error);
        }
    }
    
    


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
