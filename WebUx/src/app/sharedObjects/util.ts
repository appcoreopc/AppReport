export function getCurrentDateAsString()
{  
    let today = new Date().toDateString().slice(0, 10);
    return today;  
}

export function getTargetDate(targetDate : Date)
{  
    let target = targetDate.toDateString().slice(0, 10);
    return target;  
}


