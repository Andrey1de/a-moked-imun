export interface ISiteJson {
    siteId: number;// 2,
    name: string;//  אפקון תגבור,
    address?: string;// אלכסנדר ינאי 1,
    phone?: string;
    nwatches?: number;
    
       //name: string;
   // watchStrArr: string[];[7][[beg.end]]
    watchPlan:number[][][];



    //mileStones: IGanttChartMileStone[];
};
// "watchPlan": [
//         [[6.5,14.5],[14.5,22.5],[22.5,6.5]],
//         [[6.5,14.5],[14.5,22.5],[22.5,6.5]],
//         [[6.5,14.5],[14.5,22.5],[22.5,6.5]],
//         [[6.5,14.5],[14.5,22.5],[22.5,6.5]],
//         [[6.5,14.5],[14.5,22.5],[22.5,6.5]],
//         [[6.5,14.5],[14.5,22.5],[22.5,6.5]],
//         [[6.5,14.5],[14.5,22.5],[22.5,6.5]]
//     ]
 
