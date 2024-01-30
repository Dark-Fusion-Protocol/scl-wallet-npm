# NPM Library

---

# Initialization

> [!NOTE]
> An empty SCLWallet object must be created to use the library.
```javascript
import SclWallet 

var wallet = new SclWallet();
```

## Create Wallet

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| wallet_name | string | The name of the wallet. | "WalletName" |
| password | string | The password of the wallet. | "password" |

### Code

```javascript
const result = await wallet.create_wallet(wallet_name, password);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result": "water danger cupboard garlic offer display lake boring piece clay identify giggle" }``` | result | The wallet is created successfully. |
| ```{ "Result": "Wallet already exists!" }``` | result | The wallet has already been created with that name. |
| ```{ "Error": "Database error." }``` | error | There is an issue with the indexedDB. |

## Init

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| wallet_name | string | The name of the wallet. | "WalletName" |
| password | string | The password of the wallet. | "password" |
| network | string | The network you are using (mainnet or testnet). | "mainnet" |
| esplora_url | string | The address of the esplora you are using. | "https://blockstream.info/" |

### Code

```javascript
const result = await wallet.init(wallet_name, password, network, esplora_url);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result": "Wallet successfully loaded." }``` | result | The wallet is loaded successfully. |
| ```{ "Error": "Database error." }``` | error | There is an issue with the indexedDB. |
| ```{ "Error": "Decryption failed. Wrong password." }``` | error | The password is incorrect. |
| ```{ "Error": "You need to call create wallet first!" }``` | error | A wallet has not been created yet. |

## Generate Wallet

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| wallet_name | string | The name of the wallet. | "WalletName" |
| password | string | The password of the wallet. | "password" |
| seed_phrase | string | The seed phrase generated on wallet creation. | "water danger cupboard garlic offer display lake boring piece clay identify giggle" |

### Code

```javascript
const result = await wallet.generate_wallet(wallet_name, password, seed_phrase);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result": "water danger cupboard garlic offer display lake boring piece clay identify giggle" }``` | result | The wallet is created successfully. |
| ```{ "Result": "Wallet already exists!" }``` | result | The wallet has already been created with that name. |
| ```{ "Error": "Database error." }``` | error | There is an issue with the indexedDB. |
| ```{ "Error": "Invalid mnemonic." }``` | error | The mnemonic is invalid. |

## Has Wallet

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| wallet_name | string | The name of the wallet. | "WalletName" |

### Code

```javascript
const result = await wallet.has_wallet(wallet_name);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result": "Wallet exists." }``` | result | The wallet exists. |
| ```{ "Result": "No Wallet found." }``` | result | The wallet does not exist. |
| ```{ "Error": "Database error." }``` | error | There is an issue with the indexedDB. |

## Generate Seed Phrase

### Code

```javascript
const result = wallet.gen_seed_phrase();
```

### Results

| Output | Type | Description |
|---|---|---|
| ```"water danger cupboard garlic offer display lake boring piece clay identify giggle"``` | result | Generate the mnemonic. |

## Sync

### Code

```javascript
const result = await wallet.sync();
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result": "Sync Successful." }``` | result | The wallet has synced successfully. |
| ```{ "Error": "Database error." }``` | error | There is an issue with the indexedDB. |
| ```{ "Error": "Wallet not initialized." }``` | error | There is an issue with finding the esplora url/finding the address. |
| ```{ "Error": "Failed to get result." }``` | error | There is an issue checking the UTXOs. |
| "Unable to deserialize response" | error | There is an issue deserializing the UTXOs. |
| "error" | error | There is an issue creating the url with the esplora_url and address. |

## Get Mnemonic

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| password | string | The password of the wallet. | "password" |

### Code

```javascript
const result = await wallet.get_mnemonic(password);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result": "water danger cupboard garlic offer display lake boring piece clay identify giggle" }``` | result | The mnemonic is returned. |
| ```{ "Error": "Database error." }``` | error | There is an issue with the indexedDB. |
| ```{ "Error": "Wallet not initialized." }``` | error | The wallet is not initialized. |
| ```{ "Error": "Deserialization failed." }``` | error | There is an issue deserializing the mnemonic. |
| ```{ "Error": "Decryption failed. Wrong password." }``` | error | The password is incorrect. |

---

# BTC

## Get Balance

### Code

```javascript
const result = wallet.get_balance();
```

### Results

