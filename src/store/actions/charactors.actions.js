import Axios from 'axios';
import {
  LOAD_CHARACTORS_PROGRESS,
  LOAD_CHARACTORS_SUCCESS,
  LOAD_CHARACTORS_ERROR,
  LOAD_CHARACTOR_DETAIL_PROGRESS,
  LOAD_CHARACTOR_DETAIL_SUCCESS,
  LOAD_CHARACTOR_DETAIL_ERROR,
  CLEAR_CHARACTOR_STATES,
} from './types';

export const loadCharactersAction = () => async (dispatch) => {
  dispatch({
    type: LOAD_CHARACTORS_PROGRESS,
  });
  try {
    const res = await Axios.get('https://rickandmortyapi.com/api/character/');
    dispatch({
      type: LOAD_CHARACTORS_SUCCESS,
      dispatch: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_CHARACTORS_ERROR,
      dispatch: err.response.data.message,
    });
  }
};

export const searchCharactersAction = (searchStr) => async (dispatch) => {
  dispatch({
    type: CLEAR_CHARACTOR_STATES,
  });
  dispatch({
    type: LOAD_CHARACTORS_PROGRESS,
  });
  try {
    const res = await Axios.get(
      `https://rickandmortyapi.com/api/character/?name=${searchStr}`,
    );
    dispatch({
      type: LOAD_CHARACTORS_SUCCESS,
      dispatch: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_CHARACTORS_ERROR,
      dispatch: err.response.data.message,
    });
  }
};

export const loadNextCharactersAction = (url) => async (dispatch) => {
  dispatch({
    type: LOAD_CHARACTORS_PROGRESS,
  });
  try {
    const res = await Axios.get(url);
    dispatch({
      type: LOAD_CHARACTORS_SUCCESS,
      dispatch: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_CHARACTORS_ERROR,
      dispatch: err.response.data.message,
    });
  }
};

export const loadCharacterDetailAction = (id) => async (dispatch) => {
  dispatch({
    type: LOAD_CHARACTOR_DETAIL_PROGRESS,
  });
  try {
    const res = await Axios.get(
      `https://rickandmortyapi.com/api/character/${id}`,
    );
    dispatch({
      type: LOAD_CHARACTOR_DETAIL_SUCCESS,
      dispatch: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_CHARACTOR_DETAIL_ERROR,
      dispatch: err.response.data.message,
    });
  }
};
