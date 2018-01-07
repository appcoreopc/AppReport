    export function getMessage(store : any , targetMessageType : string)
    {          
        try {                 
            
            for (var property in store)
            {          
                var messageValue = store[property];
                if (messageValue)
                {
                    if (messageValue.data.type == targetMessageType)
                    { 
                        return messageValue;
                    }            
                }      
            }    
        }
        catch (e)
        {
            console.log(e);
        }   
    }
    
    
    export function handleMessage(store : any, messageType : string)
    {        
        try {
            const message = store;
            if (message)            
            {                      
                switch (message.data.type) {
                    case messageType:  
                    return { data : message.data.data, type : messageType};    
                }
            }
        }
        catch (e)
        {
            console.log(e);
        }
    }
    