
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

export class FormUtil<T> {

    _model : any; 
    _originalModel : T; 
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
        let model = { ...this._model};
    
        if (model) {
            this.setFormWithModelValue(model, blankForm);     
        }

        return this._form;
    }

    private setFormWithModelValue(model : T, blankForm? : boolean)
    {

        this._form = new FormGroup({
            randomUniqueId: new FormControl()
          });
    
        for (let objPropValue of Object.entries(model))
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

    commit():T {
        return this._form.value as T;
    }

    rollback():T
    {
        this._model = this._originalModel;
        this.setFormWithModelValue(this._originalModel, false);
        return this._originalModel;
    }
}