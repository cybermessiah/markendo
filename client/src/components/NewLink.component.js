
import { connect } from 'react-redux';
import { createLink } from '../actions';
import React from 'react';
import { Route , withRouter} from 'react-router-dom';

function mapStateToProps(state) {
  return {
    idPickedCampaign: state.idPickedCampaign,
    idPickedMix: state.idPickedMix
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAddLink: link => {
      dispatch(createLink(link));
      dispatch({type: 'RESET_LINK'});
    }
  };
};

export class NewLink extends React.Component {

//handle Reset not yet implemented but the logic is here. Reuse dispatch RESET_LINK as above  

  handleUpdate = (e) => {
      e.preventDefault();
        const linkIdCampaign = this.props.idPickedCampaign;
        const linkIdMix = this.props.idPickedMix;
        const data = {
          linkIdCampaign,
          linkIdMix
        }
        this.props.onAddLink(data);
        this.props.history.push('/linkromimix');
  }

  render() {

    const { idPickedCampaign, idPickedMix, handleSubmit } = this.props;

    return (
      <div>
          <div className="form-group mt-4">
            <button type="submit" onClick={this.handleUpdate} className="btn btn-outline-dark btn-lg">Connect</button>
            <button type="button" className="ml-2 btn btn-outline-dark btn-lg" onClick={ this.handleReset }>
              Reset 
            </button>
          </div>     
      </div>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewLink));