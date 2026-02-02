

interface IDateProvider{

    compareInHours(start_date:Date,end_date:Date):number;
    convertToUTC(date:Date): string;
    dateNow():Date;
    addDate(days:number):Date;
    compareInDate(start_date:Date, end_date:Date): number
    addHours(hours:number):Date

}

export {IDateProvider}