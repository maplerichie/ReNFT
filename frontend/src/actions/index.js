export const SETWEB3PROVIDER = "SETWEB3PROVIDER";
export const RESETWEB3PROVIDER = "RESETWEB3PROVIDER";
export const SETADDRESS = "SETADDRESS";
export const SETBALANCE = "SETBALANCE";



export const setWeb3Provider = (item) => {
  return { type: SETWEB3PROVIDER, payload: item };
};

export const resetWeb3Provider = (item) => {
  return { type: RESETWEB3PROVIDER, payload: item };
};

export const setAddress = (item) => {
  return { type: SETADDRESS, payload: item };
};

export const setBalance = (item) => {
  return { type: SETBALANCE, payload: item };
};