import Im from 'immutable';
import * as constant from './../action/modal';

const initialState = [];

export default (state = initialState, action) => {

  switch (action.type) {
    case constant.SHOW:
       return Im.List(state)
         .set(action.index, 1)
         .toArray();

    case constant.HIDE:
       return Im.List(state)
         .set(action.index, 0)
         .toArray();

    case constant.ALL_HIDE:
      return Im.List(state)
        .map(v => 0)
        .toArray();

    case constant.TOGGLE:
      return Im.List(state)
        .set(action.index, Im.List(state).get(action.index) ? 0 : 1)
        .toArray();

    case constant.SHOW_ONLY:
      return Im.List(state)
        .map(v => 0)
        .set(action.index, 1)
        .toArray();

    case constant.TOGGLE_ONLY:
      return Im.List(state)
        .map(v => 0)
        .set(action.index, Im.List(state).get(action.index) ? 0 : 1)
        .toArray();

    default:
      return state;
  }

}
