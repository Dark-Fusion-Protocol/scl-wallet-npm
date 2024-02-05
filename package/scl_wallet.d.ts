/* tslint:disable */
/* eslint-disable */
/**
*/
export class SclWallet {
  free(): void;
/**
*/
  constructor();
/**
* @param {string} instance_name
* @param {string} password
* @returns {Promise<string>}
*/
  create_wallet(instance_name: string, password: string): Promise<string>;
/**
* @param {string} instance_name
* @param {string} password
* @param {string} seedphrase
* @returns {Promise<string>}
*/
  generate_wallet(instance_name: string, password: string, seedphrase: string): Promise<string>;
/**
* @param {string} instance_name
* @param {string} password
* @param {string} network
* @param {string} esplora_url
* @returns {Promise<string>}
*/
  init(instance_name: string, password: string, network: string, esplora_url: string): Promise<string>;
/**
* @returns {Promise<string>}
*/
  sync(): Promise<string>;
/**
* @param {string} instance_name
* @returns {Promise<string>}
*/
  has_wallet(instance_name: string): Promise<string>;
/**
* @param {string} tx_str
* @returns {Promise<string>}
*/
  broadcast_tx(tx_str: string): Promise<string>;
/**
* @param {string} contract_json
* @returns {Promise<string>}
*/
  import_contract(contract_json: string): Promise<string>;
/**
* @param {string} contract_id
* @returns {Promise<string>}
*/
  delete_contract(contract_id: string): Promise<string>;
/**
* @param {string} contract_id
* @returns {Promise<string>}
*/
  get_contract(contract_id: string): Promise<string>;
/**
* @returns {Promise<string>}
*/
  get_contracts(): Promise<string>;
/**
* @returns {Promise<string>}
*/
  sync_scl_balances_new(): Promise<string>;
/**
* @returns {Promise<string>}
*/
  sync_new_contracts(): Promise<string>;
/**
* @param {string} password
* @returns {Promise<string>}
*/
  get_mnemonic(password: string): Promise<string>;
/**
* @param {string} addressv_str
* @param {string} scl_amount_str
* @param {string} contract_id_str
* @param {bigint} fee_64
* @returns {Promise<string>}
*/
  send_scl(addressv_str: string, scl_amount_str: string, contract_id_str: string, fee_64: bigint): Promise<string>;
/**
* @param {string} btc_address_str
* @param {string} amount_sats_str
* @param {bigint} fee_64
* @returns {Promise<string>}
*/
  send_btc(btc_address_str: string, amount_sats_str: string, fee_64: bigint): Promise<string>;
/**
* @param {string} addressv_str
* @param {string} scl_amount_str
* @param {string} contract_id_str
* @param {number} number_of_blocks
* @returns {Promise<string>}
*/
  estimate_fee_scl(addressv_str: string, scl_amount_str: string, contract_id_str: string, number_of_blocks: number): Promise<string>;
/**
* @param {string} btc_address_str
* @param {string} amount_sats_str
* @param {number} number_of_blocks
* @returns {Promise<string>}
*/
  estimate_fee_btc(btc_address_str: string, amount_sats_str: string, number_of_blocks: number): Promise<string>;
/**
* @param {string} list_order_json
* @param {number} number_of_blocks
* @returns {Promise<string>}
*/
  estimate_fee_list(list_order_json: string, number_of_blocks: number): Promise<string>;
/**
* @param {string} bid_order_json
* @param {number} number_of_blocks
* @returns {Promise<string>}
*/
  estimate_fee_bid(bid_order_json: string, number_of_blocks: number): Promise<string>;
/**
* @param {number} number_of_airdrops
* @param {number} number_of_blocks
* @returns {Promise<string>}
*/
  estimate_fee_airdrop(number_of_airdrops: number, number_of_blocks: number): Promise<string>;
/**
* @param {number} number_of_blocks
* @returns {Promise<string>}
*/
  estimate_fee_mint(number_of_blocks: number): Promise<string>;
/**
* @param {number} number_of_blocks
* @returns {Promise<string>}
*/
  estimate_fee_cancel_bid(number_of_blocks: number): Promise<string>;
/**
* @param {string} listing_utxo
* @param {number} number_of_blocks
* @returns {Promise<string>}
*/
  estimate_fee_cancel_listing(listing_utxo: string, number_of_blocks: number): Promise<string>;
/**
* @param {string} bid_utxo
* @param {bigint} fee_64
* @returns {Promise<string>}
*/
  cancel_bid(bid_utxo: string, fee_64: bigint): Promise<string>;
/**
* @param {string} listing_utxo
* @param {bigint} fee_64
* @returns {Promise<string>}
*/
  cancel_listing(listing_utxo: string, fee_64: bigint): Promise<string>;
/**
* @param {string} ticker
* @param {string} max_supply
* @param {string} decimals
* @param {bigint} fee_64
* @returns {Promise<string>}
*/
  mint_scl01_contract(ticker: string, max_supply: string, decimals: string, fee_64: bigint): Promise<string>;
/**
* @param {string} ticker
* @param {string} max_supply
* @param {string} decimals
* @param {bigint} fee_64
* @param {string} airdrop_amount
* @returns {Promise<string>}
*/
  mint_scl02_contract(ticker: string, max_supply: string, decimals: string, fee_64: bigint, airdrop_amount: string): Promise<string>;
/**
* @param {string} ticker
* @param {string} decimals
* @param {string} addressv_str
* @param {string} scl_amount_str
* @param {bigint} fee_64
* @returns {Promise<string>}
*/
  mint_scl03_contract(ticker: string, decimals: string, addressv_str: string, scl_amount_str: string, fee_64: bigint): Promise<string>;
/**
* @returns {Promise<string>}
*/
  get_trusted_pending(): Promise<string>;
/**
* @param {string} contract_id
* @returns {Promise<string>}
*/
  get_tx_history(contract_id: string): Promise<string>;
/**
* @param {string} contract_id_vec
* @param {bigint} fee_64
* @returns {Promise<string>}
*/
  airdrop(contract_id_vec: string, fee_64: bigint): Promise<string>;
/**
* @param {string} list_order_json
* @param {string} fee_estimate
* @returns {Promise<string>}
*/
  list_token_batch(list_order_json: string, fee_estimate: string): Promise<string>;
/**
* @param {string} bid_order_json
* @param {bigint} fee_64
* @returns {Promise<string>}
*/
  place_bid_batch(bid_order_json: string, fee_64: bigint): Promise<string>;
/**
* @param {string} unsigned_tx_hex_str
* @param {string} fulfil_tx
* @param {string} contract_id_str
* @param {bigint} qty
* @returns {Promise<string>}
*/
  accept_bid(unsigned_tx_hex_str: string, fulfil_tx: string, contract_id_str: string, qty: bigint): Promise<string>;
/**
* @returns {Promise<string>}
*/
  get_btc_tx_history(): Promise<string>;
/**
* @param {string} contract_id
* @param {string} dge_id
* @param {string} donation_address
* @param {bigint} sats_amount
* @param {bigint} fee_64
* @returns {Promise<string>}
*/
  claim_dge(contract_id: string, dge_id: string, donation_address: string, sats_amount: bigint, fee_64: bigint): Promise<string>;
/**
* @param {string} contract_id
* @param {string} dairdrop_id
* @param {bigint} fee_64
* @returns {Promise<string>}
*/
  claim_diminishing_airdrop(contract_id: string, dairdrop_id: string, fee_64: bigint): Promise<string>;
/**
* @param {string} addressv_str
* @param {string} scl_amount_str
* @param {string} contract_id_str
* @param {string} duration_str
* @param {bigint} fee_64
* @returns {Promise<string>}
*/
  drip_scl(addressv_str: string, scl_amount_str: string, contract_id_str: string, duration_str: string, fee_64: bigint): Promise<string>;
/**
* @param {string} contract_id
* @param {bigint} pool_amt
* @param {bigint} sd_amt
* @param {bigint} period
* @param {bigint} max
* @param {bigint} min
* @param {string} single_drop
* @param {bigint} fee_64
* @returns {Promise<string>}
*/
  create_diminishing_airdrop(contract_id: string, pool_amt: bigint, sd_amt: bigint, period: bigint, max: bigint, min: bigint, single_drop: string, fee_64: bigint): Promise<string>;
/**
* @param {string} contract_id
* @param {bigint} pool_amt
* @param {bigint} sats_rate
* @param {bigint} max_drop
* @param {bigint} drip_duration
* @param {string} donation_address
* @param {string} single_drop
* @param {bigint} fee_64
* @returns {Promise<string>}
*/
  create_dge(contract_id: string, pool_amt: bigint, sats_rate: bigint, max_drop: bigint, drip_duration: bigint, donation_address: string, single_drop: string, fee_64: bigint): Promise<string>;
/**
* @param {string} contract_id
* @param {string} rights_utxo
* @param {string} rights_addr_str
* @param {bigint} fee_64
* @returns {Promise<string>}
*/
  mint_token_rtm(contract_id: string, rights_utxo: string, rights_addr_str: string, fee_64: bigint): Promise<string>;
/**
* @returns {string}
*/
  gen_seed_phrase(): string;
/**
* @returns {string}
*/
  new_address(): string;
/**
* @returns {string}
*/
  get_utxos(): string;
/**
* @returns {string}
*/
  get_balance(): string;
/**
* @returns {string}
*/
  get_scl_balance(): string;
/**
* @param {string} address
* @returns {boolean}
*/
  is_address(address: string): boolean;
}
