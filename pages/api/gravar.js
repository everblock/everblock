 const Web3 = require("web3")

 function gravar(request, response) {
	const apiSecret = process.env.PKMINHA;
	if (request.method === 'POST') {

		var dados = request.body;
		//res.status(200).json({ name: JJ.pid })q

		// const { hash } = request.query;

		var myContract = require('web3-eth-contract');

		const provider = new Web3.providers.HttpProvider("https://rinkeby-light.eth.linkpool.io");
		//"https://rinkeby.infura.io/v3/1e2d6c8480ba48b69c9eace5b5b25211"
		const web3 = new Web3(provider);

		web3.eth.defaultAccount = web3.eth.accounts[0];

		myContract = new web3.eth.Contract([
			{
				"constant": false,
				"inputs": [
					{
						"name": "name",
						"type": "string"
					},
					{
						"name": "birthdate",
						"type": "string"
					},
					{
						"name": "department",
						"type": "string"
					},
					{
						"name": "CPF",
						"type": "string"
					},
					{
						"name": "email",
						"type": "string"
					},
					{
						"name": "id",
						"type": "string"
					}
				],
				"name": "register",
				"outputs": [
					{
						"name": "R",
						"type": "string"
					}
				],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"name": "",
						"type": "uint256"
					}
				],
				"name": "HashIds",
				"outputs": [
					{
						"name": "",
						"type": "string"
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
						"name": "novo",
						"type": "string"
					}
				],
				"name": "receber",
				"outputs": [
					{
						"name": "a",
						"type": "string"
					},
					{
						"name": "b",
						"type": "string"
					},
					{
						"name": "c",
						"type": "string"
					},
					{
						"name": "d",
						"type": "string"
					},
					{
						"name": "e",
						"type": "string"
					},
					{
						"name": "f",
						"type": "string"
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
						"name": "novo",
						"type": "string"
					}
				],
				"name": "receber2",
				"outputs": [
					{
						"name": "a",
						"type": "string"
					},
					{
						"name": "b",
						"type": "string"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			}
		], '0xA0638824B89524ebF9c015cFeBc1442eB1111095');



		const tx = {
			from: '0x73A95592ddac218D0cA98eaf90bF168c3D45e883', to: '0xA0638824B89524ebF9c015cFeBc1442eB1111095',
			gas: 9000000,
			//value: 1, 
			data: myContract.methods.register(dados.metadado1, dados.metadado2, dados.metadado3, dados.metadado4, dados.metadado5, dados.hash).encodeABI()
		};

		var SENHA = apiSecret;
		const signPromise = web3.eth.accounts.signTransaction(tx, SENHA);
		// $(".resultado").html('Cadastro sendo efetuado na blockchain, por favor aguarde...');

		signPromise.then((signedTx) => {

			// raw transaction string may be available in .raw or 
			// .rawTransaction depending on which signTransaction
			// function was called
			const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);

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
				// do something on transaction error

				console.log(err);
			});

		}).catch((err) => {

			// do something when promise fails
			console.log("errodd2");

		});







		//alert(result[0]+ ','+result[1]); 
	};




};


/*
function tempo(request,response){

const dynamicDate= new Date();

response.json({

	date: dynamicDate.toGMTString()
})

}*/


export default gravar;