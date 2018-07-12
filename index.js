function handleFiles(files) {
	if (window.FileReader) {
		readFile(files[0]);
	} else {
		alert('JavaScript FileReader not supported in this browser.');
	}
}

function readFile(fileToRead) {
	var reader = new FileReader();
	reader.onload = loadHandler;
	reader.onerror = errorHandler;
	reader.readAsText(fileToRead);
}

function loadHandler(event) {
	var csv = event.target.result;
	csvJSON(csv);
}

function errorHandler(event) {
	if(event.target.error.name == "NotReadableError") {
		alert("Can't read file");
	}
}

function csvJSON(csv){

  var lines = csv.split("\n");
  // another way to do it
  // var lines = csv.split(/\r\n|\n/)

  var result = [];
  var headers=lines[0].split(",");

  for(var i = 1; i < lines.length; i++) {
	  var obj = {};
	  var currentline = lines[i].split(",");

	  for(var j = 0; j < headers.length; j++) {
		  obj[headers[j]] = currentline[j];
	  }
	  result.push(obj);
  }

  //return result; //JavaScript object
  console.log(JSON.stringify(result))
  return JSON.stringify(result); //JSON
}
