
const initialState = {
  remoteCampaigns: [],
  remoteMixes: [],
  idPickedCampaign:'',
  namePickedCampaign: '',
  idPickedMix:'',
  namePickedMix: ''
};

function rootReducer(state = initialState, action) {

  if (action.type === "ROMIS_LOADED") {
      return{
      ...state,
        remoteCampaigns: action.payload
        }
  }
  if (action.type === "MIXES_LOADED") {
      return{
      ...state,
        remoteMixes: action.payload
        }
  }
  if (action.type === "LINKS_LOADED") {
      return{
      ...state,
        remoteLinks: action.payload
        }
  }
  if (action.type === "ADD_LINK") {
      return{
      ...state,
        addedLink: action.payload
        }
  }
 // Not Implemented Yet 
  if (action.type === "RESET_LINK") {
      return{
        ...state,
        idPickedCampaign: initialState.idPickedCampaign,
        namePickedCampaign: initialState.namePickedCampaign,
        idPickedMix: initialState.idPickedMix,
        namePickedMix: initialState.namePickedMix
        }
  }
  if (action.type === "PICK_CAMPAIGN") {
      return{
      ...state,
        idPickedCampaign: action.idPickedCampaign,
        namePickedCampaign: action.namePickedCampaign
        }
  }
    if (action.type === "PICK_MIX") {
      return{
      ...state,
        idPickedMix: action.idPickedMix,
        namePickedMix: action.namePickedMix
        }
  }
  return state;
}

export default rootReducer;