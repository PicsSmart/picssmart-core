// third-party
import { combineReducers } from 'redux';

// project import
import media from './media';
import albums from './albums';
import menu from './menu'
import faces from './faces';
import search from './search';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ 
    media,
    albums,
    menu,
    faces, 
    search
});

export default reducers;
