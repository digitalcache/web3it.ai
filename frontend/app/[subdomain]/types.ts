export type TransferType = {
    address: string;
    block_hash: string;
    block_timestamp: string;
    from_address: string;
    to_address: string;
    token_decimals: 18;
    token_name: string;
    transaction_hash: string;
    value: string;
    value_decimal: string;
}

export type OwnerType = {
    balance: string;
    balance_formatted: string;
    is_contract: boolean;
    owner_address: string;
    owner_address_label: string;
    percentage_relative_to_total_supply: string;
    usd_value: string;
}
  

export type Get_Transfers_Dto = {
    result : Array<TransferType> | []
}

export type Get_Owners_Dto = {
    result : Array<OwnerType> | []
}