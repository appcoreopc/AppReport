    import { Store } from '@ngrx/store';
    import { CityAppState } from '../sharedObjects/sharedMessages';
    
    export function getMessage(store : any , targetMessageType : string)
    {          
        try {                 
            
            for (var property in store)
            {          
                var messageValue = store[property];
                if (messageValue && messageValue.data)
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
                if (message && message.data)            
                {                      
                    if (message.data.type)
                    {
                        switch (message.data.type) {
                            case messageType:  
                            return { data : message.data.data, type : messageType};    
                        }
                    }
                }
            }
            catch (e)
            {
                console.log(e);
            }
        }        
    }    
    
    export function getMultiMessage(store : any , messagesTypeToListen : string[])
    {         
        return extraMessageFromStore(store, messagesTypeToListen);       
    }
    
    export function extraMessageFromStore(store : Array<any> , messagesTypeToListen : string[]): Array<any>
    {         
        let messageList = new Array<any>();
        
        try {                 
            
            for (var idx in store)
            {          
                var messageValue = store[idx];
                if (messageValue && messageValue.type)
                {
                    if (messagesTypeToListen.indexOf(messageValue.type, 0) >= 0)
                    { 
                        messageList.push({data : messageValue, type : messageValue.type});                                 
                    }            
                }      
            }              
            return messageList;
        }
        catch (e)
        {
            console.log(e);
        }   
    }
    
    export function dispatchIntent(store : Store<CityAppState>, messageType : string, data? : any)
    {   
        store.dispatch(
            {     
                type: messageType,
                data : data
            });      
        }  
        
        
        