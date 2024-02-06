import { useParams, useNavigate } from "react-router";
import { getMediaByIdApi, getFullsizeMediaApi } from "../services/apiService/media";
import { similaritySearchById } from "../services/apiService/utilities";
import { useEffect, useState } from "react";
import ModalImage from "react-modal-image";
import { Grid, Paper, Table, TableBody, TableCell, TableRow, Typography, Box, Avatar, TableContainer } from "@mui/material";
import ImageGallery from "../components/ImageGallery";
import Tab from "../themes/overrides/Tab";
import { Face2Rounded } from "@mui/icons-material";
import {getFaceGroupIdApi, getFacesApi} from "../services/apiService/people"
import { setFaces } from '../store/reducers/faces';
import { useDispatch } from "react-redux";

const PhotoView = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [photoDetails, setPhotoDetails] = useState(null);
    const [similarPhotos, setSimilarPhotos] = useState([])

    const getFaces = async () => {
        try {
          setLoading(true);
          const { data } = await getFacesApi();
        //   console.log(data)
          dispatch(setFaces({ faces: data }));
        } catch (exception) {
          setError(exception);
        } finally {  
          setLoading(false);
        }
      }
    
    const getPhotoDetails =  async ()=>{
        try{
            setLoading(true)
            const {data} = await getMediaByIdApi(id)
            setPhotoDetails(data)
        }catch(exception){
            setError(exception)
        }finally{
            setLoading(false)
        }
    }

    const getFullsizePhoto = async ()=>{
        try{
            setLoading(true)
            const response = await getFullsizeMediaApi(id)
            setPhoto(response)
            console.log(blob)
        }catch(exception){
            setError(exception)
        }finally{
            setLoading(false)
        }
    }

    const getSimilarPhotos = async ()=>{
        setSimilarPhotos([])
        try{
            setLoading(true)
            const {data} = await similaritySearchById(id)
            data.results.map((element,index) => {
                if(index!==0 && index<6){
                    setSimilarPhotos((prev)=>[...prev, element.payload]);
                }
            });
        }catch(exception){
            setError(exception)
        }finally{
            setLoading(false)
        }
    }

    const getFaceGroupId = async (face, id)=>{
        try{
            setLoading(true)
            const {data} = await getFaceGroupIdApi(face, id)
            return data[0].groupId
        }catch(exception){
            setError(exception)
        }finally{
            setLoading(false)
        }
    }

    const handleAvatarClick = async (face, id) => {
        const groupId = await getFaceGroupId(face, id)
        // console.log(groupId)
        getFaces()
        navigate(`/people/${groupId}`)
    }

    useEffect(() => {
        getPhotoDetails()
        getSimilarPhotos()
    },[window.location.pathname]);

    return (
        <div>
            <Box sx={{display:'flex'}}>
                <Typography variant="h3" component="div" mb={'1rem'}>{photoDetails?.name}</Typography>
            </Box>
            <Grid container columnSpacing={3}>
                <Grid item md={6} xs={12}>
                    <Paper>
                        <ModalImage
                        small={`http://127.0.0.1:8000/fullsize/${id}`}
                        large={`http://127.0.0.1:8000/fullsize/${id}`}
                        />
                    </Paper>
                </Grid>
                <Grid item md={6}>
                    <Table>
                        <TableBody>
                            {photoDetails?.hasOwnProperty('caption') && <TableRow
                                key={`${photoDetails?.name}-caption`}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                <Typography variant="h5">Generated caption</Typography>
                                </TableCell>
                                <TableCell align="left">
                                <Typography variant="h6">{photoDetails?.caption}</Typography>
                                </TableCell>
                            </TableRow>}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
            <Typography variant="h4" mt={'1rem'} mb={'1rem'}>Faces Detected</Typography>
            {photoDetails?.hasOwnProperty('faces') && 
                        <TableContainer sx={{maxHeight:'11rem'}}>
                            <Table>
                                <TableRow
                                    key={`${photoDetails?.name}-people`}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                                >
                                    <Grid container columnSpacing={2} rowSpacing={1}>
                                        {photoDetails?.faces.map((face, index) => {
                                        return (
                                            <Grid item >
                                                <Avatar onClick={()=>{handleAvatarClick(face, photoDetails._id)}} variant='rounded' sx={{ width: '5rem', height: '5rem', borderRadius:4}} key={`face-${index}`} alt="" src={`http://127.0.0.1:8000/thumbnail/${photoDetails._id}?top=${face.top}&right=${face.right}&bottom=${face.bottom}&left=${face.left}`} />
                                            </Grid>
                                        )
                                        })}
                                    </Grid>
                                </TableRow>
                            </Table>
                        </TableContainer>
                            }
            <Typography variant="h4" component="div" mt={'1.5rem'} mb={'1rem'}>Similar Photos</Typography>
            <ImageGallery images={similarPhotos} hidePagination={true}/>
        </div>
    );
}

export default PhotoView;