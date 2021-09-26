const Web3 = require("web3")

 async function gochain(request, response) {
	const apiSecret = process.env.PKMINHA;
	var X;
	
       const { hash } = request.query;
       const { cost } = request.query;
		var dados = request.body;
		//res.status(200).json({ name: JJ.pid })q

		// const { hash } = request.query;

		var myContract = require('web3-eth-contract');

		const provider = new Web3.providers.HttpProvider("https://rpc.gochain.io");
		//https://rinkeby-light.eth.linkpool.io
		//"https://rinkeby.infura.io/v3/1e2d6c8480ba48b69c9eace5b5b25211"
		const web3 = new Web3(provider);

		web3.eth.defaultAccount = await web3.eth.accounts[0];

		myContract = new web3.eth.Contract([
            {
              "constant": false,
              "inputs": [
                {
                  "name": "cid",
                  "type": "bytes"
                }
              ],
              "name": "newWallet",
              "outputs": [],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [],
              "name": "rate",
              "outputs": [
                {
                  "name": "",
                  "type": "uint256"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "name": "cid",
                  "type": "bytes"
                }
              ],
              "name": "pin",
              "outputs": [],
              "payable": true,
              "stateMutability": "payable",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [
                {
                  "name": "cid",
                  "type": "bytes"
                }
              ],
              "name": "wallet",
              "outputs": [
                {
                  "name": "",
                  "type": "address"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [
                {
                  "name": "hash",
                  "type": "bytes32"
                }
              ],
              "name": "cidByHash",
              "outputs": [
                {
                  "name": "",
                  "type": "bytes"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [],
              "name": "deployed",
              "outputs": [
                {
                  "name": "",
                  "type": "uint256"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "name": "user",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "name": "cid",
                  "type": "bytes"
                },
                {
                  "indexed": false,
                  "name": "bh",
                  "type": "uint256"
                }
              ],
              "name": "Pinned",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "name": "user",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "name": "cid",
                  "type": "bytes"
                },
                {
                  "indexed": false,
                  "name": "wallet",
                  "type": "address"
                }
              ],
              "name": "CreatedWallet",
              "type": "event"
            }
          ], '0x6F7cbcf57762842a4C66F8e7d6135b2e7bcF7b52');
		//0xA0638824B89524ebF9c015cFeBc1442eB1111095npn start


          var binario1=hash;
		 const  tx = {
			from: '0x73A95592ddac218D0cA98eaf90bF168c3D45e883', to: '0x6F7cbcf57762842a4C66F8e7d6135b2e7bcF7b52',
			gas: 9000000,
			value: cost,//'001100628461842112',
      //       63793473600000000 
			data: myContract.methods.pin(binario1).encodeABI()
		};

		var SENHA = apiSecret;
		 const signPromise =  web3.eth.accounts.signTransaction(tx, SENHA);
		// $(".resultado").html('Cadastro sendo efetuado na blockchain, por favor aguarde...');

		signPromise.then((signedTx) => {

			// raw transaction string may be available in .raw or 
			// .rawTransaction depending on which signTransaction
			// function was called
			const sentTx =  web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);

			  sentTx.on("receipt", receipt => {
				
				 response.status(200).json({

					Status: 'Cadastrado com sucesso',
					Txhash: receipt.transactionHash
				});
				// do something when receipt comes back
				//	 $(".resultado").html('Arquivo registrado com sucesso!<br> Hash da transação: <a href=https://rinkeby.etherscan.io/tx/'+receipt.transactionHash+'>'+receipt.transactionHash+' </a><br><br>');

				//	console.log(receipt);
				//	console.log(receipt.transactionHash);

			});

			sentTx.on("error", err => {
				response.status(404).json({

					Status: 'erro'
				});

				console.log(err);
			});

		}).catch((err) => {

			// do something when promise fails
			response.status(200).json({

				Status: 'erro'
			});
			console.log("errodd2");

		});


		//return response.status(405).end();
		
		//return await response.status(405).end();

		//alert(result[0]+ ','+result[1]); 
	



};


/*
function tempo(request,response){

const dynamicDate= new Date();

response.json({

	date: dynamicDate.toGMTString()
})

}*/


export default gochain;