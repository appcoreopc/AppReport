export function getCurrentDateAsString()
{  
    let today = new Date().toDateString().slice(0, 10);
    return today;  
}

export function getTargetDate(dt : Date)
{  
    //let target = targetDate.toDateString().slice(0, 10); 
    var target = dt.getFullYear() + '-' + (((dt.getMonth() + 1) < 10) ? '0' : '') + (dt.getMonth() + 1) + '-' + ((dt.getDate() < 10) ? '0' : '') + dt.getDate();
    return target;  
}


