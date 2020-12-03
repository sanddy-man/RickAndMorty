import update from 'immutability-helper';
import {ACTION} from '../actions/constants';
import {
  LOAD_CHARACTORS_ERROR,
  LOAD_CHARACTORS_PROGRESS,
  LOAD_CHARACTORS_SUCCESS,
  LOAD_CHARACTOR_DETAIL_PROGRESS,
  LOAD_CHARACTOR_DETAIL_SUCCESS,
  LOAD_CHARACTOR_DETAIL_ERROR,
  CLEAR_CHARACTOR_STATES,
  CLEAR_CHARACTOR_DETAIL,
} from '../actions/types';

const initialState = {
  charactersStatus: null,
  characters: [],
  charactersMetaInfo: null,
  detail: null,
  detailStatus: null,
  errorMsg: '',
};

export const characters = (state = initialState, action) => {
  const {type, dispatch} = action;
  switch (type) {
    case LOAD_CHARACTORS_PROGRESS:
      return update(state, {
        charactersStatus: {$set: ACTION.PROGRESS},
      });
    case LOAD_CHARACTORS_SUCCESS:
      return update(state, {
        charactersStatus: {$set: ACTION.SUCCESS},
        characters: {$set: state.characters.concat(dispatch.results)},
        charactersMetaInfo: {$set: dispatch.info},
      });
    case LOAD_CHARACTORS_ERROR:
      return update(state, {
        charactersStatus: {$set: ACTION.ERROR},
        errorMsg: {$set: dispatch},
      });
    case LOAD_CHARACTOR_DETAIL_PROGRESS:
      return update(state, {
        detailStatus: {$set: ACTION.PROGRESS},
      });
    case LOAD_CHARACTOR_DETAIL_SUCCESS:
      return update(state, {
        detailStatus: {$set: ACTION.SUCCESS},
        detail: {$set: dispatch},
      });
    case LOAD_CHARACTOR_DETAIL_ERROR:
      return update(state, {
        detailStatus: {$set: ACTION.ERROR},
        errorMsg: {$set: dispatch},
      });
    case CLEAR_CHARACTOR_DETAIL:
      return update(state, {
        detail: {$set: null},
        detailStatus: {$set: null},
      });
    case CLEAR_CHARACTOR_STATES:
      return update(state, {
        charactersStatus: {$set: null},
        characters: {$set: []},
        charactersMetaInfo: {$set: null},
        detail: {$set: null},
        detailStatus: {$set: null},
        errorMsg: {$set: ''},
      });
    default:
      return state;
  }
};
