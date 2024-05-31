import "../../assets/styles/SideBarStyle/tab.css"
import { IconMap } from "../../constant/IconMap"
const SideBarTab = (
    {
        tabName = "unknown",
        tabIcon = IconMap.taskIcon
    }:
    {
        tabName: string,
        tabIcon: string
    }
) => {

    return(

        <div className="sidebar-tab">

            <img src={tabIcon}/>
            <span>
                {tabName}
            </span>
            
        </div>

    )

}


export default SideBarTab;