import React from 'react';
import { connect } from 'react-redux';
import _webActions from '../../actions';
import Headers from '../../components/Headers';
import Row from '../../components/Row';
import GoogleMap from '../../components/GoogleMap';
import './styles.css';

const webActions = new _webActions();

class MainCont extends React.Component {
    constructor(props) {
        super(props);
        this.countries = [];
        this.cities = [];
        this.company = [];
        this.state = {
            loaded: false,
            isActive1: null,
            isActive2: null,
            isActive3: null,
        }
    }
    componentDidMount() {
        (async() => {
            await this.props._getDataAndCalc();
            const ordered = {};
            Object.keys(this.props.Details.Countries).sort((a,b) => this.props.Details.Countries[b].counter - this.props.Details.Countries[a].counter).forEach((key) => {
                ordered[key] = this.props.Details.Countries[key];
            });
            this.countries = Object.keys(ordered);
            this.setState({loaded: true});
        })()    
    }
    checkIt(data, num) {
        if(num === 1) {
            this.cities = [];
            this.company = [];
            this.setState({
                isActive1: data,
                isActive2: null,
                isActive3: null
            });
            this.props._sendCountry(data);
        } else if (num === 2) {
            this.company = [];
            this.setState({
                isActive2: data,
                isActive3: null
            });
            this.props._sendCity(data);
        } else {    
                this.setState({isActive3: data});
                const address = this.props.Customers.Customers.filter(obj => {
                    if(data === obj.CompanyName) return obj;
                    return null;
                })
                const fullAddress = `${this.props.Country}, ${this.props.City}, ${address[0].Address}`;
                this.props._sendCompany(data, fullAddress);
        }
    }
    render() {
        if(this.props.Loaded) {
            if(this.props.Country && !this.cities[0]) {
                const country = this.props.Details.Countries[this.props.Country];
                const ordered = {};
                Object.keys(country).sort((a,b) => country[b].counter - country[a].counter).forEach((key) => {
                    ordered[key] = country[key];
                });
                this.cities = Object.keys(ordered);
            }
            if(this.props.City && !this.company[0]) {
                this.company = this.props.Details.Countries[this.props.Country][this.props.City];
                this.company.sort();
            }
            return (
                <div className="container">
                    <Headers />
                    <div className="table">
                        <Row data={this.countries} isActive={this.state.isActive1} callBack={(data) => this.checkIt(data, 1)}/>
                        <Row data={this.cities} isActive={this.state.isActive2} callBack={(data) => this.checkIt(data, 2)}/>
                        <Row data={this.company} isActive={this.state.isActive3} callBack={(data) => this.checkIt(data, 3)}/>
                        {this.props.Address ? <GoogleMap data={this.props.Address}/> : null}
                    </div>
                    
                </div>
            )
        } else {
            return (
                <div>
                    Loading
                </div>
            )
        }
        
    }
}

const mapStateToProps = state => {
    return {
        Customers: state.webReducer.Customers,
        Details: state.webReducer.Details,
        Loaded: state.webReducer.Loaded,
        Country: state.webReducer.Country,
        City: state.webReducer.City,
        Company: state.webReducer.Company,
        Address: state.webReducer.Address
    }
}

const mapDispatchToProps = dispatch => {
    return {
        _getDataAndCalc: () => dispatch(webActions.getDataAndCalc()),
        _sendCountry: (data) => dispatch(webActions.sendCountry(data)),
        _sendCity: (data) => dispatch(webActions.sendCity(data)),
        _sendCompany: (data, address) => dispatch(webActions.sendCompany(data, address))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainCont);