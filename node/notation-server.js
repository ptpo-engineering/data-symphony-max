const express = require("express");
const app = express();
const maxAPI = require("max-api");

function anypost(str) {
	if (maxAPI) {
		Max.post(str);
	} else {
		console.log(str);
	}
}

app.get("/", function (req, res) {
	let responseText = "";
	if (maxAPI) {
		maxAPI.getDict("pagestats")
			.then((dict) => {
				dict.accesses = dict.accesses ? dict.accesses + 1 : 1;
				maxAPI.updateDict("pagestats", "accesses", dict.accesses);
				responseText += "<p>Hello, Max!</p>";
				responseText += `<p>
					This page has been loaded ${dict.accesses} ${dict.accesses === 1 ? "time" : "times"}.
				</p>`;
				responseText += `<p>
					The slider is at ${dict.slider ? dict.slider : 0}
				</p>`;
				res.send(responseText);
			})
			.catch((err) => {
				responseText += "<p>Had trouble connecting to Max</p>";
				responseText += `<p>${err}</p>`;
				res.send(responseText);
			});
	} else {
		res.send("<p>Hello! This simple server is not running inside of Max.<p>");
	}
});

app.listen(3000, function () {
	anypost("Example app listening on port 3000!");
	if (maxAPI) maxAPI.outlet("ready");
});
