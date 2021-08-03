import sessionReducer from './auth';
import titleReducer from './title';
import {combineReducers} from 'redux';
import regionReducer from './regions';
import TravelReducer from './travels';
import tokenReducer from './auth/token';

const allReducers=combineReducers({
              sessions:sessionReducer,
              title:titleReducer,
              regions:regionReducer,
              travels:TravelReducer,
              token:tokenReducer
})

export default  allReducers;