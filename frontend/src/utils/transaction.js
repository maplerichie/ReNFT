export const EVM_ERROR_TEMPLATE = 'Error: VM Exception while processing transaction: reverted with reason string ';
export const METAMASK_ERROR_TEMPLATE = 'MetaMask Tx Signature: ';

export function onTxError(err){
    console.log(err);
    try{
        return err.data.message.match(/(?:'[^']*'|^[^']*$)/)[0]
        .replace(/'/g, "")
    }catch{
        return err.message.match(/(?:'[^']*'|^[^']*$)/)[0]
        .replace(/'/g, "")
    }
}

export function onTxSuccess(success){
    console.log(success);
    return success.hash;
}