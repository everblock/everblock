const Web3 = require("web3")



export default function handler(req, res) {
	if (req.method === 'POST') {
		console.log(req.body);
		var JJ = req.body;
		res.status(200).json({ name: JJ.pid })
	  } else {
		// Handle any other HTTP method
	  }
	
	
	
	

	

  }