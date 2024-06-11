import "../../assets/styles/HeaderStyle/header.css"
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import AddTask from "../todo-add/AddTask";


const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);


type TaskType = {
    title: string;
    description: string;
    date: string;
    isImportant: boolean;
    isComplete: boolean;
};
type HeaderProps = {
    tasks: TaskType[];
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
    modalOpen: boolean;
    SetModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<HeaderProps> = ({ tasks, setTasks, modalOpen, SetModalOpen }) => {


    return (

        <header>

            <div className="option-content flex">
                <AddTask tasks={tasks} setTasks={setTasks} modalOpen={modalOpen} setModalOpen={SetModalOpen} />
            </div>

            <div className="search-content max-w-72">

                <Search placeholder="Search task"
                    className="w-full"
                    onSearch={onSearch}
                    enterButton
                    size="large"
                />
            </div>

        </header>
    )

}


export default Header;