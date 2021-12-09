/* ===== SHA256 with Crypto-js ===================================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js      |
|  =============================================================*/

const SHA256 = require("crypto-js/sha256");

/* ===== Block Class ===================================
|  Class with a constructor for block data model       |
|  ====================================================*/
class Block {
  constructor(data) {
    (this.hash = ""),
      (this.height = ""),
      (this.data = data),
      (this.timeStamp = ""),
      (this.previousblockhash = "0x");
  }
}

/* ===== Blockchain ===================================
|  Class with a constructor for blockchain data model  |
|  with functions to support:                          |
|     - createGenesisBlock()                           |
|     - getLatestBlock()                               |
|     - addBlock()                                     |
|     - getBlock()                                     |
|     - validateBlock()                                |
|     - validateChain()                                |
|  ====================================================*/
class Blockchain {
  constructor() {
    // new chain array
    this.chain = [];
    // add first genesis block
    this.addBlock(this.createGenesisBlock());
  }

  createGenesisBlock() {
    return new Block("First block in the chain - Genesis block");
  }

  // getLatest block method
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  // addBlock method
  addBlock(newBlock) {
    // block height
    newBlock.height = this.chain.length;
    // UTC timestamp
    newBlock.timeStamp = new Date().getTime().toString().slice(0, -3);
    if (this.chain.length > 0) {
      // previous block hash
      newBlock.previousBlockHash = this.getLatestBlock().hash;
    }
    // SHA256 requires a string of data
    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
    console.log(JSON.stringify(newBlock));
    // add block to chain
    this.chain.push(newBlock);
  }
}
