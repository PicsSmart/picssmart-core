// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput, Button, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setSearch } from '../../../../store/reducers/search';

// assets
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Search = () => {
  const [caption, setCaption] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSearch({ caption }));
    navigate('/search');
  }

  useEffect(() => {
    setCaption('');
  } , [window.location.pathname]);

  return (
    <>
      <Box sx={{ width: '100%', ml: { xs: 1, md: 2 } }}>
        <FormControl sx={{ width: { xs: '100%', md: '100%' } }}>
          <OutlinedInput
            value={caption}
            style={{ color: 'white' }}
            size="small"
            id="header-search"
            startAdornment={
              <InputAdornment position="start" sx={{ mr: -0.5 }}>
                <SearchIcon style={{ color: 'white' }} />
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
        <IconButton sx={{ color: 'white' }} aria-label="upload picture" component="span" onClick={handleClick}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default Search;
