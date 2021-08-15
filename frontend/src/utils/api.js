import axios from 'axios'

// const covalent = 'https://api.covalenthq.com/v1/';
//const covalent_key = 'ckey_22eb6fc89ba54a4196f05215869';

const instance = axios.create({
    baseURL: 'https://api.test.com/v1/',
    headers: {
        'content-type': 'application/json',
        'API_KEY': process.env.REACT_APP_COVALENT_API,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
});
const covalentInstance = axios.create({
    baseURL: 'https://api.covalenthq.com/v1/',
    // headers: {
    //     'content-type': 'application/json',
    //     'x-api-key': process.env.REACT_APP_COVALENT_API,
    //     'Access-Control-Allow-Headers' : 'Content-Type, x-api-key',
    //     'Access-Control-Allow-Origin' : '*',
    //     'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    // },
});

const api = {
    getCollectibles: (chainId, address) =>
        covalentInstance({
            'method': 'GET',
            'url': chainId + '/address/' + address + '/balances_v2/?nft=true&no-nft-fetch=false&match=%7B%22type%22%3A+%22nft%22%7D&key=' + process.env.REACT_APP_COVALENT_API,
        }),
    getData: () =>
        instance({
            'method': 'GET',
            'url': '/query',
            'params': {
                'search': 'parameter',
            },
        }),
    postData: () =>
        instance({
            'method': 'POST',
            'url': '/api',
            'data': {
                'item1': 'data1',
                'item2': 'item2'
            }
        })
}
export default api;