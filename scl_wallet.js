import * as wasm from "./scl_wallet_bg.wasm";
import { __wbg_set_wasm } from "./scl_wallet_bg.js";
__wbg_set_wasm(wasm);
export * from "./scl_wallet_bg.js";
