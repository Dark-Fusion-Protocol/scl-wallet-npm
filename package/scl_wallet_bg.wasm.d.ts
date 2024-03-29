/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export function __wbg_sclwallet_free(a: number): void;
export function sclwallet_new(): number;
export function sclwallet_create_wallet(a: number, b: number, c: number, d: number, e: number): number;
export function sclwallet_generate_wallet(a: number, b: number, c: number, d: number, e: number, f: number, g: number): number;
export function sclwallet_init_from_pubaddr(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number): number;
export function sclwallet_init(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number): number;
export function sclwallet_sync(a: number): number;
export function sclwallet_has_wallet(a: number, b: number, c: number): number;
export function sclwallet_broadcast_tx(a: number, b: number, c: number): number;
export function sclwallet_import_contract(a: number, b: number, c: number): number;
export function sclwallet_delete_contract(a: number, b: number, c: number): number;
export function sclwallet_get_contract(a: number, b: number, c: number): number;
export function sclwallet_get_contracts(a: number): number;
export function sclwallet_sync_scl_balances_new(a: number): number;
export function sclwallet_sync_new_contracts(a: number): number;
export function sclwallet_get_mnemonic(a: number, b: number, c: number): number;
export function sclwallet_send_scl(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number): number;
export function sclwallet_send_btc(a: number, b: number, c: number, d: number, e: number, f: number): number;
export function sclwallet_estimate_fee_scl(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number): number;
export function sclwallet_estimate_fee_btc(a: number, b: number, c: number, d: number, e: number, f: number): number;
export function sclwallet_estimate_fee_list(a: number, b: number, c: number, d: number): number;
export function sclwallet_estimate_fee_bid(a: number, b: number, c: number, d: number): number;
export function sclwallet_estimate_fee_airdrop(a: number, b: number, c: number): number;
export function sclwallet_estimate_fee_mint(a: number, b: number): number;
export function sclwallet_estimate_fee_cancel_bid(a: number, b: number): number;
export function sclwallet_estimate_fee_cancel_listing(a: number, b: number, c: number, d: number): number;
export function sclwallet_cancel_bid(a: number, b: number, c: number, d: number): number;
export function sclwallet_cancel_listing(a: number, b: number, c: number, d: number): number;
export function sclwallet_mint_scl01_contract(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number): number;
export function sclwallet_mint_scl02_contract(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number): number;
export function sclwallet_mint_scl03_contract(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number): number;
export function sclwallet_get_trusted_pending(a: number): number;
export function sclwallet_get_tx_history(a: number, b: number, c: number): number;
export function sclwallet_airdrop(a: number, b: number, c: number, d: number): number;
export function sclwallet_list_token_batch(a: number, b: number, c: number, d: number, e: number): number;
export function sclwallet_place_bid_batch(a: number, b: number, c: number, d: number): number;
export function sclwallet_accept_bid(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number): number;
export function sclwallet_get_btc_tx_history(a: number): number;
export function sclwallet_claim_dge(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number): number;
export function sclwallet_claim_diminishing_airdrop(a: number, b: number, c: number, d: number, e: number, f: number): number;
export function sclwallet_drip_scl(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number): number;
export function sclwallet_create_diminishing_airdrop(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number): number;
export function sclwallet_create_dge(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number): number;
export function sclwallet_mint_token_rtm(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number): number;
export function sclwallet_gen_seed_phrase(a: number, b: number): void;
export function sclwallet_new_address(a: number, b: number): void;
export function sclwallet_get_utxos(a: number, b: number): void;
export function sclwallet_get_balance(a: number, b: number): void;
export function sclwallet_get_scl_balance(a: number, b: number): void;
export function sclwallet_is_address(a: number, b: number, c: number): number;
export function sclwallet_create_custom_tx(a: number, b: number): void;
export function sclwallet_convert_to_psbt(a: number, b: number, c: number, d: number): void;
export function sclwallet_build_send_scl_unsigned(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number): void;
export function sclwallet_build_send_btc_unsigned(a: number, b: number, c: number, d: number, e: number, f: number, g: number): void;
export function sclwallet_build_mint_scl01_unsigned(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number): void;
export function sclwallet_build_list_token_unsigned(a: number, b: number, c: number, d: number, e: number, f: number): void;
export function sclwallet_build_place_bid_unsigned(a: number, b: number, c: number, d: number, e: number): void;
export function sclwallet_build_cancel_bid_unsigned(a: number, b: number, c: number, d: number, e: number): void;
export function sclwallet_build_cancel_listing_unsigned(a: number, b: number, c: number, d: number, e: number): void;
export function sclwallet_build_drip_scl_unsigned(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number): void;
export function rustsecp256k1_v0_6_1_context_create(a: number): number;
export function rustsecp256k1_v0_6_1_context_destroy(a: number): void;
export function rustsecp256k1_v0_6_1_default_illegal_callback_fn(a: number, b: number): void;
export function rustsecp256k1_v0_6_1_default_error_callback_fn(a: number, b: number): void;
export function __wbindgen_malloc(a: number, b: number): number;
export function __wbindgen_realloc(a: number, b: number, c: number, d: number): number;
export const __wbindgen_export_2: WebAssembly.Table;
export function _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hda0301f9e7e2f244(a: number, b: number, c: number): void;
export function _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h77016a0ed602ea9d(a: number, b: number, c: number): void;
export function _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h6be1c1248132ad38(a: number, b: number, c: number): void;
export function __wbindgen_add_to_stack_pointer(a: number): number;
export function __wbindgen_free(a: number, b: number, c: number): void;
export function __wbindgen_exn_store(a: number): void;
export function wasm_bindgen__convert__closures__invoke2_mut__h7e4269d0a47ebfd2(a: number, b: number, c: number, d: number): void;
