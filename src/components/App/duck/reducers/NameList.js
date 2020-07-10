import { NAMES_LIST } from '../types';

const init = {
    names: []
};
const NameList = (state = init, action) => {
  switch (action.type) {
    case NAMES_LIST:
      return {
        ...state,
        names: action.names
      };
    default:
      return state;
  }
}

export default NameList;