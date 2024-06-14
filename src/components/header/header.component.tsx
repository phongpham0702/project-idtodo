import "../../assets/styles/HeaderStyle/header.css"
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import AddTask from "../todo-add/AddTask";


const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

type HeaderProps = {
};

const Header: React.FC<HeaderProps> = () => {


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