| Output | Type | Description |
|---|---|---|
| ``` ``` | result | The confirmed and unconfirmed balances of BTC. |
| ```{ "Error": "Wallet not initialized." }``` | error | The wallet is not initialized. |

## Send BTC

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| addresses | string | The addresses to send to. Seperate multiple addresses by a space. | "tb1qgc0pnx734s3kt8n875u2cqtum0vrk5re3nfrj3" |
| amount | string | The send amount in sats. Seperate multiple amounts by a space. | "10000" |
| fee | int_64 | The transaction fee worked out in estimate_fee_btc. | 420 |

### Code

```javascript
const result = await wallet.send_btc(addresses, sats_amount, fee);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result": "839efc9745c9e3711831f7e3c0fb848470108455f9f2c540c148d796a7dbeb21" }``` | result | The transaction ID of the send transaction. |
| ```{ "Error": "Wallet needs to sync." }``` | error | The wallet has not synced yet. |
| ```{ "Error": "Wallet not initialized." }``` | error | The wallet is not initialized. |
| ```{ "Error": "Database error." }``` | error | There is an issue with the indexedDB. |
| ```{ "Error": "Failed to parse address." }``` | error | The format of the address is incorrect. |
| ```{ "Error": "Failed to parse amount." }``` | error | The format of the amount is incorrect. |
| ```{ "Error": "Insufficient funds." }``` | error | There is insufficient BTC to make this send transaction. |
| ```{ "Error": "Failed to deserialize transaction." }``` | error | There is an issue deserializing the send transaction. |
| ```{ "Error": "Failed to broadcast transaction." }``` | error | There is an issue broadcasting the send transaction. |

## Get BTC Transaction History

### Code

```javascript
const result = await wallet.get_btc_tx_history();
```

### Results

| Output | Type | Description |
|---|---|---|
| ``` ``` | result | The transaction history for BTC. |
| ```{ "Error": "Wallet needs to sync." }``` | error | The wallet has not synced yet. |
| ```{ "Error": "Wallet not initialized." }``` | error | The wallet is not initialized. |

---

# SCL

## Get SCL Balance

### Code

```javascript
const result = wallet.get_scl_balance();
```

### Results

| Output | Type | Description |
|---|---|---|
| ``` ``` | result | The confirmed and unconfirmed balances of all SCL assets. |
| ```{ "Error": "Wallet not initialized." }``` | error | The wallet is not initialized. |
| ``` ``` | error | *response error* |

## Send SCL

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| addresses | string | The addresses to send to. Seperate multiple addresses by a space. | "tb1qgc0pnx734s3kt8n875u2cqtum0vrk5re3nfrj3" |
| amount | string | The send amount in SCL. Seperate multiple amounts by a space. | "10000" |
| contract_id | string | The ID of the contract. | "792965f15b1d4254e547681832b9bdc3feb411bf2d80ce1a6b6bb22793880b6b" |
| fee | int_64 | The fee worked out in estimate_fee_scl. | 420 |

### Code

```javascript
const result = await wallet.send_scl(addresses, scl_amount, contract_id, fee);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result": "892dd30adf026eea6d1c062af77405e441921c4907b0f77298ecdc8b18ec7c70" }``` | result | The transaction ID of the send transaction. |
| ```{ "Error": "Wallet needs to sync." }``` | error | The wallet has not synced yet. |
| ```{ "Error": "Wallet not initialized." }``` | error | The wallet is not initialized. |
| ```{ "Error": "Database error." }``` | error | There is an issue with the indexedDB. |
| ```{ "Error": "Failed to parse address." }``` | error | The format of the address is incorrect. |
| ```{ "Error": "Failed to parse amount." }``` | error | The format of the amount is incorrect. |
| ```{ "Error": "Contract not found." }``` | error | The contract ID is not in the wallet. |
| ```{ "Error": "Insuffienct funds." }``` | error | There is insufficient SCL assets to make this send transaction. |
| ```{ "Error": "Not enough BTC to cover fees." }``` | error | There is insufficient BTC to make this send transaction. |
| ```{ "Error": "Failed to deserialize transaction." }``` | error | There is an issue deserializing the send transaction. |
| ```{ "Error": "Failed to broadcast transaction." }``` | error | There is an issue broadcasting the send transaction. |
| ```{ "Error": "Failed to broadcast payload." }``` | error | There is an issue broadcasting the send transaction. |

## Get Transaction History

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| contract_id | string | The ID of the contract being used. | "792965f15b1d4254e547681832b9bdc3feb411bf2d80ce1a6b6bb22793880b6b" |

