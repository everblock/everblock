const Web3 = require("web3")

async function consulta(request, response) {

	const { hash } = request.query;

	var myContract = require('web3-eth-contract');

	const provider = new Web3.providers.HttpProvider("https://rinkeby-light.eth.linkpool.io");
	//"https://rinkeby.infura.io/v3/1e2d6c8480ba48b69c9eace5b5b25211"
	const web3 = new Web3(provider);

	web3.eth.defaultAccount = await web3.eth.accounts[0];

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


	var output1 = await myContract.methods.receber(hash).call((error, result) => {

		if (result[0] == '') {


			response.json({

				Resposta: 'Arquivo inválido ou não registrado'
			})



		} else

			response.json({

				metadado1: result[0],
				metadado2: result[1],
				metadado3: result[2],
				metadado4: result[3],
				metadado5: result[4],
				metadado6: result[5],
			})

		//alert(result[0]+ ','+result[1]);    ok
	});


}




/*
function tempo(request,response){

const dynamicDate= new Date();

response.json({

	date: dynamicDate.toGMTString()
})

}*/


export default consulta;