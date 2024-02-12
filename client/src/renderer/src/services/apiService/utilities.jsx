import axiosProvider from ".";

const textSearchUrl = 'http://127.0.0.1:8000/text-search'
const similaritySearchByIdUrl = 'http://127.0.0.1:8000/similar-search?imageId=:id&limit=4'
const similarSearchByImageUrl = 'http://127.0.0.1:8000/similar-search'

export const textSearchApi = async (caption) => {  
    try{
        const response = await axiosProvider.post(textSearchUrl, {caption})
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
  };

export const similaritySearchById = async (id) => {
    try{
        const response = await axiosProvider.get(similaritySearchByIdUrl.replace(':id', id))
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
};

export const similarSearchByImage = async (file) => {
    try{
        const response = await axiosProvider.post(similarSearchByImageUrl, {'file': file}, {headers:{'Content-Type':'multipart/form-data'}})
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
}