### Code

```javascript
const result = await wallet.get_tx_history(contract_id);
```

### Results

| Output | Type | Description |
|---|---|---|
| ``` ``` | result | The transaction history for SCL assets. |
| ```{ "Error": "Wallet needs to sync." }``` | error | The wallet has not synced yet. |
| ```{ "Error": "Wallet not initialized." }``` | error | The wallet is not initialized. |
| ```{ "Error": "Contract not found." }``` | error | The contract ID is not in the wallet. |
| ``` ``` | error | *response error* |

---

# Fees

## Estimate Fee BTC

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| addresses | string | The addresses to send to. Seperate multiple addresses by a space. | "tb1qgc0pnx734s3kt8n875u2cqtum0vrk5re3nfrj3" |
| amount | string | The send amount in BTC. Seperate multiple amounts by a space. | "63210" |
| number_of_blocks | int_32 | The number of blocks for fee estimation. The lower the number, the higher the fee. | 5 |

### Code

```javascript
const result = await wallet.estimate_fee_btc(addresses, amount, number_of_blocks);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result": "585" }``` | result | The fee estimation for a BTC transaction. |
| ```{ "Error": "Wallet needs to sync." }``` | error | The wallet has not synced yet. |
| ```{ "Error": "Failed to parse address." }``` | error | The format of the address is incorrect. |
| ```{ "Error": "Failed to parse amount." }``` | error | The format of the amount is incorrect. |

## Estimate Fee SCL

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| addresses | string | The addresses to send to. Seperate multiple addresses by a space. | "tb1qgc0pnx734s3kt8n875u2cqtum0vrk5re3nfrj3" |
| amount | string | The send amount in SCL. Seperate multiple amounts by a space. | "125 150 4500" |
| contract_id | string | The id of the contract being used. | "792965f15b1d4254e547681832b9bdc3feb411bf2d80ce1a6b6bb22793880b6b" |
| number_of_blocks | int_32 | The number of blocks for fee estimation. The lower the number, the higher the fee. | 5 |

### Code

```javascript
const result = await wallet.estimate_fee_scl(addresses, amount, contract_id, number_of_blocks);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result": "1685" }``` | result | The fee estimation to send this SCL transaction. |
| ```{ "Error": "Wallet needs to sync." }``` | error | The wallet has not synced yet. |
| ```{ "Error": "Failed to parse address." }``` | error | The format of the address is incorrect. |
| ```{ "Error": "Failed to parse amount." }``` | error | The format of the amount is incorrect. |
| ```{ "Error": "Contract not found." }``` | error | The contract ID is not in the wallet. |

## Estimate Fee Mint

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| number_of_blocks | int_32 | The number of blocks for fee estimation. The lower the number, the higher the fee. | 5 |

### Code

```javascript
const result = await wallet.estimate_fee_mint(number_of_blocks);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result": "1135" }``` | result | The fee estimation to make this mint. |
| ```{ "Error": "Wallet needs to sync." }``` | error | The wallet has not synced yet. |

## Estimate Fee List

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| list_order_json | string | A list of listings containing contract_id, amount, price_per_token. | *see example json below* |
| number_of_blocks | int_32 | The number of blocks for fee estimation. The lower the number, the higher the fee. | 5 |

```json
{
	"contract_id": "de3e6478bf37224a58be08ab7b8b7094400e0edcff5a829248b1fd02f5d7f0e1",
	"amount": 100000,
	"price_per_token": 2500
},
{
	"contract_id": "09f590fc69175307307af184c2c53358a40630eddce420a45b14a959b8d03bd3",
	"amount": 100000,
	"price_per_token": 2500
}
```

### Code

```javascript
const result = await wallet.estimate_fee_list(list_order_json, number_of_blocks);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result": "2270 585" }``` | result | The fee estimation to make this listing. The actual fee followed by the hard fee. |
| ```{ "Error": "Failed to deserialize list order json object." }``` | error | The list order json failed to deserialize. |
| ```{ "Error": "Wallet needs to sync." }``` | error | The wallet has not synced yet. |
| ```{ "Error": "Contract not found." }``` | error | The contract ID is not in the wallet. |

## Estimate Fee List Cancel

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| listing_utxo | string | The UTXO the listing is bound to. | "dba8b3df2aaaa9c9a9e61a4ac61f2fabe5bd6cb2682dc4a17cbf9af3ae16e548" |
| number_of_blocks | int_32 | The number of blocks for fee estimation. The lower the number, the higher the fee. | 5 |

