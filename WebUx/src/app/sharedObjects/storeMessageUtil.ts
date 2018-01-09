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
        if (store)
        {
            try {
                
                const message = store;
                if (message && message.data && message.data.type)            
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
    }
    
    