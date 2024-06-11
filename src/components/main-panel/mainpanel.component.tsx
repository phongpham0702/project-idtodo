import "../../assets/styles/MainPanelStyle/main-panel.css"
import Header from "../header/header.component";
import TaskPanel from "./taskpanel.component";
import TaskContainer from "../task-container/TaskContainer";
type propsType = {
    tabId: number;
}

const MainPanel = ({tabId}: propsType) => {

    return(
        <div className="main-panel">
            <Header/>
            {/* <TaskPanel contentId={tabId}/> */}
            <TaskContainer tabId={tabId}/>
        </div>
    )

}


export default MainPanel;