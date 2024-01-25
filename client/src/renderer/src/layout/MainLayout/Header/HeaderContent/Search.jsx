// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';

// assets
import SearchIcon from '@mui/icons-material/Search';
// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Search = () => (
  <Box sx={{ width: '100%', ml: { xs: 1, md: 2 } }}>
    <FormControl sx={{ width: { xs: '100%', md: '100%' } }}>
      <OutlinedInput
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
      />
    </FormControl>
  </Box>
);

export default Search;
