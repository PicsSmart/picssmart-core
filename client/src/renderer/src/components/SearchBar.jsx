// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput, Button, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// assets
import SearchIcon from '@mui/icons-material/Search';
import { textSearchApi } from '../services/apiService/utilities';
import { useEffect, useState } from 'react';
// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const SearchBar = ({setPhotos, setError, setLoading}) => {

    const textSearch = async ()=>{
        try{
            setLoading(true)
            const {data} =  await textSearchApi(caption)
            console.log(data)
            data.results.forEach(element => {
                setPhotos((prev)=>[...prev, element.payload]);
            });
        }catch(exception){
            setError(exception)
        }finally{
            setLoading(false)
        }
    }
    

    const [caption, setCaption] = useState('');


    const handleClick = () => {
        setPhotos([])
        textSearch()
    }

    return (
        <Box sx={{display:'flex', marginBottom:4, alignItems:'center'}}>
            <Box>
                <FormControl sx={{width:'40rem'}}>
                    <OutlinedInput
                        color='picsmart'
                        value={caption}
                        size="small"
                        id="header-search"
                        startAdornment={
                        <InputAdornment position="start" sx={{ mr: -0.5 }}>
                            <SearchIcon  color='picsmart'/>
                        </InputAdornment>
                        }
                        aria-describedby="header-search-text"
                        inputProps={{
                        'aria-label': 'weight'
                        }}
                        placeholder="Search"
                        onChange={(e) => setCaption(e.target.value)}
                    />
                </FormControl>
            </Box>
            <Box>
                <Button variant='contained' onClick={handleClick} color='picsmart' size='small' sx={{marginLeft:2}}>
                Search
                </Button>
            </Box>
        </Box>
    );
};

export default SearchBar;
