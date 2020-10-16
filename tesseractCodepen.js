// * https://stackoverflow.com/a/15369753 http://jsfiddle.net/bt7BU/225/ Clipboard onPaste */
/* Tesseract.js https://github.com/naptha/tesseract.js#tesseractjs */

function loadTesseractScript () {
	if ( document.body ) {
		document.body.onpaste = function (event) {
		  // use event.originalEvent.clipboard for newer chrome versions
		  var items = (event.clipboardData  || event.originalEvent.clipboardData).items;
		  console.log(JSON.stringify(items)); // will give you the mime types
		  // find pasted image among pasted items
		  var blob = null;
		  for (var i = 0; i < items.length; i++) {
			if (items[i].type.indexOf("image") === 0) {
			  blob = items[i].getAsFile();
			}
		  }
		  // load image if there is a pasted image
		  if (blob !== null) {
			var reader = new FileReader();
			reader.onload = function(event) {
			  document.getElementById('Output').value = "Working....";
			  console.log(event.target.result); // clipboard image data url!
			  Tesseract.recognize(blob,'eng',{ logger: m => { /* if ( m.progress != 1 )*/
					document.getElementById('Output').value = m.status + " " + (m.progress * 100).toFixed(0) + "%" 
					console.log(m)
				  }
			  }).then(({ data: { text } }) => { document.getElementById('Output').value = text; })
			  //console.log(event.target.result) 
			  document.getElementById("pastedImage").src = event.target.result;
			};
			reader.readAsDataURL(blob);
		  }
		}
		document.body.onresize = function () {
			if (window.innerHeight >= window.innerWidth) {
				document.getElementById('Output').style.width = "calc(100% - 60px)"; 
				document.getElementById('Output').style.height = "calc(50% - 60px)";
				document.getElementById('imageHolder').style.width = "100%";
			} else {
				document.getElementById('Output').style.width = "calc(50% - 60px)"; 
				document.getElementById('Output').style.height = "calc(100% - 60px)";
				document.getElementById('imageHolder').style.width = "50%";
			}
		}
	} else {
		setTimeout(loadTesseractScript, 5);
	}
	
}
loadTesseractScript();