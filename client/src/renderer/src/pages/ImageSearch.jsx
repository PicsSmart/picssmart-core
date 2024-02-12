import { useCallback, useEffect, useState } from 'react';
import { useDropzone} from 'react-dropzone';

import { Button, Paper, Box, Typography } from '@mui/material';
import { similarSearchByImage } from '../services/apiService/utilities';
import ImageGallery from '../components/ImageGallery';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ImageSearch = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [images, setImages] = useState([])
    const [preview, setPreview] = useState(null)
    const [hovered, setHovered] = useState(false)

    const getSimilarImages = async (file) => {
        try {
            setLoading(true)
            const {data} = await similarSearchByImage(file);
            data.results.forEach(element => {
                setImages((prev)=>[...prev, element.payload]);
            });
        } catch (exception) {
            setError(exception)
        } finally{
            setLoading(false)
        }
    }

    const onDrop = useCallback((acceptedFiles) => {
        const file = new FileReader;
    
        file.onload = function() {
          setPreview(file.result);
        }
    
        file.readAsDataURL(acceptedFiles[0])
      }, [])
    
    const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
    });


    async function handleSubmit(e) {
        e.preventDefault();
        setImages([])
        if ( typeof acceptedFiles[0] === 'undefined' ) return;

        getSimilarImages(acceptedFiles[0])   
    }

    function handleClear(){
        setImages([])
        setPreview(null)
        acceptedFiles=[]
    }

    useEffect(()=>{
        console.log(images)
    }, [images])
    return(
        <>
            <form className="max-w-md border border-gray-200 rounded p-6 mx-auto" >

                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Paper onMouseOver={()=>{setHovered(true)}} onMouseLeave={()=>{setHovered(false)}} sx={{display:'flex', justifyContent:'center', padding:1, position:'relative', alignItems:"center"}} elevation={5}>
                    {(hovered||isDragActive)&&
                    <>                    
                        <Paper sx={{position:'absolute', height:'100%', width:'100%', display:'flex', justifyContent:'center', background:'#9160F7', opacity:0.3}} back>
                        </Paper>
                        <Button sx={{position:'absolute', m:10}} startIcon={<CloudUploadIcon/>} size='large' color='picsmart'>
                            <Typography variant='h6' fontSize={'1rem'}>Upload an Image to Search</Typography>
                        </Button>
                    </>}
                    {preview ? 
                    <img src={preview} alt="Upload preview" width={'30%'}/>
                    :
                    <Button size='large' startIcon={<CloudUploadIcon/>} sx={{m:10}} color='picsmart'>
                        <Typography variant='h6' fontSize={'1rem'}>Upload an Image to Search</Typography>
                    </Button>
                    }
                    </Paper>

                </div>
                <Box sx={{display:'flex', marginBottom:5, marginTop:2}}>
                    <Button onClick={handleSubmit} variant='contained' color='picsmart' sx={{marginRight:2}}>Submit</Button>
                    <Button onClick={handleClear} variant='contained' color='error'>Clear</Button>
                </Box>
            </form>

            <>
                <Typography sx={{marginBottom:3}} variant='h4'>Similar Photos</Typography>
                <ImageGallery images={images} />
            </>
            
        </>
    )
}

export default ImageSearch;