import axiosProvider from ".";

const getMediaUrl = 'http://127.0.0.1:8000/media'

export async function getMediaApi(){  
    try{
        const response = await axiosProvider.get(getMediaUrl)
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
  };  