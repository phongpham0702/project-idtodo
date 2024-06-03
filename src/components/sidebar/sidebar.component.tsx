import "../../assets/styles/SideBarStyle/sidebar.css"
import { IconMap } from "../../constant/IconMap";
import SideBarTab from "./tab.component";



const SideBar = () => {

    return (

        <div className="sidebar">
            <div className="sidebar-header">
                Sidebar Header
            </div>
            <div className="sidebar-body">
                <SideBarTab tabName="cac" tabIcon={IconMap.taskIcon} />
                <SideBarTab tabName="Today's Tasks" tabIcon={IconMap.todayTaskIcon} />
                <SideBarTab tabName="Important Tasks" tabIcon={IconMap.importantTaskIcon} />
                <SideBarTab tabName="Completed Tasks" tabIcon={IconMap.completeTaskIcon} />
                <SideBarTab tabName="Uncompleted Tasks" tabIcon={IconMap.uncompleteTaskIcon} />
            </div>

            <div className="sidebar-footer">
                SideBar Footer
            </div>

        </div>

    )

}


export default SideBar;