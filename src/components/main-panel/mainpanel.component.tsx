import "../../assets/styles/MainPanelStyle/main-panel.css"
import Header from "../header/header.component";
import TaskPanel from "./taskpanel.component";

type propsType = {
    tabId: number;
}

const MainPanel = ({tabId}: propsType) => {

    return(
        <div className="main-panel">
            <Header/>
            <TaskPanel contentId={tabId}/>
            
        </div>
    )

}


export default MainPanel;