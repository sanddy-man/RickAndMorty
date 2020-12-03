import {combineReducers} from 'redux';
import {characters} from './characters.reducer';
import {episodes} from './episodes.reducer';

const rootReducer = combineReducers({
  characters,
  episodes,
});

export default rootReducer;
