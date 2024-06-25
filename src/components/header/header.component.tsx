import "../../assets/styles/HeaderStyle/header.css"
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import AddTask from "../todo-add/AddTask";
import { useAppSelector, useAppDispatch} from "../../store/hooks";
import { setSearchQuerry } from "../../store/searchQuerry.store";
import checkIncludes from "../../utilities/checkIncludes";
const { Search } = Input;

type HeaderProps = {
};

const Header: React.FC<HeaderProps> = () => {


    const dispatch = useAppDispatch();

    const tasks = useAppSelector((state) => state.tasks);

    const onSearch: SearchProps['onSearch'] = (value, _e) => {dispatch(setSearchQuerry(value)); if(!checkIncludes(tasks,value))  alert("task not found")};


    return (

        <header>

            <div className="option-content flex">
                <AddTask />
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