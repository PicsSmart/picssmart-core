// third-party
import { combineReducers } from 'redux';

// project import
import media from './media';
import albums from './albums';
import menu from './menu'

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ 
    media,
    albums,
    menu
});

export default reducers;
