import { combineReducers } from 'redux';
import NameList from './reducers/NameList';
// import NewIncident from './reducers/NewIncident';
// import IncidentList from './reducers/IncidentList';
// import ToastReducer from './reducers/ToastReducer';
// import MapData from './reducers/MapData';
// import OrgChartData from './reducers/OrgChart';

const appReducer = combineReducers({ 
  names: NameList
  // new: NewIncident,
  // incidents: IncidentList,
  // map: MapData,
  // toasts: ToastReducer,
  // orgChart: OrgChartData
});

export default appReducer;