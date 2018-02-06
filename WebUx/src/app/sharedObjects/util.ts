export function getCurrentDateAsString()
{  
    let today = new Date().toISOString().slice(0, 10);
    return today;  
}

export function getTargetDate(targetDate : Date)
{  
    let target = targetDate.toISOString().slice(0, 10);
    return target;  
}