### Code

```javascript
const result = await wallet.estimate_fee_cancel_listing(list_order_json, number_of_blocks);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result": "1100" }``` | result | The fee estimation to cancel this listing. |
| ```{ "Error": "Wallet needs to sync." }``` | error | The wallet has not synced yet. |
| ```{ "Error": "Listing UTXO not in cabinet." }``` | error | The listing has already been successfully bid on.  |

## Estimate Fee Bid

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| bid_order_json | string |  A list of bids containing a list of contracts with their associated orders. | *see example json below* |
| number_of_blocks | int_32 | The number of blocks for fee estimation. The lower the number, the higher the fee. | 5 |

```json
{
	"contract_id": "de3e6478bf37224a58be08ab7b8b7094400e0edcff5a829248b1fd02f5d7f0e1",
	"orders": [
		{
			"order_id": "06d9a1a4b1c6a622de362a51567b010979898aa9891ca71a5a56596dbfbc38e8",
			"purchase_amount": 100000,
			"purchase_price": 2500,
			"pay_address": "tb1qategau6gdfakhhf4n23dtg47eht6225ypfcvv2",
			"listing_utxo": "dba8b3df2aaaa9c9a9e61a4ac61f2fabe5bd6cb2682dc4a17cbf9af3ae16e548:1"
		},
		{
			"order_id": "25bf5e449ccb2c817e2323b571f96f694ff53c89cca88dd40ec93bf83d2eb443",
			"purchase_amount": 10000,
			"purchase_price": 4500,
			"pay_address": "tb1qategau6gdfakhhf4n23dtg47eht6225ypfcvv2",
			"listing_utxo": "dba8b3df2aaaa9c9a9e61a4ac61f2fabe5bd6cb2682dc4a17cbf9af3ae16e548:1"
		}
	]
}
```

### Code

```javascript
const result = await wallet.estimate_fee_bid(bid_order_json, number_of_blocks);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result": "585" }``` | result | The fee estimation for bidding on this listing. |
| ```{ "Error": "Failed to deserialize bid order json object." }``` | error | The bid order json failed to deserialize. |
| ```{ "Error": "Wallet needs to sync." }``` | error | The wallet has not synced yet. |
| ```{ "Error": "Contract not found." }``` | error | The contract ID is not in the wallet. |

## Estimate Fee Bid Cancel

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| number_of_blocks | int_32 | The number of blocks for fee estimation. The lower the number, the higher the fee. | 5 |

### Code

```javascript
const result = await wallet.estimate_fee_cancel_bid(number_of_blocks);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result": "585" }``` | result | The fee estimation for cancelling this bid. |
| ```{ "Error": "Wallet needs to sync." }``` | error | The wallet has not synced yet. |

## Estimate Fee Airdop

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| number_of_airdops | int_32 | The number of airdrops. | 125 |
| number_of_blocks | int_32 | The number of blocks for fee estimation. The lower the number, the higher the fee. | 5 |

### Code

```javascript
const result = await wallet.estimate_fee_airdrop(number_of_airdops, number_of_blocks);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result": "16141" }``` | result | The fee estimation to claim this airdrop. |
| ```{ "Error": "Wallet needs to sync." }``` | error | The wallet has not synced yet. |

---

# Contracts

## Import Contract

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| contract_json | string | The serialized json of the contract. | *see example json below* |

```json
{
	"contract_id":"bdcdc39f36353082e4bc1025bb45ab7a50afe07950355a1fed4640ce8f469b60",
	"ticker":"TEST 200",
	"rest_url":"http://13.23.87.456:8080/",
	"contract_type":"SCL01",
	"decimals":8
}
```

### Code

```javascript
const result = await wallet.import_contract(contract_json);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result": "Import successful." }``` | result | The contract was imported successfully. |
| ```{ "Error": "Database error." }``` | error | There is an issue with the indexedDB. |

## Delete Contract

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| contract_id | string | The id of the contract to be deleted. | "792965f15b1d4254e547681832b9bdc3feb411bf2d80ce1a6b6bb22793880b6b" |

### Code

```javascript
const result = await wallet.delete_contract(contract_id);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result": "Delete successful." }``` | result | The contract was deleted successfully. |
| ```{ "Error": "Database error." }``` | error | There is an issue with the indexedDB. |
| ```{ "Error": "Contract doesn't exist in db." }``` | error | The contract does not exist in the wallet. |

