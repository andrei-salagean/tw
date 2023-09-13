function automateAlarm(checkInterval) {
  console.log('Start checking...');

  const incomingsForm = document.getElementById('incomings_table');

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function sendData() {
    
	if (incomingsForm) {
	  // Get all rows in the table
	  const rows = incomingsForm.querySelectorAll('tr');

	  // Iterate through each row
	  rows.forEach((row) => {
		// Get all cells in the row
		const cells = row.querySelectorAll('td');
		if (cells.length === 0){
		 return
		}
		console.log("cells", cells)
		const attackData = {
			porunca: cells[0]?.textContent?.replace("\n","")?.replace("\t",""),
			directie: cells[1]?.textContent?.replace("\n","")?.replace("\t",""),
			origine: cells[2]?.textContent?.replace("\n","")?.replace("\t",""),
			jucator: cells[3]?.textContent?.replace("\n","")?.replace("\t",""),
			distanta: cells[4]?.textContent?.replace("\n","")?.replace("\t",""),
			sosire: cells[5]?.textContent?.replace("\n","")?.replace("\t",""),
			soseste_in: cells[6]?.textContent?.replace("\n","")?.replace("\t","")
		}
		console.log("attackData", attackData)
		// Iterate through each cell
		//cells.forEach((cell) => {
		  // You now have access to individual cell
		  //console.log(cell.textContent);
		//});
		
		fetch('https://discord.com/api/webhooks/1151637013271949452/qR7akA79tEAZGu48khkpYzIzTV9wuUguSJT9fjSuIEDtU2Sk2izCLuC8BojTgDq0ReK4', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({
			content: `${attackData.porunca} + ${attackData.directie} + ${attackData.origine} + ${attackData.jucator} + ${attackData.distanta}`
		  })
		  
		})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.error('Error:', error));
	  });
	} else {
	  console.error('Table not found');
	}
    

    setTimeout(sendData, checkInterval);
  }

  sendData()
    .catch((error) => {
      console.error('ERROR - ', error);
      setTimeout(checkStock, 1000);
    });
}

automateAlarm(50000);