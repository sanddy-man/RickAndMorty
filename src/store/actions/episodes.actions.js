import Axios from 'axios';
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
} from './types';

export const loadEpisodesAction = () => async (dispatch) => {
  dispatch({
    type: LOAD_EPISODES_PROGRESS,
  });
  try {
    const res = await Axios.get('https://rickandmortyapi.com/api/episode/');
    dispatch({
      type: LOAD_EPISODES_SUCCESS,
      dispatch: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_EPISODES_ERROR,
      dispatch: err.response.data.message,
    });
  }
};

export const loadNextEpisodesAction = (url) => async (dispatch) => {
  dispatch({
    type: LOAD_EPISODES_PROGRESS,
  });
  try {
    const res = await Axios.get(url);
    dispatch({
      type: LOAD_EPISODES_SUCCESS,
      dispatch: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_EPISODES_ERROR,
      dispatch: err.response.data.message,
    });
  }
};

export const loadEpisodeDetailAction = (id) => async (dispatch) => {
  dispatch({
    type: LOAD_EPISODE_DETAIL_PROGRESS,
  });
  try {
    const res = await Axios.get(
      `https://rickandmortyapi.com/api/episode/${id}`,
    );
    dispatch({
      type: LOAD_EPISODE_DETAIL_SUCCESS,
      dispatch: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_EPISODE_DETAIL_ERROR,
      dispatch: err.response.data.message,
    });
  }
};

export const batchEpisodeDetailsAction = (urls) => async (dispatch) => {
  dispatch({
    type: CLEAR_EPISODE_STATES,
  });
  dispatch({
    type: LOAD_EPISODE_DETAIL_BATCH_PROGRESS,
  });
  try {
    const resArr = await Promise.all(urls.map((url) => Axios.get(url)));
    const data = resArr.map((res) => res.data);
    dispatch({
      type: LOAD_EPISODE_DETAIL_BATCH_SUCCESS,
      dispatch: data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_EPISODE_DETAIL_BATCH_ERROR,
      dispatch: err.response.data.message,
    });
  }
};
