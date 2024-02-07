import axiosProvider from ".";

const getMediaUrl = 'http://127.0.0.1:8000/media'
const getFullsizeMediaUrl = 'http://127.0.0.1:8000/fullsize/:id'
const getMediaByIdUrl = 'http://127.0.0.1:8000/media/:id'
const updateMediaUrl = 'http://127.0.0.1:8000/media/:id'

export const getMediaApi = async () => {  
    try{
        const response = await axiosProvider.get(getMediaUrl)
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
  }; 
  
export const getFullsizeMediaApi = async (id) => {
    try{
        const response = await axiosProvider.get(getFullsizeMediaUrl.replace(':id', id))
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}

export const getMediaByIdApi = async (id) => {
    try{
        const response = await axiosProvider.get(getMediaByIdUrl.replace(':id', id));
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}

export const updateMediaApi = async (id, data) => {
    try{
        const response = await axiosProvider.put(updateMediaUrl.replace(':id', id), data);
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}