import React, { Component } from 'react';
import './BuyOffers.css';
import BadgeTable from '../../badgeTable/BadgeTable';
import { connect } from 'react-redux';
import GetNamesAction from '../../App/duck/actions/GetNamesAction'

const mapDispatchToProps = (dispatch) => {
  return {
    onNameFetch: (names) => {
      dispatch(GetNamesAction(names))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    names: state.app.names.names
  }
}

export class BuyOffers extends Component {
  constructor() {
    super();
    this.state = {
      buyOffers: [],
      names: [],
      loading: true
    }
  }

  fetchIterate(adata, badgeData, i) {
    fetch('https://twitchplayspokemon.tv/api/cursor/' + adata + '?limit=1000', {
      method: "POST",
      headers: {
        'Accept': 'application/json'
      }
    })
    //Get response and data
      .then(res => res.json()
        .then(data => ({ status: res.status, body: data })))
      .then((data) => {

        if (data.status === 200){
          badgeData = badgeData.concat(data.body);
          i++;
          this.fetchIterate(adata, badgeData);
        }
        else {
          //When ended
          this.setState({ buyOffers: badgeData });
          this.setState({ loading: false });
        }
      }).catch(console.log);
  }

  componentDidMount() {
    //Get initial badge data

    //Create cursor on load
    fetch('https://twitchplayspokemon.tv/api/badges/buying?create_cursor=true&sort=-created_at&lookup_user=true',
      {
        headers: {
          'Accept': 'application/json'
        },
      })
      .then(res => res.json())
      .then((adata) => {

        //Use cursor to get x pages of results back
        this.fetchIterate(adata, [], 0);

      }).catch(console.log)
  }

  render() {
    return (
      <div>
        <br/>
        <h1>Badge Offers</h1>
        <br/>
        <BadgeTable badges={this.state.buyOffers} query={"buying"} names={this.state.names} />
        {this.state.loading ? <div><img src="https://i.gifer.com/5Q0v.gif"/><br/><h2>Loading...</h2></div> : null}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyOffers);