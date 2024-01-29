// third-party
import { combineReducers } from 'redux';

// project import
import media from './media';
import albums from './albums';
import menu from './menu'
import faces from './faces';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ 
    media,
    albums,
    menu,
    faces
});

export default reducers;
