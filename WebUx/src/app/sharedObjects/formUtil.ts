
/*
Purpose : Handle form data binding 
// create non-binding form // 
// set value //
// keep original value // 
// if save => return the changed value 
// if cancel => return original value //
*/
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

export class FormUtil {

    _model : any; 
    _originalModel : any; 
    _form : FormGroup; 
    _formValidators : any;
        // pass in a model 
    constructor(model : any, formValidators : any)
    {        
        if (model && Object.keys(model).length  > 0)
        {
            this._originalModel = {...model};
            this._model = {...model};
        }
        else 
        throw "Unable to handle object type";       

        if (formValidators)
           this._formValidators = formValidators;
    }    
    
    createForm(blankForm : boolean):FormGroup
    {           
        debugger;
        this._form = new FormGroup({
           randomUniqueId: new FormControl()
         });
       
        if (this._model) {
            
            for (let objPropValue of Object.entries(this._model))
            {
                let key = objPropValue[0];
                let value = objPropValue[1];   
                if (blankForm)
                    this._form.addControl(key, new FormControl('')); 
                else 
                {
                    let controlValidators = this._formValidators[key];
                    if (controlValidators)
                    this._form.addControl(key, new FormControl(value, controlValidators)); 
                }
            }   
        }

        return this._form;
    }

    commit():any {

        return this._form.value;
    }

    cancel():any
    {
        return this._originalModel;
    }
}