## Get Contract

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| contract_id | string | The id of the contract to get. | "792965f15b1d4254e547681832b9bdc3feb411bf2d80ce1a6b6bb22793880b6b" |

### Code

```javascript
const result = await wallet.get_contract(contract_id);
```

### Results

| Output | Type | Description |
|---|---|---|
| ``` ``` | result | The contract was gotten successfully. |
| ```{ "Error": "Database error." }``` | error | There is an issue with the indexedDB. |

## Get Contracts

### Code

```javascript
const result = await wallet.get_contracts();
```

### Results

| Output | Type | Description |
|---|---|---|
| ``` ``` | result | The contracts were gotten successfully. |
| ```{ "Error": "Database error." }``` | error | There is an issue with the indexedDB. |

---

# Minting

## Mint SCL01 Contract

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| ticker | string | The name of the SCL asset. | "SMOL" |
| max_supply | string | The max supply of SCL assets. | "31415900000000" |
| decimals | string | The number of decimals the SCL asset has. | "8" |
| fee | int_64 | The fee worked out in estimate_fee_mint. | 1756 |

### Code

```javascript
const result = await wallet.mint_scl01_contract(ticker, max_supply, decimals, fee);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result":"5e73fe53cf33648755899f9f8252d969d7d36808f7339f8fe67033b1430f9987" }``` | result | The transaction ID of the mint transaction. |
| ```{ "Error": "Wallet needs to sync." }``` | error | The wallet has not synced yet. |
| ```{ "Error": "Wallet not initialized." }``` | error | The wallet is not initialized. |
| ```{ "Error": "Database error." }``` | error | There is an issue with the indexedDB. |
| ```{ "Error": "Insufficient funds." }``` | error | There is insufficient BTC to mint this contract. |
| ```{ "Error": "Failed to deserialize transaction." }``` | error | There is an issue deserializing the mint transaction. |
| ```{ "Error": "Failed to broadcast transaction." }``` | error | There is an issue broadcasting the mint transaction. |

## Mint SCL02 Contract

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| ticker | string | The name of the SCL asset. | "ELON" |
| max_supply | string | The max supply of SCL assets. | "42069420690" |
| decimals | string | The number of decimals the SCL asset has. | "8" |
| fee | int_64 | The fee worked out in estimate_fee_mint. | 1756 |
| airdrop_amount | string | The amount of SCL assets per airdop. | 420690 |

### Code

```javascript
const result = await wallet.mint_scl02_contract(ticker, max_supply, decimals, fee, airdrop_amount);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result":"0eebc6baa4463e8f0f9f8cf31440ed12e9f312671b334de97e338380ee1f5cc1" }``` | result | The transaction ID of the mint transaction. |
| ```{ "Error": "Wallet needs to sync." }``` | error | The wallet has not synced yet. |
| ```{ "Error": "Wallet not initialized." }``` | error | The wallet is not initialized. |
| ```{ "Error": "Database error." }``` | error | There is an issue with the indexedDB. |
| ```{ "Error": "Insufficient funds." }``` | error | There is insufficient BTC to mint this contract. |
| ```{ "Error": "Failed to deserialize transaction." }``` | error | There is an issue deserializing the mint transaction. |
| ```{ "Error": "Failed to broadcast transaction." }``` | error | There is an issue broadcasting the mint transaction. |

## Mint SCL03 Contract

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| ticker | string | The name of the SCL asset. | "DFG" |
| decimals | string | The number of decimals the SCL asset has. | "8" |
| address | string | The address of the minted assets. Seperate multiple addresses by a space. | "tb1qlh458zyuv4kc9g4pawvczss0tz09ht0u28e7u3" |
| amount | string | The amount of SCL assets minted. Seperate multiple amounts by a space. | "10000000000000000" |
| fee | int_64 | The fee worked out in estimate_fee_mint. | 1756 |


### Code

```javascript
const result = await wallet.mint_scl03_contract(ticker, decimals, address, amount, fee);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result":"adc110d77942e3e4ca9f2c585249a8d3b82d5b5a82563a0a01e9c591837d99d5" }``` | result | The transaction ID of the mint transaction. |
| ```{ "Error": "Wallet needs to sync." }``` | error | The wallet has not synced yet. |
| ```{ "Error": "Wallet not initialized." }``` | error | The wallet is not initialized. |
| ```{ "Error": "Database error." }``` | error | There is an issue with the indexedDB. |
| ```{ "Error": "Failed to parse address." }``` | error | There is an issue with the parsing one of the addresses. |
| ```{ "Error": "Failed to parse amount." }``` | error | There is an issue with the parsing one of the amounts. |
| ```{ "Error": "Insufficient funds." }``` | error | There is insufficient BTC to mint this contract. |
| ```{ "Error": "Failed to deserialize transaction." }``` | error | There is an issue deserializing the mint transaction. |
| ```{ "Error": "Failed to broadcast transaction." }``` | error | There is an issue broadcasting the mint transaction. |

