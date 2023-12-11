let inputTitle = document.getElementById('inputTitle')
let input = document.getElementById('input')

let outputTitle = document.getElementById('outputTitle')
let output = document.getElementById('output')

let convertButton = document.getElementById('convertButton')

convertButton.addEventListener('click', () => {
	output.value = convert(input.value)
})

function convert(inputText){
	let csvHeaders = inputText.split(/[",]\n/)[0].split(',')
	let csvRows = inputText.split(/[",]\n/).splice(1)
	let csvContent = []
	for(i in csvHeaders)[
		csvHeaders[i] = csvHeaders[i].replaceAll('"', '')
	]
	for(i in csvRows){
		csvRows[i] = csvRows[i].replaceAll('"', '')
		csvContent.push(csvRows[i].split(','))
	}

	jsonResult = []
	for(i in csvContent){
		jsonResult.push({})
		for(j in csvHeaders){
			jsonResult[i][csvHeaders[j]] = csvContent[i][j]
		}
	}

	console.log(jsonResult)

	let outputText = 'flowchart TD\n'
	let mapName = {}
	for(index in jsonResult){
		mapName[jsonResult[index]["ID"]] = index
		outputText += `${index}[${jsonResult[index]["ID"]} - ${jsonResult[index]["Title"]}]\n`
	}
	for(index in jsonResult){
		if(jsonResult[index]["Parent issue"] != ''){
			outputText += `${mapName[jsonResult[index]["Parent issue"]]}-->${index}`
		}
	}
	return outputText
}