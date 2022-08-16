export const Url = "https://crudcrud.com/api/6d9101ff99134e4abc0f94d6b2863175/pets"


export const fileUpload = async (file)=>{
    const cloud ='https://api.cloudinary.com/v1_1/duzh7meuo/upload'
    const formData = new FormData();
    formData.append('upload_preset','Uploadmovie');
    formData.append('file',file);
   try{
        const resp = await fetch(cloud, {
            method: 'POST',
            body: formData
        })

        if(resp.ok){
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        }else{
            throw await resp.json();
        }

    }catch(error){
        throw error;
    }
}