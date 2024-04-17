const crypto = require('crypto');
const cryptoHash=(...inputs)=>{

    const hash=crypto.createHash('sha256'); // Create a hash object using SHA-256 algorithm
    hash.update(inputs.sort().join('')); // Update the hash with data to be hashed
    // even if the order of the inputs changes, the hash will be the same
    return hash.digest('hex');// Get the final hash digest in hexadecimal format
    
}


result= cryptoHash('Hello','World');
// console.log(result);
module.exports=cryptoHash; // Export the function to be used in other files