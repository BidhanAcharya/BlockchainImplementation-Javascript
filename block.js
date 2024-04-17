const hexToBinary = require('hex-to-binary');
const { GENESIS_DATA } = require('./config');
 // import the GENESIS_DATA object from config.js
 const { MINE_RATE } = require('./config'); // import the MINE_RATE constant from config.js
const cryptoHash = require('./crypto-hash'); // import the cryptoHash function from crypto-hash.js

class Block {
    constructor({ timestamp, prevHash, hash, data, nonce, difficulty }) {
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis() {
        return new this(GENESIS_DATA);
    }
    static mineBlock({prevBlock, data}){
        let hash,timestamp;
        const  prevHash=prevBlock.hash;
        let nonce=0;
        let {difficulty}=prevBlock;
        do{
            nonce++;
            timestamp=Date.now();
            difficulty=Block.adjustDifficulty({originalBlock:prevBlock,timestamp});
            hash=cryptoHash(timestamp,prevHash,data,nonce,difficulty);

        } while(hexToBinary(hash).substring(0,difficulty)!=='0'.repeat(difficulty));
         
         return new this({
            timestamp,
            prevHash,
            data,
            difficulty,
            nonce,
            hash    
         })

    }
    static adjustDifficulty({originalBlock,timestamp}){
        const {difficulty}=originalBlock;
        if(difficulty<1) {
            return 1;
        }
        const difference =timestamp-originalBlock.timestamp;
       
        if(difference>MINE_RATE) 
        {
            return difficulty-1;
        }
        return difficulty+1;
    }
}



const block1 = new Block({
    timestamp: '2/09/22',
    prevHash: '0x0000',
    hash: '0x0001',
    data: 'Hello World'
});


module.exports = Block;


// console.log(block1);
// const genesisBlock = Block.genesis(); // directly call the genesis method by using the class name
// console.log(genesisBlock);
// const result=Block.mineBlock({prevBlock:block1,data:'block2'}); //directly call the mineBlock method by using the class name
// // console.log(result);







