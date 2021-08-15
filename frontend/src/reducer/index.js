import {
    SETWEB3PROVIDER, RESETWEB3PROVIDER, SETADDRESS, SETBALANCE
} from "../actions/index";

const INITIAL_STATE = {
    provider: undefined,
    web3Provider: undefined,
    address: undefined,
    chainId: undefined,
    balance: undefined,
};
export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SETADDRESS:
            return {
                ...state,
                address: action.payload,
            };
        case SETBALANCE:
            return {
                ...state,
                balance: action.payload,
            };
        case SETWEB3PROVIDER:
            return {
                ...state,
                provider: action.payload.provider,
                web3Provider: action.payload.web3Provider,
                address: action.payload.address,
                balance: action.payload.balance,
                chainId: action.payload.chainId,
            };
        case RESETWEB3PROVIDER:
            return {
                ...state,
                provider: undefined,
                web3Provider: undefined,
                address: undefined,
                chainId: undefined,
                balance: undefined,
                pixelContract: undefined,
            };
        default:
            return state;
    }
};