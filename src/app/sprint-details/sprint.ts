// To parse this data:
//
//   import { Convert } from "./file";
//
//   const sprintDetails = Convert.toSprintDetails(json);

export interface SprintDetail {
    endDate:          string;   
    goal:             null;     
    id:               string;   
    name:             string;   
    originBoardId:    number;   
    self:             string;   
    startDate:        string;   
    state:            string;   
    timeChart:        Array<ResourseTimeChart>;
    totalStoryPoints: number;   
}
export interface ResourseTimeChart
{
    resourseName :string;
    timeChart :TimeChart;
    totalSpent:number;
}
export interface TimeChart
{
    remaining :number;
    originalEstimated :number;
    totalSpent:number;
}

export interface IndividualStoryPoints{
    resourseName: string;
    storyPointsAssigned: number;
}
// export interface myType {
//     name : myType2;
// }

// export interface myType2 {
//     originalEstimated: number;
//     remaining:         number;
//     totalSpent:        number;
// }
