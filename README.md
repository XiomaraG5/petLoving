# Aplicación desarrollada con ReactJS y enviada a producción con Netlify. Puede visitar la página en este [Link](https://pet-loving.netlify.app)


## Getting Started

- Para instalar las dependencias: npm install
    * dependencia utilizadas:
        ```
           {
            "axios": "^0.27.2",
            "bootstrap": "^5.2.0",
            "react-bootstrap": "^2.5.0",
            "react-icons": "^4.4.0",
            "sweetalert2": "^11.4.26,
            "uuid": "^8.3.2",
           }
        ```
- Para iniciar la aplicación en modo local: npm start

## Relevant code
  
 - Peticiones con axios

```
 // Get:
          const datos = await axios.get(Url)
  ```   
  
  ```
 // Post:
          const values = await axios.post(Url,formValue)
  ```    
       // Put:
          data={
             name:name?name:item.name,
             age:age?age:item.age,
             specie:specie?specie:item.specie,
             image:image?image:item.image,
         }
         await axios.put(Url+'/'+item._id,data)
         
  
 * Hook:
 
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
        
