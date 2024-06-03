
export default function calculateTime(startTimeRequest: Date) { 
    const timeDifference: number = new Date().getTime() - startTimeRequest.getTime();
    let minutes = Math.round(timeDifference / (1000 * 60));
    let hours = 0;
    if (minutes > 60) { 
        hours = Math.floor(minutes / 60);
        minutes = minutes - (hours * 60);
    }
    return {
        hours,
        minutes
    } 
}