---

# Listing

## Create Listing

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| list_order_json | string | An array of listings. | *see example json below* |
| fee | int_64 | The fee worked out in estimate_fee_list. The actual fee followed by the hard fee. | "1756 585" |

```json
{
	"contract_id": "de3e6478bf37224a58be08ab7b8b7094400e0edcff5a829248b1fd02f5d7f0e1",
	"amount": 100000,
	"price_per_token": 2500
},
{
	"contract_id": "09f590fc69175307307af184c2c53358a40630eddce420a45b14a959b8d03bd3",
	"amount": 100000,
	"price_per_token": 2500
}
```

### Code

```javascript
const result = await wallet.list_token_batch(list_order_json, fee);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result":"c894c5c8ea21bfe8c9aa0d9295db235ad74ec307ed4a493c06dd0393288608f7" } ``` | result | The transaction ID of the listing transaction. |
| ```{ "Error": "Failed to deserialize list order json object." }``` | error | The list order json failed to deserialize. |
| ```{ "Error": "Invalid fee estimation string." }``` | error | The format of the fee is incorrect. |
| ```{ "Error": "Failed to parse fee." }``` | error | There is an issue parsing the actual/hard fee. |
| ```{ "Error": "Wallet needs to sync." }``` | error | The wallet has not synced yet. |
| ```{ "Error": "Wallet not initialized." }``` | error | The wallet is not initialized. |
| ```{ "Error": "Database error." }``` | error | There is an issue with the indexedDB. |
| ```{ "Error": "Contract not found." }``` | error | The contract ID is not in the wallet. |
| ```{ "Error": "Insuffient token funds." }``` | error | There are not enough tokens to make this listing transaction. |
| ```{ "Error": "Not enough BTC to cover fees." }``` | error | There is insufficient BTC to make this listing transaction. |
| ```{ "Error": "Failed to deserialize transaction." }``` | error | There is an issue deserializing the listing transaction. |
| ```{ "Error": "Failed to broadcast transaction." }``` | error | There is an issue broadcasting the listing transaction. |
| ```{ "Error": "Failed to broadcast payload." }``` | error | There is an issue broadcasting the listing payload. |

## Cancel Listing

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| listing_utxo | string | The UTXO the listing is bound to. | "dba8b3df2aaaa9c9a9e61a4ac61f2fabe5bd6cb2682dc4a17cbf9af3ae16e548" |
| fee | int_64 | The fee worked out in estimate_fee_list_cancel. | 1756 |

### Code

```javascript
const result = await wallet.cancel_listing(listing_utxo, fee);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result":"c6dee0b8c41255ddd4faba2916b37797a5c0632ba56fa597c72471fa8fde39f3" } ``` | result | The transaction ID of the cancel listing transaction. |
| ```{ "Error": "Wallet needs to sync." }``` | error | The wallet has not synced yet. |
| ```{ "Error": "Wallet not initialized." }``` | error | The wallet is not initialized. |
| ```{ "Error": "Database error." }``` | error | There is an issue with the indexedDB. |
| ```{ "Error": "Listing UTXO not in cabinet." }``` | error | The listing has already been successfully bid on.  |
| ```{ "Error": "Not enough BTC to cover fees." }``` | error | There is insufficient BTC to make this cancel listing transaction. |
| ```{ "Error": "Failed to deserialize transaction." }``` | error | There is an issue deserializing the cancel listing transaction. |
| ```{ "Error": "Failed to broadcast transaction." }``` | error | There is an issue broadcasting the cancel listing transaction. |
| ```{ "Error": "Failed to broadcast payload." }``` | error | There is an issue broadcasting the cancel listing payload. |

---

# Bidding

## Create Bid

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| bid_order_json | string | An array of bids containing a array of contracts with their associated bids.  | *see example json below* |
| fee | int_64 | The fee worked out in estimate_fee_bid. | 1756 |

