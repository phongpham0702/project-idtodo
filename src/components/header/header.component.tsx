import "../../assets/styles/HeaderStyle/header.css"
import { Input} from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const Header = () => {

    
    return(
        <header>

            <div className="option-content flex">
                <button type="button" className="bg-main-blue hover:bg-[#4096ff] rounded-lg h-10 px-2.5 cursor-pointer text-white">
                    Add new task
                </button>
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