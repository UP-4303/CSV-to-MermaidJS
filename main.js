let inputTitle = document.getElementById('inputTitle')
let input = document.getElementById('input')

let outputTitle = document.getElementById('outputTitle')
let output = document.getElementById('output')

let convertButton = document.getElementById('convertButton')

convertButton.addEventListener('click', () => {
	output.value = convert(input.value)
})

function parseCsv(inputText){
	let csvRaw = inputText.split(/[",]\n/)
	let csvHeaders = csvRaw[0].split(/,/)
	let csvRows = csvRaw.splice(1)
	let fieldRegex = /(|"[^"]*")(?:,)/

	let csvContent = []
	for(i in csvHeaders)[
		csvHeaders[i] = csvHeaders[i].replace(/"/g, '')
	]
	
	for(i in csvRows){
		csvRows[i] = csvRows[i].replace(/[\[\]]/g, '')
		csvContent.push([])
		let row = csvRows[i]
		while ((found = fieldRegex.exec(row)) !== null){

			let field = found[0].replace(/"/g, '')
			field = field.substring(0,field.length-1) // We don't want the trailing comma
			csvContent[csvContent.length-1].push(field)
			row = row.substring(found[0].length)
		}
	}

	let csv = csvContent
	csv.splice(0,0,csvHeaders)

	return csv
}

function csvToJson(csv){
	let csvHeaders = csv[0]
	let csvContent = csv.splice(1)
	let json = []
	for(i in csvContent){
		json.push({})
		for(j in csvHeaders){
			json[i][csvHeaders[j]] = csvContent[i][j]
		}
	}
	return json
}

function convert(inputText){
	let csv = parseCsv(inputText)
	console.log(csv)
	let json = csvToJson(csv)
	console.log(json)

	let outputText = 'flowchart TD\n'
	let mapName = {}
	for(index in json){
		mapName[json[index]["ID"]] = index
		outputText += `${index}[${json[index]["ID"]} - ${json[index]["Title"]} - ${json[index]["Estimate"]}]\n`
	}
	for(index in json){
		if(json[index]["Parent issue"] != ''){
			outputText += `${mapName[json[index]["Parent issue"]]}-->${index}\n`
		}
	}
	return outputText
}