```json
{
	"contract_id": "de3e6478bf37224a58be08ab7b8b7094400e0edcff5a829248b1fd02f5d7f0e1",
	"orders": [
		{
			"order_id": "06d9a1a4b1c6a622de362a51567b010979898aa9891ca71a5a56596dbfbc38e8",
			"purchase_amount": 100000,
			"purchase_price": 2500,
			"pay_address": "tb1qategau6gdfakhhf4n23dtg47eht6225ypfcvv2",
			"listing_utxo": "dba8b3df2aaaa9c9a9e61a4ac61f2fabe5bd6cb2682dc4a17cbf9af3ae16e548:1"
		},
		{
			"order_id": "25bf5e449ccb2c817e2323b571f96f694ff53c89cca88dd40ec93bf83d2eb443",
			"purchase_amount": 10000,
			"purchase_price": 4500,
			"pay_address": "tb1qategau6gdfakhhf4n23dtg47eht6225ypfcvv2",
			"listing_utxo": "dba8b3df2aaaa9c9a9e61a4ac61f2fabe5bd6cb2682dc4a17cbf9af3ae16e548:1"
		}
	]
}
```

### Code

```javascript
const result = await wallet.place_bid_batch(bid_order_json, fee);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{" Result":"0195788746a3aef6d84385e908b4eb9328b98d1d08e0c7741ae8726c5d672d76" }``` | result | The transaction ID of the bid transaction. |
| ```{ "Error": "Failed to deserialize bid order json object." }``` | error | The bid_order_json failed to deserialize. |
| ```{ "Error": "Wallet needs to sync." }``` | error | The wallet has not synced yet. |
| ```{ "Error": "Wallet not initialized." }``` | error | The wallet is not initialized. |
| ```{ "Error": "Database error." }``` | error | There is an issue with the indexedDB. |
| ```{ "Error": "Contract not found." }``` | error | The contract ID is not in the wallet. |
| ```{ "Error": "Insuffient funds." }``` | error | There is insufficient BTC to make this listing transaction. |
| ```{ "Error": "Failed to deserialize transaction." }``` | error | There is an issue deserializing the bid transaction. |
| ```{ "Error": "Failed to broadcast transaction." }``` | error | There is an issue broadcasting the bid transaction. |
| ```{ "Error": "Failed to broadcast payload." }``` | error | There is an issue broadcasting the bid payload. |

## Accept Bid

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| unsigned_tx_hex | string |  | "0200000001900327a4f57651ac442c35066dcaaa6e17de5c7510277b5fa42565a60fa6e87a0100000000ffffffff022602000000000000160014f3c7491bedda954b105ee60e7a32d7aee6e685860000000000000000226a20da1ecba9ebbf936b53c940a22e1bda3a16492871faa63054906d74a15a6de66c00000000" |
| fulfil_tx | string |  | "02000000000102b5ba860041b15437601ab4bf2c54ccf5d9f7ae757f08ac8a467b3c97f654bd350000000000ffffffff378695168ed4aa95bcf572b6250f91d7aaa85caa04a9330f3e188a0448d6cb660000000000ffffffff032602000000000000160014f3c7491bedda954b105ee60e7a32d7aee6e685862d00000000000000160014eaf28ef3486a7b6bdd359aa2d5a2becdd7a52a840000000000000000226a20ad18a45f73df467ffea6fcecbf1574b7841fda0fd1be948a48118f9583757f1902483045022100bfa467b40a6715079b7d3e07be92447de2e61c21458702d9b1365894f75591df0220429005625d57e4ea44d46459a2a0768d3732dce1c746d2cc801e8528c1a793580121036674a057f385a5a8a74dfbd457711f282b9ea28cb781422cbbd6b6f42d9ab6c702483045022100f5a73800f696a877d5f5194e3a3daefebc27601ddcbfeae5946ff0daca213ed802204fa7939d43efa79fd37758bf70288a7743d50a0b4ab10e17800f0b55763457030121036674a057f385a5a8a74dfbd457711f282b9ea28cb781422cbbd6b6f42d9ab6c700000000" |
| contract_id | string |  | "792965f15b1d4254e547681832b9bdc3feb411bf2d80ce1a6b6bb22793880b6b" |

### Code

```javascript
const result = await wallet.accept_bid(unsigned_tx_hex, fulfil_tx, contract_id);
```

### Results

