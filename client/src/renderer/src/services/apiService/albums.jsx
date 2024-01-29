import axiosProvider from ".";

const getAlbumsUrl = 'http://127.0.0.1:8000/albums'
const getAlbumMediaUrl = 'http://127.0.0.1:8000/albums/:id/media'

export const getAlbumsApi = async ()=>{
    try {
        const response = await axiosProvider.get(getAlbumsUrl);
        return Promise.resolve(response);
    }catch(exception){
        return Promise.reject(exception);
    }
}

export const getAlbumMediaApi = async (id)=>{
    try{
        const response = await axiosProvider.get(getAlbumMediaUrl.replace(':id', id));
        return Promise.resolve(response);
    }catch(execption){
        return Promise.reject(exception)
    }
}