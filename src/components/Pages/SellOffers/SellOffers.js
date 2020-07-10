import React, { Component } from 'react';
import './SellOffers.css';
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

export class SellOffers extends Component {
  constructor() {
    super();
    this.state = {
      sellOffers: [],
      names: [],
      loading: true
    }
  }

  // fetchUsernames(data, i, names){  
  //     fetch('https://twitchplayspokemon.tv/api/users/' + data[i].user,
  //       {
  //         headers: {
  //           'Accept': 'application/json'
  //         },
  //       })
  //       .then(res => res.json())
  //       .then((res) => {

  //         names.push({ id: data[i].user, name: res.name });
  //         i++;
  //         if(i <= data.length){
  //           this.fetchUsernames(data, i, names);
  //         }
  //         else{
  //           this.setState({ names: names });
  //           this.props.onNameFetch(names);
  //         }
  //       })
  //       .catch(console.log);
  // }

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

        if ((data.status === 200) ){//&& (i < x)) {
          badgeData = badgeData.concat(data.body);
          i++;
          this.fetchIterate(adata, badgeData);
        }
        else {
          //When ended
          this.setState({ sellOffers: badgeData });
          this.setState({ loading: false });
        }

      }).catch(console.log);
  }

  componentDidMount() {
    //Get initial badge data

    //Create cursor on load
    fetch('https://twitchplayspokemon.tv/api/badges/selling?create_cursor=true&sort=-selling_since&lookup_user=true',
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
        <br />      {/* noooo you can't use outdated html tags instead of css */}
        <h1>Badges for sale</h1>
        <br />      {/* haha, html formatting go <br/><br/><br/> */}
        <BadgeTable badges={this.state.sellOffers} query={"selling"} names={this.state.names} />
        {this.state.loading ? <div><img src="https://i.gifer.com/5Q0v.gif" /><br /><h2>Loading...</h2></div> : null}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellOffers);