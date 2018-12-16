import myData from '../json/clients.json';

class webActions {
    getDataAndCalc() {
        const data = {
            Countries: {}
        }
        myData.Customers.forEach(obj => {
            if(!data.Countries[obj.Country]) {
                data.Countries[obj.Country] = {};
                data.Countries[obj.Country].counter = 0;
            }
            if(!data.Countries[obj.Country][obj.City]) { 
                data.Countries[obj.Country][obj.City] = [];
                data.Countries[obj.Country][obj.City].counter = 0;
                data.Countries[obj.Country].counter++;
            }
            if(!data.Countries[obj.Country][obj.City][obj.CompanyName]) { 
                data.Countries[obj.Country][obj.City].push(obj.CompanyName); 
                data.Countries[obj.Country][obj.City].counter++;
            }
        });
        return {
            type: 'CUS_DATA',
            myData,
            data
        }
    }
    sendCountry(name) {
        return {
            type: 'SEND_COUNTRY',
            Country: name
        }
    }
    sendCity(name) {
        return {
            type: 'SEND_CITY',
            City: name
        }
    }
    sendCompany(name, address) {
        return {
            type: 'SEND_COMPANY',
            Company: name,
            Address: address
        }
    }
}

export default webActions;