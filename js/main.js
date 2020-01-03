function toRGB(c) {
	if (c == 0) {
		return "rgb(204, 204, 204)!important;";
	}

	return `rgb(${(c & 0xff0000) >> 16}, ${(c & 0x00ff00) >> 8}, ${c &
	0x0000ff})!important;`;
}

function getBrightness(c) {
	if (c == 0) {
		return 204;
	}

	let r = (c & 0xff0000) >> 16;
	let g = (c & 0x00ff00) >> 8;
	let b = c & 0x0000ff;

	return Math.round((r * 299 + g * 587 + b * 114) / 1000);
}

// compile the template
var template = $("#list-template").html();

// Compile the template data into a function
var templateScript = Handlebars.compile(template);
// https://pastebin.com/raw/sXPktQ7h


document.getElementById("submit").onclick = function(e) {
	e.preventDefault();
	parser(document.getElementById("rolesData").value);
};

function parser( data ) {
	var context = JSON.parse( data );
	var html = templateScript(context);

	$("div.list-group").append(html).append(function() {
		$(".role-colour").each(function() {
			let role = this;
			let base = this.parentElement.parentElement;

			let colour = this.getAttribute("colour");
			let rgb = toRGB(parseInt(colour));
			let b = getBrightness(parseInt(colour));

			role.style = `background-color:${rgb}`;
			base.style = `border-color:${rgb};`;

			base.onclick = function() {
			let icon = role.querySelector("i.icons");
			role.on = !role.on;
			if (role.on) {
				role.style.width = "60px";
				icon.style.color = b > 125 ? "#000" : "#fff";
				icon.style.opacity = 1;
				clearTimeout(base.animationTimer);
			} else {
				icon.style.opacity = 0;
				base.animationTimer = setTimeout(function() {
				role.style.width = null;
				}, 250);
			}

			return false;
			};
		});
	});

	$(".loader").addClass("animate");
	setTimeout(function() {
		$(".loader").remove();
	}, 1010);
}