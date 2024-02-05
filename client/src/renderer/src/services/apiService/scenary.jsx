import axiosProvider from ".";

const getScenesUrl = 'http://127.0.0.1:8000/scenes'
const getSceneThumbnailUrl = 'http://127.0.0.1:8000/scene/thumbnail/:name'
const getSceneImagesUrl = 'http://127.0.0.1:8000/scenes/:name'

export async function getScenesApi(){  
    try{
        const response = await axiosProvider.get(getScenesUrl)
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
  };  

export async function getSceneThumbnailApi(name){
    try{
        const response = await axiosProvider.get(getSceneThumbnailUrl.replace(':name', name))
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}

export async function getSceneImagesApi(name){
    try{
        const response = await axiosProvider.get(getSceneImagesUrl.replace(':name', name))
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}