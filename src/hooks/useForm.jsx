import { useState } from 'react';
import { fileUpload } from '../services/urls';
 
export const useForm = ( initialState = {} ) => {
    
    const [formValue, setValues] = useState(initialState);
    
    const reset = () => {
        setValues( initialState );
    }
 
    const handleInputChange = ({ target }) => {
        setValues({
            ...formValue,
            [ target.name ]: target.value
        });
    }
    const handleFileChanged = (e) => {
         const file = e.target.files[0];
        fileUpload(file)
        .then(response => {
            formValue.image = response
        })
        .catch(error => {
            console.log(error.message);
        })
        
    }
    return { formValue, handleInputChange, reset,handleFileChanged };
}