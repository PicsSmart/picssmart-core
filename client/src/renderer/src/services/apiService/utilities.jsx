import axiosProvider from ".";

const textSearchUrl = 'http://127.0.0.1:8000/text-search'

export async function textSearchApi(caption){  
    try{
        const response = await axiosProvider.post(textSearchUrl, {caption})
        return Promise.resolve(response)
    }catch(exception){
        return Promise.reject(exception)
    }
  };  