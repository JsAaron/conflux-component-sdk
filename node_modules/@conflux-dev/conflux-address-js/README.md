# conflux-address-js

The simple encoder and decoder for Conflux address.

Check [CIP-37](https://github.com/Conflux-Chain/CIPs/pull/53/) for the protocols.

## Install

```sh
$ npm install @conflux-dev/conflux-address-js
```

## Opt-in for performance

To gain a address conversion performance boost, you can install [`@conflux-dev/conflux-address-rust`](https://github.com/conflux-fans/conflux-address-rust-binding) in your project. Which will be used to replace the purejs version and can gain a `10-100` performance boost.

```sh
$ npm install --save-optional @conflux-dev/conflux-address-rust
```

## Usage

### Encoding

```javascript
const confluxAddr = require('@conflux-dev/conflux-address-js')
const hexBuffer = Buffer.from('106d49f8505410eb4e671d51f7d96d2c87807b09', 'hex')
const netId = 1029 // Conflux main-net

console.log(confluxAddr.encode(hexBuffer, netId))
// cfx:aajg4wt2mbmbb44sp6szd783ry0jtad5bea80xdy7p

console.log(confluxAddr.encode(hexBuffer, netId, true)) // verbose mode to generate address with type
// CFX:TYPE.USER:AAJG4WT2MBMBB44SP6SZD783RY0JTAD5BEA80XDY7P
```

### Decoding

```javascript
const confluxAddr = require('@conflux-dev/conflux-address-js')
console.log(confluxAddr.decode('cfx:aajg4wt2mbmbb44sp6szd783ry0jtad5bea80xdy7p'))
/*
{ hexAddress:
   <Buffer 10 6d 49 f8 50 54 10 eb 4e 67 1d 51 f7 d9 6d 2c 87 80 7b 09>,
  netId: 1029,
  type: 'user' }
 */


console.log(confluxAddr.decode('CFX:TYPE.USER:AAJG4WT2MBMBB44SP6SZD783RY0JTAD5BEA80XDY7P'))
/*
{ hexAddress:
   <Buffer 10 6d 49 f8 50 54 10 eb 4e 67 1d 51 f7 d9 6d 2c 87 80 7b 09>,
  netId: 1029,
  type: 'user' }
 */
```

### API

* `encode`: Low level encode method
* `decode`: Low level decode method
* `isValidCfxAddress`: Return a boolean value indicating whether the address is valid
* `verifyCfxAddress`: Check whether a address is valid, if not will throw an error
* `hasNetworkPrefix`: Check a string whether has an network prefix
* `simplifyCfxAddress`: Return a non verbose address
* `shortenCfxAddress`: Return a shorten address
* `isZeroAddress`: Check whether a address is zero address
* `isInternalContractAddress`: Check where a address is Conflux InternalContract address
* `isValidHexAddress`: Check whether a address is valid hex address
* `isValidCfxHexAddress`: Check where a address is valid Conflux hex address
