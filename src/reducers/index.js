import { combineReducers } from 'redux';

const initialState = {
    Customers: [],
    Details: [{

    }],
    Loaded: false,
    Country: null,
    City: null,
    Company: null,
    Address: null
}

const webReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CUS_DATA':
            return {
                ...state,
                Customers: action.myData,
                Details: action.data,
                Loaded: true
            }
        case 'SEND_COUNTRY': 
            return {
                ...state,
                Country: action.Country,
                City: null,
                Company: null,
                Address: null
            }
        case 'SEND_CITY': 
            return {
                ...state,
                City: action.City,
                Company: null,
                Address: null
            }
        case 'SEND_COMPANY': 
            return {
                ...state,
                Company: action.Company,
                Address: action.Address
            }
        default:
            return state;
    }
}
const rootReducer = combineReducers({ webReducer });

export default rootReducer;