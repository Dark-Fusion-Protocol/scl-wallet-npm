let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}


const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

let cachedFloat64Memory0 = null;

function getFloat64Memory0() {
    if (cachedFloat64Memory0 === null || cachedFloat64Memory0.byteLength === 0) {
        cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64Memory0;
}

let cachedBigInt64Memory0 = null;

function getBigInt64Memory0() {
    if (cachedBigInt64Memory0 === null || cachedBigInt64Memory0.byteLength === 0) {
        cachedBigInt64Memory0 = new BigInt64Array(wasm.memory.buffer);
    }
    return cachedBigInt64Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);

            } else {
                state.a = a;
            }
        }
    };
    real.original = state;

    return real;
}
function __wbg_adapter_50(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures__invoke1_mut__h5c8e6b3721a8f1a4(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_55(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h40421b7b1a0c6304(arg0, arg1, addHeapObject(arg2));
}

function __wbg_adapter_58(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures__invoke1_mut__h52e1584958bda594(arg0, arg1, addHeapObject(arg2));
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
function __wbg_adapter_256(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__h5c63ef43e299fa25(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

/**
*/
export class SclWallet {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sclwallet_free(ptr);
    }
    /**
    */
    constructor() {
        const ret = wasm.sclwallet_new();
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @param {string} instance_name
    * @param {string} password
    * @returns {Promise<string>}
    */
    create_wallet(instance_name, password) {
        const ptr0 = passStringToWasm0(instance_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(password, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_create_wallet(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return takeObject(ret);
    }
    /**
    * @param {string} instance_name
    * @param {string} password
    * @param {string} seedphrase
    * @returns {Promise<string>}
    */
    generate_wallet(instance_name, password, seedphrase) {
        const ptr0 = passStringToWasm0(instance_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(password, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(seedphrase, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_generate_wallet(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
        return takeObject(ret);
    }
    /**
    * @param {string} instance_name
    * @param {string} password
    * @param {string} network
    * @param {string} esplora_url
    * @returns {Promise<string>}
    */
    init(instance_name, password, network, esplora_url) {
        const ptr0 = passStringToWasm0(instance_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(password, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(network, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(esplora_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_init(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
        return takeObject(ret);
    }
    /**
    * @returns {Promise<string>}
    */
    sync() {
        const ret = wasm.sclwallet_sync(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @param {string} instance_name
    * @returns {Promise<string>}
    */
    has_wallet(instance_name) {
        const ptr0 = passStringToWasm0(instance_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_has_wallet(this.__wbg_ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {string} tx_str
    * @returns {Promise<string>}
    */
    broadcast_tx(tx_str) {
        const ptr0 = passStringToWasm0(tx_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_broadcast_tx(this.__wbg_ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {string} contract_json
    * @returns {Promise<string>}
    */
    import_contract(contract_json) {
        const ptr0 = passStringToWasm0(contract_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_import_contract(this.__wbg_ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {string} contract_id
    * @returns {Promise<string>}
    */
    delete_contract(contract_id) {
        const ptr0 = passStringToWasm0(contract_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_delete_contract(this.__wbg_ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {string} contract_id
    * @returns {Promise<string>}
    */
    get_contract(contract_id) {
        const ptr0 = passStringToWasm0(contract_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_get_contract(this.__wbg_ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @returns {Promise<string>}
    */
    get_contracts() {
        const ret = wasm.sclwallet_get_contracts(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @returns {Promise<string>}
    */
    sync_scl_balances_new() {
        const ret = wasm.sclwallet_sync_scl_balances_new(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @param {string} password
    * @returns {Promise<string>}
    */
    get_mnemonic(password) {
        const ptr0 = passStringToWasm0(password, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_get_mnemonic(this.__wbg_ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {string} addressv_str
    * @param {string} scl_amount_str
    * @param {string} contract_id_str
    * @param {bigint} fee_64
    * @returns {Promise<string>}
    */
    send_scl(addressv_str, scl_amount_str, contract_id_str, fee_64) {
        const ptr0 = passStringToWasm0(addressv_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(scl_amount_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(contract_id_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_send_scl(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, fee_64);
        return takeObject(ret);
    }
    /**
    * @param {string} btc_address_str
    * @param {string} amount_sats_str
    * @param {bigint} fee_64
    * @returns {Promise<string>}
    */
    send_btc(btc_address_str, amount_sats_str, fee_64) {
        const ptr0 = passStringToWasm0(btc_address_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(amount_sats_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_send_btc(this.__wbg_ptr, ptr0, len0, ptr1, len1, fee_64);
        return takeObject(ret);
    }
    /**
    * @param {string} addressv_str
    * @param {string} scl_amount_str
    * @param {string} contract_id_str
    * @param {number} number_of_blocks
    * @returns {Promise<string>}
    */
    estimate_fee_scl(addressv_str, scl_amount_str, contract_id_str, number_of_blocks) {
        const ptr0 = passStringToWasm0(addressv_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(scl_amount_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(contract_id_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_estimate_fee_scl(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, number_of_blocks);
        return takeObject(ret);
    }
    /**
    * @param {string} btc_address_str
    * @param {string} amount_sats_str
    * @param {number} number_of_blocks
    * @returns {Promise<string>}
    */
    estimate_fee_btc(btc_address_str, amount_sats_str, number_of_blocks) {
        const ptr0 = passStringToWasm0(btc_address_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(amount_sats_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_estimate_fee_btc(this.__wbg_ptr, ptr0, len0, ptr1, len1, number_of_blocks);
        return takeObject(ret);
    }
    /**
    * @param {string} list_order_json
    * @param {number} number_of_blocks
    * @returns {Promise<string>}
    */
    estimate_fee_list(list_order_json, number_of_blocks) {
        const ptr0 = passStringToWasm0(list_order_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_estimate_fee_list(this.__wbg_ptr, ptr0, len0, number_of_blocks);
        return takeObject(ret);
    }
    /**
    * @param {string} bid_order_json
    * @param {number} number_of_blocks
    * @returns {Promise<string>}
    */
    estimate_fee_bid(bid_order_json, number_of_blocks) {
        const ptr0 = passStringToWasm0(bid_order_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_estimate_fee_bid(this.__wbg_ptr, ptr0, len0, number_of_blocks);
        return takeObject(ret);
    }
    /**
    * @param {number} number_of_airdrops
    * @param {number} number_of_blocks
    * @returns {Promise<string>}
    */
    estimate_fee_airdrop(number_of_airdrops, number_of_blocks) {
        const ret = wasm.sclwallet_estimate_fee_airdrop(this.__wbg_ptr, number_of_airdrops, number_of_blocks);
        return takeObject(ret);
    }
    /**
    * @param {number} number_of_blocks
    * @returns {Promise<string>}
    */
    estimate_fee_mint(number_of_blocks) {
        const ret = wasm.sclwallet_estimate_fee_mint(this.__wbg_ptr, number_of_blocks);
        return takeObject(ret);
    }
    /**
    * @param {number} number_of_blocks
    * @returns {Promise<string>}
    */
    estimate_fee_cancel_bid(number_of_blocks) {
        const ret = wasm.sclwallet_estimate_fee_cancel_bid(this.__wbg_ptr, number_of_blocks);
        return takeObject(ret);
    }
    /**
    * @param {string} listing_utxo
    * @param {number} number_of_blocks
    * @returns {Promise<string>}
    */
    estimate_fee_cancel_listing(listing_utxo, number_of_blocks) {
        const ptr0 = passStringToWasm0(listing_utxo, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_estimate_fee_cancel_listing(this.__wbg_ptr, ptr0, len0, number_of_blocks);
        return takeObject(ret);
    }
    /**
    * @param {string} bid_utxo
    * @param {bigint} fee_64
    * @returns {Promise<string>}
    */
    cancel_bid(bid_utxo, fee_64) {
        const ptr0 = passStringToWasm0(bid_utxo, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_cancel_bid(this.__wbg_ptr, ptr0, len0, fee_64);
        return takeObject(ret);
    }
    /**
    * @param {string} listing_utxo
    * @param {bigint} fee_64
    * @returns {Promise<string>}
    */
    cancel_listing(listing_utxo, fee_64) {
        const ptr0 = passStringToWasm0(listing_utxo, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_cancel_listing(this.__wbg_ptr, ptr0, len0, fee_64);
        return takeObject(ret);
    }
    /**
    * @param {string} ticker
    * @param {string} max_supply
    * @param {string} decimals
    * @param {bigint} fee_64
    * @returns {Promise<string>}
    */
    mint_scl01_contract(ticker, max_supply, decimals, fee_64) {
        const ptr0 = passStringToWasm0(ticker, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(max_supply, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(decimals, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_mint_scl01_contract(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, fee_64);
        return takeObject(ret);
    }
    /**
    * @param {string} ticker
    * @param {string} max_supply
    * @param {string} decimals
    * @param {bigint} fee_64
    * @param {string} airdrop_amount
    * @returns {Promise<string>}
    */
    mint_scl02_contract(ticker, max_supply, decimals, fee_64, airdrop_amount) {
        const ptr0 = passStringToWasm0(ticker, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(max_supply, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(decimals, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(airdrop_amount, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_mint_scl02_contract(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, fee_64, ptr3, len3);
        return takeObject(ret);
    }
    /**
    * @param {string} ticker
    * @param {string} decimals
    * @param {string} addressv_str
    * @param {string} scl_amount_str
    * @param {bigint} fee_64
    * @returns {Promise<string>}
    */
    mint_scl03_contract(ticker, decimals, addressv_str, scl_amount_str, fee_64) {
        const ptr0 = passStringToWasm0(ticker, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(decimals, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(addressv_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(scl_amount_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_mint_scl03_contract(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, fee_64);
        return takeObject(ret);
    }
    /**
    * @returns {Promise<string>}
    */
    get_trusted_pending() {
        const ret = wasm.sclwallet_get_trusted_pending(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @param {string} contract_id
    * @returns {Promise<string>}
    */
    get_tx_history(contract_id) {
        const ptr0 = passStringToWasm0(contract_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_get_tx_history(this.__wbg_ptr, ptr0, len0);
        return takeObject(ret);
    }
    /**
    * @param {string} contract_id_vec
    * @param {bigint} fee_64
    * @returns {Promise<string>}
    */
    airdrop(contract_id_vec, fee_64) {
        const ptr0 = passStringToWasm0(contract_id_vec, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_airdrop(this.__wbg_ptr, ptr0, len0, fee_64);
        return takeObject(ret);
    }
    /**
    * @param {string} list_order_json
    * @param {string} fee_estimate
    * @returns {Promise<string>}
    */
    list_token_batch(list_order_json, fee_estimate) {
        const ptr0 = passStringToWasm0(list_order_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(fee_estimate, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_list_token_batch(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return takeObject(ret);
    }
    /**
    * @param {string} bid_order_json
    * @param {bigint} fee_64
    * @returns {Promise<string>}
    */
    place_bid_batch(bid_order_json, fee_64) {
        const ptr0 = passStringToWasm0(bid_order_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_place_bid_batch(this.__wbg_ptr, ptr0, len0, fee_64);
        return takeObject(ret);
    }
    /**
    * @param {string} unsigned_tx_hex_str
    * @param {string} fulfil_tx
    * @param {string} contract_id_str
    * @returns {Promise<string>}
    */
    accept_bid(unsigned_tx_hex_str, fulfil_tx, contract_id_str) {
        const ptr0 = passStringToWasm0(unsigned_tx_hex_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(fulfil_tx, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(contract_id_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_accept_bid(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
        return takeObject(ret);
    }
    /**
    * @returns {Promise<string>}
    */
    get_btc_tx_history() {
        const ret = wasm.sclwallet_get_btc_tx_history(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * @param {string} contract_id
    * @param {string} dge_id
    * @param {string} donation_address
    * @param {bigint} sats_amount
    * @param {bigint} fee_64
    * @returns {Promise<string>}
    */
    claim_dge(contract_id, dge_id, donation_address, sats_amount, fee_64) {
        const ptr0 = passStringToWasm0(contract_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(dge_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(donation_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_claim_dge(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, sats_amount, fee_64);
        return takeObject(ret);
    }
    /**
    * @param {string} contract_id
    * @param {string} dairdrop_id
    * @param {bigint} fee_64
    * @returns {Promise<string>}
    */
    claim_diminishing_airdrop(contract_id, dairdrop_id, fee_64) {
        const ptr0 = passStringToWasm0(contract_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(dairdrop_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_claim_diminishing_airdrop(this.__wbg_ptr, ptr0, len0, ptr1, len1, fee_64);
        return takeObject(ret);
    }
    /**
    * @param {string} addressv_str
    * @param {string} scl_amount_str
    * @param {string} contract_id_str
    * @param {string} duration_str
    * @param {bigint} fee_64
    * @returns {Promise<string>}
    */
    drip_scl(addressv_str, scl_amount_str, contract_id_str, duration_str, fee_64) {
        const ptr0 = passStringToWasm0(addressv_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(scl_amount_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(contract_id_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(duration_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_drip_scl(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, fee_64);
        return takeObject(ret);
    }
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
    create_diminishing_airdrop(contract_id, pool_amt, sd_amt, period, max, min, single_drop, fee_64) {
        const ptr0 = passStringToWasm0(contract_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(single_drop, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_create_diminishing_airdrop(this.__wbg_ptr, ptr0, len0, pool_amt, sd_amt, period, max, min, ptr1, len1, fee_64);
        return takeObject(ret);
    }
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
    create_dge(contract_id, pool_amt, sats_rate, max_drop, drip_duration, donation_address, single_drop, fee_64) {
        const ptr0 = passStringToWasm0(contract_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(donation_address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(single_drop, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_create_dge(this.__wbg_ptr, ptr0, len0, pool_amt, sats_rate, max_drop, drip_duration, ptr1, len1, ptr2, len2, fee_64);
        return takeObject(ret);
    }
    /**
    * @param {string} contract_id
    * @param {string} rights_utxo
    * @param {string} rights_addr_str
    * @param {bigint} fee_64
    * @returns {Promise<string>}
    */
    mint_token_rtm(contract_id, rights_utxo, rights_addr_str, fee_64) {
        const ptr0 = passStringToWasm0(contract_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(rights_utxo, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(rights_addr_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_mint_token_rtm(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, fee_64);
        return takeObject(ret);
    }
    /**
    * @returns {string}
    */
    gen_seed_phrase() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sclwallet_gen_seed_phrase(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {string}
    */
    new_address() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sclwallet_new_address(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {string}
    */
    get_utxos() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sclwallet_get_utxos(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {string}
    */
    get_balance() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sclwallet_get_balance(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {string}
    */
    get_scl_balance() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.sclwallet_get_scl_balance(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {string} address
    * @returns {boolean}
    */
    is_address(address) {
        const ptr0 = passStringToWasm0(address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.sclwallet_is_address(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
}

export function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

export function __wbindgen_string_new(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

export function __wbindgen_number_new(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
};

export function __wbindgen_cb_drop(arg0) {
    const obj = takeObject(arg0).original;
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
    }
    const ret = false;
    return ret;
};

export function __wbindgen_object_clone_ref(arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
};

export function __wbindgen_string_get(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

export function __wbindgen_error_new(arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

export function __wbindgen_is_undefined(arg0) {
    const ret = getObject(arg0) === undefined;
    return ret;
};

export function __wbindgen_is_null(arg0) {
    const ret = getObject(arg0) === null;
    return ret;
};

export function __wbindgen_is_string(arg0) {
    const ret = typeof(getObject(arg0)) === 'string';
    return ret;
};

export function __wbindgen_boolean_get(arg0) {
    const v = getObject(arg0);
    const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
    return ret;
};

export function __wbindgen_is_bigint(arg0) {
    const ret = typeof(getObject(arg0)) === 'bigint';
    return ret;
};

export function __wbindgen_bigint_from_i64(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
};

export function __wbindgen_jsval_eq(arg0, arg1) {
    const ret = getObject(arg0) === getObject(arg1);
    return ret;
};

export function __wbindgen_bigint_from_u64(arg0) {
    const ret = BigInt.asUintN(64, arg0);
    return addHeapObject(ret);
};

export function __wbindgen_number_get(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof(obj) === 'number' ? obj : undefined;
    getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
};

export function __wbindgen_is_object(arg0) {
    const val = getObject(arg0);
    const ret = typeof(val) === 'object' && val !== null;
    return ret;
};

export function __wbindgen_in(arg0, arg1) {
    const ret = getObject(arg0) in getObject(arg1);
    return ret;
};

export function __wbindgen_jsval_loose_eq(arg0, arg1) {
    const ret = getObject(arg0) == getObject(arg1);
    return ret;
};

export function __wbg_getwithrefkey_3b3c46ba20582127(arg0, arg1) {
    const ret = getObject(arg0)[getObject(arg1)];
    return addHeapObject(ret);
};

export function __wbg_set_8761474ad72b9bf1(arg0, arg1, arg2) {
    getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
};

export function __wbg_fetch_b5d6bebed1e6c2d2(arg0) {
    const ret = fetch(getObject(arg0));
    return addHeapObject(ret);
};

export function __wbg_queueMicrotask_e5949c35d772a669(arg0) {
    queueMicrotask(getObject(arg0));
};

export function __wbg_queueMicrotask_2be8b97a81fe4d00(arg0) {
    const ret = getObject(arg0).queueMicrotask;
    return addHeapObject(ret);
};

export function __wbindgen_is_function(arg0) {
    const ret = typeof(getObject(arg0)) === 'function';
    return ret;
};

export function __wbg_fetch_693453ca3f88c055(arg0, arg1) {
    const ret = getObject(arg0).fetch(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_instanceof_IdbTransaction_10df3bef3829e0dc(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof IDBTransaction;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_error_2d8a3e284956924b(arg0) {
    const ret = getObject(arg0).error;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_setoncomplete_e9993a45b7bfaec4(arg0, arg1) {
    getObject(arg0).oncomplete = getObject(arg1);
};

export function __wbg_setonerror_d17408c3482b10eb(arg0, arg1) {
    getObject(arg0).onerror = getObject(arg1);
};

export function __wbg_commit_07f92304c2c4ba17() { return handleError(function (arg0) {
    getObject(arg0).commit();
}, arguments) };

export function __wbg_objectStore_b0e52dee7e737df7() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).objectStore(getStringFromWasm0(arg1, arg2));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_target_52ddf6955f636bf5(arg0) {
    const ret = getObject(arg0).target;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

export function __wbg_newwithstrandinit_f581dff0d19a8b03() { return handleError(function (arg0, arg1, arg2) {
    const ret = new Request(getStringFromWasm0(arg0, arg1), getObject(arg2));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_instanceof_IdbDatabase_66fc433c8d02b0ee(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof IDBDatabase;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_createObjectStore_45c05e7be9907fde() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = getObject(arg0).createObjectStore(getStringFromWasm0(arg1, arg2), getObject(arg3));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_transaction_632c349fd48458fb() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).transaction(getObject(arg1), takeObject(arg2));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_instanceof_IdbFactory_32ca5b61b481d0d4(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof IDBFactory;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_open_65e0826fa9c7929c() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = getObject(arg0).open(getStringFromWasm0(arg1, arg2), arg3 >>> 0);
    return addHeapObject(ret);
}, arguments) };

export function __wbg_open_7cc5c5a15ff86a65() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).open(getStringFromWasm0(arg1, arg2));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_instanceof_IdbOpenDbRequest_12d009f35ef32f6b(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof IDBOpenDBRequest;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_setonupgradeneeded_73793bc200a4f7b8(arg0, arg1) {
    getObject(arg0).onupgradeneeded = getObject(arg1);
};

export function __wbg_log_a4530b4fe289336f(arg0) {
    console.log(getObject(arg0));
};

export function __wbg_instanceof_IdbRequest_e453a203913b1f6b(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof IDBRequest;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_result_915d75a0bb0397a1() { return handleError(function (arg0) {
    const ret = getObject(arg0).result;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_error_a093a4b69c2260a3() { return handleError(function (arg0) {
    const ret = getObject(arg0).error;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
}, arguments) };

export function __wbg_setonsuccess_a04d5d5a703ed886(arg0, arg1) {
    getObject(arg0).onsuccess = getObject(arg1);
};

export function __wbg_setonerror_80c9bac4e4864adf(arg0, arg1) {
    getObject(arg0).onerror = getObject(arg1);
};

export function __wbg_signal_3c701f5f40a5f08d(arg0) {
    const ret = getObject(arg0).signal;
    return addHeapObject(ret);
};

export function __wbg_new_0ae46f44b7485bb2() { return handleError(function () {
    const ret = new AbortController();
    return addHeapObject(ret);
}, arguments) };

export function __wbg_abort_2c4fb490d878d2b2(arg0) {
    getObject(arg0).abort();
};

export function __wbg_new_7a20246daa6eec7e() { return handleError(function () {
    const ret = new Headers();
    return addHeapObject(ret);
}, arguments) };

export function __wbg_append_aa3f462f9e2b5ff2() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
}, arguments) };

export function __wbg_instanceof_Response_4c3b1446206114d1(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof Response;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_url_83a6a4f65f7a2b38(arg0, arg1) {
    const ret = getObject(arg1).url;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

export function __wbg_status_d6d47ad2837621eb(arg0) {
    const ret = getObject(arg0).status;
    return ret;
};

export function __wbg_headers_24def508a7518df9(arg0) {
    const ret = getObject(arg0).headers;
    return addHeapObject(ret);
};

export function __wbg_text_668782292b0bc561() { return handleError(function (arg0) {
    const ret = getObject(arg0).text();
    return addHeapObject(ret);
}, arguments) };

export function __wbg_add_722143ab0cfcfcbb() { return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).add(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_add_569ae78051f8e08f() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).add(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_createIndex_0d5b84b6aa924bfe() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = getObject(arg0).createIndex(getStringFromWasm0(arg1, arg2), getObject(arg3));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_createIndex_e1a9dfc378a45abb() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    const ret = getObject(arg0).createIndex(getStringFromWasm0(arg1, arg2), getObject(arg3), getObject(arg4));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_delete_e8e3bfaf1ea215be() { return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).delete(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_get_b1f3efa7f2a2f7d1() { return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).get(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_getAll_80971526d798cec8() { return handleError(function (arg0) {
    const ret = getObject(arg0).getAll();
    return addHeapObject(ret);
}, arguments) };

export function __wbg_getAll_fdd34fcde70aac0f() { return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).getAll(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_getAll_fe8fc464dd1b8f94() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).getAll(getObject(arg1), arg2 >>> 0);
    return addHeapObject(ret);
}, arguments) };

export function __wbg_crypto_c48a774b022d20ac(arg0) {
    const ret = getObject(arg0).crypto;
    return addHeapObject(ret);
};

export function __wbg_process_298734cf255a885d(arg0) {
    const ret = getObject(arg0).process;
    return addHeapObject(ret);
};

export function __wbg_versions_e2e78e134e3e5d01(arg0) {
    const ret = getObject(arg0).versions;
    return addHeapObject(ret);
};

export function __wbg_node_1cd7a5d853dbea79(arg0) {
    const ret = getObject(arg0).node;
    return addHeapObject(ret);
};

export function __wbg_msCrypto_bcb970640f50a1e8(arg0) {
    const ret = getObject(arg0).msCrypto;
    return addHeapObject(ret);
};

export function __wbg_require_8f08ceecec0f4fee() { return handleError(function () {
    const ret = module.require;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_getRandomValues_37fa2ca9e4e07fab() { return handleError(function (arg0, arg1) {
    getObject(arg0).getRandomValues(getObject(arg1));
}, arguments) };

export function __wbg_randomFillSync_dc1e9a60c158336d() { return handleError(function (arg0, arg1) {
    getObject(arg0).randomFillSync(takeObject(arg1));
}, arguments) };

export function __wbg_get_f01601b5a68d10e3(arg0, arg1) {
    const ret = getObject(arg0)[arg1 >>> 0];
    return addHeapObject(ret);
};

export function __wbg_length_1009b1af0c481d7b(arg0) {
    const ret = getObject(arg0).length;
    return ret;
};

export function __wbg_new_ffc6d4d085022169() {
    const ret = new Array();
    return addHeapObject(ret);
};

export function __wbg_newnoargs_c62ea9419c21fbac(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

export function __wbg_new_bfd4534b584a9593() {
    const ret = new Map();
    return addHeapObject(ret);
};

export function __wbg_next_9b877f231f476d01(arg0) {
    const ret = getObject(arg0).next;
    return addHeapObject(ret);
};

export function __wbg_next_6529ee0cca8d57ed() { return handleError(function (arg0) {
    const ret = getObject(arg0).next();
    return addHeapObject(ret);
}, arguments) };

export function __wbg_done_5fe336b092d60cf2(arg0) {
    const ret = getObject(arg0).done;
    return ret;
};

export function __wbg_value_0c248a78fdc8e19f(arg0) {
    const ret = getObject(arg0).value;
    return addHeapObject(ret);
};

export function __wbg_iterator_db7ca081358d4fb2() {
    const ret = Symbol.iterator;
    return addHeapObject(ret);
};

export function __wbg_get_7b48513de5dc5ea4() { return handleError(function (arg0, arg1) {
    const ret = Reflect.get(getObject(arg0), getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_call_90c26b09837aba1c() { return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_new_9fb8d994e1c0aaac() {
    const ret = new Object();
    return addHeapObject(ret);
};

export function __wbg_self_f0e34d89f33b99fd() { return handleError(function () {
    const ret = self.self;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_window_d3b084224f4774d7() { return handleError(function () {
    const ret = window.window;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_globalThis_9caa27ff917c6860() { return handleError(function () {
    const ret = globalThis.globalThis;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_global_35dfdd59a4da3e74() { return handleError(function () {
    const ret = global.global;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_set_f2740edb12e318cd(arg0, arg1, arg2) {
    getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
};

export function __wbg_isArray_74fb723e24f76012(arg0) {
    const ret = Array.isArray(getObject(arg0));
    return ret;
};

export function __wbg_push_901f3914205d44de(arg0, arg1) {
    const ret = getObject(arg0).push(getObject(arg1));
    return ret;
};

export function __wbg_instanceof_ArrayBuffer_e7d53d51371448e2(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof ArrayBuffer;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_call_5da1969d7cd31ccd() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_set_d257c6f2da008627(arg0, arg1, arg2) {
    const ret = getObject(arg0).set(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
};

export function __wbg_isSafeInteger_f93fde0dca9820f8(arg0) {
    const ret = Number.isSafeInteger(getObject(arg0));
    return ret;
};

export function __wbg_entries_9e2e2aa45aa5094a(arg0) {
    const ret = Object.entries(getObject(arg0));
    return addHeapObject(ret);
};

export function __wbg_new_60f57089c7563e81(arg0, arg1) {
    try {
        var state0 = {a: arg0, b: arg1};
        var cb0 = (arg0, arg1) => {
            const a = state0.a;
            state0.a = 0;
            try {
                return __wbg_adapter_256(a, state0.b, arg0, arg1);
            } finally {
                state0.a = a;
            }
        };
        const ret = new Promise(cb0);
        return addHeapObject(ret);
    } finally {
        state0.a = state0.b = 0;
    }
};

export function __wbg_resolve_6e1c6553a82f85b7(arg0) {
    const ret = Promise.resolve(getObject(arg0));
    return addHeapObject(ret);
};

export function __wbg_then_3ab08cd4fbb91ae9(arg0, arg1) {
    const ret = getObject(arg0).then(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_then_8371cc12cfedc5a2(arg0, arg1, arg2) {
    const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
};

export function __wbg_buffer_a448f833075b71ba(arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
};

export function __wbg_newwithbyteoffsetandlength_d0482f893617af71(arg0, arg1, arg2) {
    const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_new_8f67e318f15d7254(arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
};

export function __wbg_set_2357bf09366ee480(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
};

export function __wbg_length_1d25fa9e4ac21ce7(arg0) {
    const ret = getObject(arg0).length;
    return ret;
};

export function __wbg_instanceof_Uint8Array_bced6f43aed8c1aa(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof Uint8Array;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

export function __wbg_newwithlength_6c2df9e2f3028c43(arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_subarray_2e940e41c0f5a1d9(arg0, arg1, arg2) {
    const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_has_9c711aafa4b444a2() { return handleError(function (arg0, arg1) {
    const ret = Reflect.has(getObject(arg0), getObject(arg1));
    return ret;
}, arguments) };

export function __wbg_set_759f75cd92b612d2() { return handleError(function (arg0, arg1, arg2) {
    const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
    return ret;
}, arguments) };

export function __wbg_stringify_e1b19966d964d242() { return handleError(function (arg0) {
    const ret = JSON.stringify(getObject(arg0));
    return addHeapObject(ret);
}, arguments) };

export function __wbindgen_bigint_get_as_i64(arg0, arg1) {
    const v = getObject(arg1);
    const ret = typeof(v) === 'bigint' ? v : undefined;
    getBigInt64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? BigInt(0) : ret;
    getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
};

export function __wbindgen_debug_string(arg0, arg1) {
    const ret = debugString(getObject(arg1));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

export function __wbindgen_memory() {
    const ret = wasm.memory;
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper906(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 322, __wbg_adapter_50);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper908(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 322, __wbg_adapter_50);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper1025(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 354, __wbg_adapter_55);
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper1295(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 433, __wbg_adapter_58);
    return addHeapObject(ret);
};

