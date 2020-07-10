import { Table } from 'react-bootstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../images/sprite-css.css';
import './BadgeTable.css';
import Pokemon from 'pokemon';
import ascending from '../../images/ascending.png'
import unsorted from '../../images/unsorted.png'
import descending from '../../images/descending.png'
import moment from 'moment'
import Select from 'react-select'; //Future feature
import TPPRuns from '../../runs.json'

//Redux
const mapStateToProps = (state) => {
    return {
        names: state.app.names.names
    }
}

class BadgeTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // names: this.props.names, 
            searchBadges: this.props.badges, //tracks filtered badges
            badges: this.props.badges, //all badges (state of table)
            start: true, //Bool to track loading
            sort: {
                'species': 1,
                'date': 0,
                'price': 0,
                'amount': 0
            }
        }
    }

    //When API finishes getting all badges, this React function is called
    //Updates table with species ordered list, enables search/filter then blocks this being called again on update
    componentDidUpdate() {
        if (this.state.start) {
            this.sortSpecies();
            this.setState({start: false});
        }
    }

    //Sort table by date sold/expiry alternating asc/desc using param respectively
    sortDateSold(selling) {
        this.setState({
            sort: {
                'species': 0,
                'date': this.state.sort.date === 0 ? -1 : this.state.sort.date === 1 ? -1 : 1,
                'price': 0,
                'amount': 0
            }
        });
        var badges;
        if(this.state.searchBadges.length === 0){
            badges = this.props.badges;
        }
        else{
            badges = this.state.searchBadges;
        }
        if (selling) {
            (this.state.sort.date === 1) || (this.state.sort.date === 0) ? badges.sort((a, b) => (Date.parse(b.selling_since)) - (Date.parse(a.selling_since)))
                : badges.sort((a, b) => (Date.parse(a.selling_since)) - (Date.parse(b.selling_since)));
        }
        else {
            (this.state.sort.date === 1) || (this.state.sort.date === 0) ? badges.sort((a, b) => (Date.parse(a.expires_at)) - (Date.parse(b.expires_at)))
                : badges.sort((a, b) => (Date.parse(b.expires_at)) - (Date.parse(a.expires_at)));
        }
        this.setState({ badges: badges });
    }

    //Sort table by price alternating asc/desc
    sortPrice(selling) {
        this.setState({
            sort: {
                'species': 0,
                'date': 0,
                'price': this.state.sort.price === 0 ? -1 : this.state.sort.price === 1 ? -1 : 1,
                'amount': 0
            }
        });
        
        var badges;
        if(this.state.searchBadges.length === 0){
            badges = this.props.badges;
        }
        else{
            badges = this.state.searchBadges;
        }
        if (selling) {
            (this.state.sort.price === 1) || (this.state.sort.price === 0) ? badges.sort((a, b) => (parseInt(a.sell_price)) - (parseInt(b.sell_price)))
                : badges.sort((a, b) => (parseInt(b.sell_price)) - (parseInt(a.sell_price)));
        }
        else {
            (this.state.sort.price === 1) || (this.state.sort.price === 0) ? badges.sort((a, b) => (parseInt(a.price)) - (parseInt(b.price)))
                : badges.sort((a, b) => (parseInt(b.price)) - (parseInt(a.price)));
        }
        this.setState({ badges: badges });
    }

    //Sort table by species ID alternating asc/desc
    sortSpecies() {
        this.setState({
            sort: {
                'species': this.state.sort.species === 0 ? -1 : this.state.sort.species === 1 ? -1 : 1,
                'date': 0,
                'price': 0,
                'amount': 0
            }
        });
        var badges;
        if(this.state.searchBadges.length === 0){
            badges = this.props.badges;
        }
        else{
            badges = this.state.searchBadges;
        }
        (this.state.sort.species === 1) || (this.state.sort.species === 0) ? badges.sort((a, b) => (parseInt(a.species)) - (parseInt(b.species)))
            : badges.sort((a, b) => (parseInt(b.species)) - (parseInt(a.species)));
        this.setState({ badges: badges });
    }

    //Sort table by amount alternating asc/desc
    sortAmount() {
        this.setState({
            sort: {
                'species': 0,
                'date': 0,
                'price': 0,
                'amount': this.state.sort.amount === 0 ? -1 : this.state.sort.amount === 1 ? -1 : 1
            }
        });
        var badges;
        if(this.state.searchBadges.length === 0){
            badges = this.props.badges;
        }
        else{
            badges = this.state.searchBadges;
        }
        (this.state.sort.amount === 1) || (this.state.sort.amount === 0) ? badges.sort((a, b) => (parseInt(a.amount)) - (parseInt(b.amount)))
            : badges.sort((a, b) => (parseInt(b.amount)) - (parseInt(a.amount)));
        this.setState({ badges: badges });
    }

    //get pokemon name using language files to differenciate between gen1-8 and fakemon names with pokemon module
    getPkmnName(id) {
        //TODO missingno / old fakemon
        //Handle errors better
        if (!id.includes("-")) {
            if (id.length === 4) {
                return "???";
            }

            //Normal
            try {
                return Pokemon.getName(parseInt(id), 'en');
            }
            catch{
                return "???"
            }
        }
        else {
            //Sirius
            try {
                return Pokemon.getName(parseInt(id), 'de');
            }
            catch{
                return "???"
            }
        }
    }

    //Set sprite using class / sprite map
    getSprite(obj) {
        if (obj.species.includes("sirius")) {
            var speciesNum = parseInt(obj.species).toString();
            return "sirius-sprite-image sirius-sprite-" + speciesNum;
        }

        if (obj.species.length <= 3) {
            while (obj.species.length != 3) {
                obj.species = "0" + obj.species
            }
            return "sprite-image sprite-" + obj.species;
        }

        if (obj.species.length === 4) {
            // TODO
        }

    }

    speciesSearch(e){        
        let allBadges = this.props.badges;
        
        let badges = allBadges.filter(a => a.species.includes("sirius") ? Pokemon.getName((a.species.replace("-sirius", "")), 'de').toLowerCase().startsWith(e.target.value.toLowerCase()) : Number(a.species) < 2000 ? Pokemon.getName(a.species, 'en').toLowerCase().startsWith(e.target.value.toLowerCase()) : false);
        this.setState({ searchBadges: badges });
        this.setState({ badges: badges });
        
    }

    getRun(date) {
        let caught = "Run caught"
        TPPRuns.forEach(element => {
            let ndate = new Date(date);
            if (ndate >= new Date(element.from) && ndate <= new Date(element.to) ) {
                caught = element.run;
            }
        });
        return caught
    }

    getName(names, id) {
        for (let i = 0; i < names.length; i++) {
            if (id === names[i].id) {
                return names[i].name;
            }
        }

        return null;
    }

    render() {
        var that = this;
        const gens = [{ value: 151, label: "Gen1" }, { value: 251, label: "Gen2" }, { value: 386, label: "Gen3" }, { value: 494, label: "Gen4" }, { value: 649, label: "Gen5" }, { value: 721, label: "Gen6" }, { value: 809, label: "Gen7" }, { value: 890, label: "Gen8" }, { value: "sirius", label: "Sirius" }, { value: 2008, label: "other" }]

        return (
            <div>
                {/* Generation select - future feature */}
                 {/* <Select placeholder="Select gen.." isMulti className="selector" options={gens} className="genSelect" /> */}
                {
                    // Selling table
                    this.props.query === "selling" ?
                        (<Table striped bordered hover responsive="sm">
                            <thead>
                                {/* Pokemon ID + sort + search*/}
                                <th> 
                                    <div className="thheader" onClick={() => !this.state.start ? this.sortSpecies() : null}>
                                        Pokémon ID
                                        <img id="speciesSort" className="sort" src={this.state.sort.species === -1 ? ascending : this.state.sort.species === 0 ? unsorted : descending}/>
                                        <input name="species" style={{"width": "15vw"}} disabled={this.state.start} placeholder="Search name.." onChange={e => this.speciesSearch(e)} />
                                    </div>
                                </th>
                               
                                {/* Price + sort */}
                                <th onClick={() => !this.state.start ? this.sortPrice(true) : null}>Price<img id="priceSort" className="sort" src={this.state.sort.price === -1 ? ascending : this.state.sort.price === 0 ? unsorted : descending} /></th>
                                
                                {/* Username */}
                                <th>Seller</th>
                                
                                {/* Sell date */}
                                <th><div style={{"display": "block ruby"}} onClick={() => !this.state.start ? this.sortDateSold(true) : null}>Date offered<img id="dateSort" className="sort" src={this.state.sort.date === -1 ? ascending : this.state.sort.date === 0 ? unsorted : descending} /></div></th>
                                
                                {/* Source */}
                                <th>Source</th>
                            </thead>
                            <tbody>
                                {this.state.badges.map(function (obj) {
                                    return <tr>
                                       {/* Pokemon ID */}
                                        <td>
                                            <div style={{ 'display': 'block ruby' }}>
                                                {/* Display sprite */}
                                                <div id={obj.id} className={"flip " + that.getSprite(obj)} />

                                                {/* Get ID + name */}
                                                <div>{"#" + obj.species + " " + that.getPkmnName(obj.species)}</div>
                                            </div>
                                        </td>

                                        {/* Sell price */}
                                        <td>T{obj.sell_price}</td>

                                        {/* Username - Future feature search */}
                                        <td>{obj.user_object.name}</td>

                                        {/* Time since sold */}
                                        <td>{moment.utc(obj.selling_since).fromNow()}</td>

                                        {/* Get source / run caught */}
                                        <td>{obj.source === "run_caught" ? that.getRun(obj.created_at) : obj.source}</td>
                                    </tr>;
                                })}</tbody></Table>) :
                                
                         //Buying table

                        (<Table striped bordered hover responsive="sm">
                            <thead>
                                {/* Pokemon ID + sort + search*/}
                                <th> 
                                    <div className="thheader" onClick={() => !this.state.start ? this.sortSpecies() : null}>
                                        Pokémon ID
                                        <img id="speciesSort" className="sort" src={this.state.sort.species === -1 ? ascending : this.state.sort.species === 0 ? unsorted : descending}/>
                                        <input name="species" style={{"width": "15vw"}} disabled={this.state.start} placeholder="Search name.." onChange={e => this.speciesSearch(e)} />
                                    </div>
                                </th>
                                
                                {/* Price + sort */}
                                <th onClick={() => !this.state.start ? this.sortPrice(false) : null}>Price<img id="priceSort" className="sort" src={this.state.sort.price === -1 ? ascending : this.state.sort.price === 0 ? unsorted : descending} /></th>
                                
                                {/* Amount of badges */}
                                <th onClick={() => !this.state.start ? this.sortAmount() : null}>Amount<img id="amountSort" className="sort" src={this.state.sort.amount === -1 ? ascending : this.state.sort.amount === 0 ? unsorted : descending} /></th>
                                
                                {/* Buyer */}
                                <th>Buyer</th>

                                {/* Date until offer expires */}
                                <th onClick={() => !this.state.start ? this.sortDateSold(false) : null}>Expires<img id="dateSort" className="sort" src={this.state.sort.date === -1 ? ascending : this.state.sort.date === 0 ? unsorted : descending} /></th>
                            </thead>
                            <tbody>
                                {this.state.badges.map(function (obj) {
                                    return( 
                                    <tr>
                                        {/* Pokemon ID */}
                                        <td>
                                        <div style={{ 'display': 'block ruby' }}>
                                            {/* Get sprite */}
                                            <div className={"flip " + that.getSprite(obj)} />
                                            {/* Get ID + name */}
                                            <div>{"#" + obj.species + " " + that.getPkmnName(obj.species)}</div>
                                        </div>
                                    </td>

                                    {/* Get price */}
                                    <td>T{obj.price}</td>

                                    {/* Get amount */}
                                    <td>{obj.amount}</td>

                                    {/* Get buyer username */}
                                    <td>{obj.user_object.name}</td>

                                    {/* {that.getName(that.state.names, obj.user)} */}
                                    <td>{moment.utc(obj.expires_at).fromNow().substring(3)}</td></tr>
                                );
                                })}
                            </tbody>
                        </Table>)
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(BadgeTable);