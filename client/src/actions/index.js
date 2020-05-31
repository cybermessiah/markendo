import axios from 'axios';

export function getRomis() {
  return function(dispatch) {
    return fetch("http://localhost:5000/romis/campaigns")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "ROMIS_LOADED", payload: json });
      });
  };
}

export function getMixes() {
  return function(dispatch) {
    return fetch("http://localhost:5000/digimix/mixes")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "MIXES_LOADED", payload: json });
      });
  };
}

export function getLinks() {
  return function(dispatch) {
    return fetch("http://localhost:5000/romis/linked")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "LINKS_LOADED", payload: json });
      });
  };
}

// next 2 constants deal with the Linking of ROMI and DigiMix via New Post component

export const createLink = ({ linkIdCampaign, linkIdMix }) => {
  return (dispatch) => {
    return axios.post("http://localhost:5000/romis/updatelink", {linkIdCampaign, linkIdMix})
      .then(response => {
        dispatch(createLinkSuccess(response.data))
      })
      .catch(error => {  
        throw(error);
      });
  };
};

export const createLinkSuccess = (data) => {
  return {
    type: 'ADD_LINK',
    payload: {
      _id: data.linkIdCampaign,
      _digimix: data.linkIdMix 
    }
  }
};

export const campaignsPick = (idPickedCampaign, namePickedCampaign) => {
      return {
        type: 'PICK_CAMPAIGN',
        idPickedCampaign,
        namePickedCampaign 
      };
    };  

export const digimixPick = (idPickedMix, namePickedMix) => {
      return {
        type: 'PICK_MIX',
        idPickedMix,
        namePickedMix 
      };
    }; 
