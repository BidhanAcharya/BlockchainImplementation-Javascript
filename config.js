const  MINE_RATE=1000;// ms
const INITIAL_DIFFICULTY = 2;
const GENESIS_DATA = { 
    timestamp: 1,
    prevHash: '0x0000',
    hash: '0x123',
    difficulty: INITIAL_DIFFICULTY,
    nonce:0,
    data: [],

};

module.exports = { GENESIS_DATA };
console.log(GENESIS_DATA,MINE_RATE);
