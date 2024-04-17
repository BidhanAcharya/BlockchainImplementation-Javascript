const bodyParser=require('body-parser');
const express =require('express');
const request =require('request');
const Blockchain = require('./blockchain');
const PubSub = require('./publishsubscribe');
const DEFAULTPORT=8000;

const ROOT_NODE_ADDRESS=`http://localhost:${DEFAULTPORT}`;

const app = express();
const blockchain=new Blockchain();
const pubsub=new PubSub({blockchain});
setTimeout(()=>pubsub.broadcastChain(),1000);

app.use(bodyParser.json());
app.get('/api/blocks',(req,res)=>{
    res.json(blockchain.chain);
})

const syncChains=()=>{ 
    request({url:`${ROOT_NODE_ADDRESS}/api/blocks`},(error,response,body)=>{
        if(!error && response.statusCode===200){
            const rootChain=JSON.parse(body);
            console.log('replace chain on a sync with',rootChain);
            blockchain.replaceChain(rootChain);
        }
    }); 
}


let PEER_PORT;
if(process.env.GENERATE_PEER_PORT==='true'){
    PEER_PORT=DEFAULTPORT+Math.ceil(Math.random()*1000);
}
const PORT=PEER_PORT||DEFAULTPORT;

app.listen(PORT,()=>{

    console.log(`Listening at localhost:${PORT}`);
    syncChains();
})



// console.log(localhost:8000/api/blocks)

app.post("/api/mine",(req,res)=>{
    const {data}=req.body;
    blockchain.addBlock({data});
    pubsub.broadcastChain();
    res.redirect('/api/blocks');
    
    

});
