import "../../assets/styles/SideBarStyle/sidebar.css"
import { tabList } from "../../constant/Tabs";
import SideBarTab from "./tab.component";
import appLogo from "../../assets/icons/to-do-list.png";
import { useEffect, useRef, useState } from "react"
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
type propsType = {
    tabId: number;
    handleTabClick: (newTabId: number) => void;
}

const SideBar = ({ tabId, handleTabClick }: propsType) => {

    const [collapsed, setCollapsed] = useState(false);

    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const Sidebar = document.querySelector('.sidebar')
        const handleClickOutside = (e: any) => {
            if (window.innerWidth <= 768  && !collapsed && Sidebar && !Sidebar.classList.contains('minimize')) {
                if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
                    setCollapsed(true);
                }
            }
        }
        document.addEventListener('click', handleClickOutside);       

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [])

    return (

        <div ref={sidebarRef} className={`sidebar ${collapsed ? "minimize" : ""}`}>    
            <div className="sidebar-header">
                <div className="header-content">
                    <img src={appLogo} alt="Logo" />
                    <span>IDToDo</span>
                </div>
                {collapsed
                    ?
                    <div className="sidebar-toggle" onClick={() => {setCollapsed(false)}}>
                        <div className="visible">
                            <AiOutlineRight />
                        </div>
                        <div className="invisible"> 
                            <AiOutlineLeft />
                        </div>
                    </div>
                    :
                    <div className="sidebar-toggle" onClick={() => setCollapsed(true)}>
                        <div className="invisible">
                            <AiOutlineRight />
                        </div>
                        <div className="visible"> 
                            <AiOutlineLeft />
                        </div>
                    </div>
                }

            </div>
            <div className="sidebar-body">
                {
                    tabList.map((tab) => (
                        <div
                            key={tab.id}
                            className={`tab-container ${tabId === tab.id ? "active" : ""}`}
                            onClick={() => handleTabClick(tab.id)}
                        >
                            <SideBarTab tabName={tab.tabName} tabIcon={tab.tabIcon} />
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