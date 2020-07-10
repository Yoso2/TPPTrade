import { NAMES_LIST } from '../types';

function GetNamesAction(namesData) {

    // Return function for async thunk to handle - https://redux.js.org/advanced/async-actions/
    return{
      type: NAMES_LIST,
      names: namesData
      // remoteDatabase.put('algorithms/messages', {
        
      // }).then(function (messagesDoc) {
  
      //   remoteDatabase.get(incident//'16b066c58536cc0d3259bd30bd16403d'
      //   ).then(function (incidentDoc) {
  
      //     dispatch(sendJoinIncidentAction({
      //       type: JOINED_INCIDENT,
      //       messageData: {
      //         messageList: messagesDoc.rows,
      //         messagesFeed: messagesFeed
      //       },
      //       incidentData: {
      //         id: incident,
      //         type: incidentDoc.type,
      //         description: incidentDoc.description,
      //         address: incidentDoc.address,
      //         incident_number: incidentDoc.incident_number,
      //         incident_type: incidentDoc.incident_type,
      //         state: incidentDoc.state,
      //         time_of_call: incidentDoc.time_of_call,
      //         location: incidentDoc.wgs84_location,
      //         messages: messagesDoc.rows,
      //         messagesFeed: messagesFeed,
      //         incidentFeed: incidentFeed
      //       }
      //     }));
  
      //   })
      // })

    }
}

export default GetNamesAction;