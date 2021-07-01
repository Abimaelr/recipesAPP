import { FOODS } from '../actions/index';

export default (state = { list: [] }, { type, payload }) => {
  switch (type) {
  case FOODS:
    return {
      ...state, list: payload,
    };

  default:
    return state;
  }
};
