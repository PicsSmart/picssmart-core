import axiosProvider from ".";

const getFacesUrl = 'http://127.0.0.1:8000/faces'
const getThumbnailUrl = 'http://127.0.0.1:8000/thumbnail/:id'
const getFaceGroupImagesUrl = 'http://127.0.0.1:8000/faces/:id'

export async function getFacesApi(){  
    try{
        const response = await axiosProvider.get(getFacesUrl)
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
  };  

export async function getThumbnailApi(id){
    try{
        const response = await axiosProvider.get(getThumbnailUrl.replace(':id', id))
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}

export async function getFaceGroupImagesApi(id){
    try{
        const response = await axiosProvider.get(getFaceGroupImagesUrl.replace(':id', id))
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}