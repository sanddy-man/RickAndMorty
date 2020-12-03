import update from 'immutability-helper';
import {ACTION} from '../actions/constants';
import {
  LOAD_EPISODES_PROGRESS,
  LOAD_EPISODES_SUCCESS,
  LOAD_EPISODES_ERROR,
  LOAD_EPISODE_DETAIL_PROGRESS,
  LOAD_EPISODE_DETAIL_SUCCESS,
  LOAD_EPISODE_DETAIL_ERROR,
  LOAD_EPISODE_DETAIL_BATCH_PROGRESS,
  LOAD_EPISODE_DETAIL_BATCH_SUCCESS,
  LOAD_EPISODE_DETAIL_BATCH_ERROR,
  CLEAR_EPISODE_STATES,
} from '../actions/types';

const initialState = {
  episodesStatus: null,
  episodes: [],
  episodesMetaInfo: null,
  episodeDetail: null,
  episdoeDetailStatus: null,
  episodeDetails: [],
  episdoeDetailsStatus: null,
  errorMsg: '',
};

export const episodes = (state = initialState, action) => {
  const {type, dispatch} = action;
  switch (type) {
    case LOAD_EPISODES_PROGRESS:
      return update(state, {
        episodesStatus: {$set: ACTION.PROGRESS},
      });
    case LOAD_EPISODES_SUCCESS:
      return update(state, {
        episodesStatus: {$set: ACTION.SUCCESS},
        episodes: {$set: state.episodes.concat(dispatch.results)},
        episodesMetaInfo: {$set: dispatch.info},
      });
    case LOAD_EPISODES_ERROR:
      return update(state, {
        episodesStatus: {$set: ACTION.ERROR},
        errorMsg: {$set: dispatch},
      });
    case LOAD_EPISODE_DETAIL_PROGRESS:
      return update(state, {
        episdoeDetailStatus: {$set: ACTION.PROGRESS},
      });
    case LOAD_EPISODE_DETAIL_SUCCESS:
      return update(state, {
        episdoeDetailStatus: {$set: ACTION.SUCCESS},
        episodeDetail: {$set: dispatch},
      });
    case LOAD_EPISODE_DETAIL_ERROR:
      return update(state, {
        episdoeDetailStatus: {$set: ACTION.ERROR},
        errorMsg: {$set: dispatch},
      });
    case LOAD_EPISODE_DETAIL_BATCH_PROGRESS:
      return update(state, {
        episdoeDetailsStatus: {$set: ACTION.PROGRESS},
      });
    case LOAD_EPISODE_DETAIL_BATCH_SUCCESS:
      return update(state, {
        episdoeDetailsStatus: {$set: ACTION.SUCCESS},
        episodeDetails: {$set: dispatch},
      });
    case LOAD_EPISODE_DETAIL_BATCH_ERROR:
      return update(state, {
        episdoeDetailsStatus: {$set: ACTION.ERROR},
        errorMsg: {$set: dispatch},
      });
    case CLEAR_EPISODE_STATES:
      return update(state, {
        episodesStatus: {$set: null},
        episodes: {$set: []},
        episodesMetaInfo: {$set: null},
        episodeDetail: {$set: null},
        episdoeDetailStatus: {$set: null},
        episodeDetails: {$set: []},
        episdoeDetailsStatus: {$set: null},
        errorMsg: {$set: ''},
      });
    default:
      return state;
  }
};
