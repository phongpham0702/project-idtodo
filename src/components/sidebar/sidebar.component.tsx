import "../../assets/styles/SideBarStyle/sidebar.css"
import { tabList } from "../../constant/Tabs";
import SideBarTab from "./tab.component";
import appLogo from "../../assets/icons/to-do-list.png";
import {useState} from "react"
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai"
type propsType = {
    tabId: number;
    handleTabClick: (newTabId:number) => void;
}

const SideBar = ({tabId, handleTabClick}:propsType) => {

    const [collapsed, setCollapsed] = useState(false);

    return(
        
        <div className={`sidebar ${collapsed ? "minimize":""}`}>
            <div className="sidebar-header">
                <div className="header-content">
                    <img src={appLogo} alt="Logo"/>
                    <span>IDToDo</span>
                </div>
                <div className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
                   {collapsed ? <AiOutlineRight/> : <AiOutlineLeft/>}
                   
                </div>
            </div>
            <div className ="sidebar-body">
                {
                    tabList.map((tab) => (
                       <div 
                       key={tab.id}
                       className={`tab-container ${tabId=== tab.id ? "active":""}`} 
                       onClick={() => handleTabClick(tab.id)}
                       >
                            <SideBarTab tabName = {tab.tabName} tabIcon={tab.tabIcon} />
                       </div>  
                    ))
                }
            </div>
            
            <div className="sidebar-footer">
                {
                    collapsed ?
                        <><span className="px-2 text-3xl">❤️</span></> 
                        :
                        <>
                            <div className="opacity-80">
                                Made with 
                                <span className="px-2">❤️</span>
                                by
                            </div>
                            <div>
                                IdTek Intern Group
                            </div>
                        </> 
                    
                }
            </div>

        </div>
        
    )

}


export default SideBar;