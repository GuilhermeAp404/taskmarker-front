export const addDays = (date:Date, days:number):Date =>{
    let result = new Date(date)
    result.setDate(result.getDate() + days)

    return result;
}