| Output | Type | Description |
|---|---|---|
| ``` ``` | result | The transaction ID of the accept bid transaction. |
| ```{ "Error": "Wallet needs to sync." }``` | error | The wallet has not synced yet. |
| ```{ "Error": "Invalid Accept TX." }``` | error | The unsigned_tx_hex is invalid. |
| ```{ "Error": "Invalid Fulfil TX." }``` | error | The fulfil_tx is invalid. |
| ```{ "Error": "Wallet not initialized." }``` | error | The wallet is not initialized. |
| ```{ "Error": "Contract not found." }``` | error | The contract ID is not in the wallet. |
| ```{ "Error": "Failed to deserialize tx." }``` | error | There is an issue deserializing the unsigned_tx_hex. |
| ```{ "Error": "Failed to deserialize transaction." }``` | error | There is an issue deserializing the accept bid transaction. |
| ```{ "Error": "Failed to broadcast transaction." }``` | error | There is an issue broadcasting the accept bid transaction. |
| ```{ "Error": "Failed to broadcast payload." }``` | error | There is an issue broadcasting the accept bid payload. |

## Cancel Bid

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| bid_utxo | string | The UTXO the bid is bound to. | "dba8b3df2aaaa9c9a9e61a4ac61f2fabe5bd6cb2682dc4a17cbf9af3ae16e548" |
| fee | int_64 | The fee worked out in estimate_fee_bid_cancel. | 1756 |

### Code

```javascript
const result = await wallet.cancel_bid(bid_utxo, fee);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result":"243afbb1aa0c3e04f8b165416d3ee02ce175f22dae1b997d7ba06d12e88e388f"``` | result | The transaction ID of the cancel bid transaction. |
| ```{ "Error": "Wallet needs to sync." }``` | error | The wallet has not synced yet. |
| ```{ "Error": "Wallet not initialized." }``` | error | The wallet is not initialized. |
| ```{ "Error": "Database error." }``` | error | There is an issue with the indexedDB. |
| ```{ "Error": "Bidding UTXO not in cabinet." }``` | error | The bid has already been successfully accepted.  |
| ```{ "Error": "Not enough BTC to cover fees." }``` | error | There is insufficient BTC to make this cancel bid transaction. |
| ```{ "Error": "Failed to deserialize transaction." }``` | error | There is an issue deserializing the cancel bid transaction. |
| ```{ "Error": "Failed to broadcast transaction." }``` | error | There is an issue broadcasting the cancel bid transaction. |
| ```{ "Error": "Failed to broadcast payload." }``` | error | There is an issue broadcasting the cancel bid payload. |

---

# Airdrop

## Claim Airdrop

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| contract_ids | string | The IDs of the contracts that is being claimed. Seperate multiple contracts by a space. | "09f590fc69175307307af184c2c53358a40630eddce420a45b14a959b8d03bd3" |
| fee | int_64 | The fee worked out in estimate_fee_airdop. | 1756 |

### Code

```javascript
const result = await wallet.airdrop(contract_ids, fee);
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result":"04affa741549ea4f9f2f331a36f83906b558862bf2e70bef833ef1f8e14bc3f2"} ``` | result | The transaction ID of the airdrop transaction. |
| ```{ "Error": "Wallet needs to sync." }``` | error | The wallet has not synced yet. |
| ```{ "Error": "Wallet not initialized." }``` | error | The wallet is not initialized. |
| ```{ "Error": "Database error." }``` | error | There is an issue with the indexedDB. |
| ```{ "Error": "Insufficient funds." }``` | error | There is insufficient BTC to make this airdrop transaction. |
| ```{ "Error": "Failed to deserialize transaction." }``` | error | There is an issue deserializing the airdrop transaction. |
| ```{ "Error": "Failed to broadcast transaction." }``` | error | There is an issue broadcasting the airdrop transaction. |
| ```{ "Error": "Failed to broadcast payload." }``` | error | There is an issue broadcasting the airdrop payload. |

---

# Utilities

## New Address

### Code

```javascript
const result = wallet.new_address();
```

### Results

| Output | Type | Description |
|---|---|---|
| ```{ "Result":"tb1qgc0pnx734s3kt8n875u2cqtum0vrk5re3nfrj3" }``` | result | The address of the wallet. |
| ```{ "Error":"Wallet not initialized." }``` | error | The address is invalid. |

## Is Address

### Parameters

| Parameter | Type | Description | Example |
|---|---|---|---|
| address | string | The address of the wallet. | "tb1qgc0pnx734s3kt8n875u2cqtum0vrk5re3nfrj3" |

### Code

```javascript
const result = wallet.is_address(address);
```

### Results

| Output | Type | Description |
|---|---|---|
| true | result | The address is valid. |
| false | result | The address is invalid. |

---
