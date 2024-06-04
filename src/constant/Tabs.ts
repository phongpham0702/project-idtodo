import { IconMap } from "./IconMap";
type TabObject = {
    id:number;
    tabName: string;
    tabIcon: string;
};
  
export const tabList: TabObject[] = [
    {id:1, tabName: "All Tasks", tabIcon: IconMap.taskIcon },
    {id:2, tabName: "Today's Tasks", tabIcon: IconMap.todayTaskIcon },
    {id:3, tabName: "Important Tasks", tabIcon: IconMap.importantTaskIcon },
    {id:4, tabName: "Completed Tasks", tabIcon: IconMap.completeTaskIcon },
    {id:5, tabName: "Uncompleted Tasks", tabIcon: IconMap.uncompleteTaskIcon },

];


