let chars = [];
let active = [];
let chartype = 'txt';
let listactive = 0;
const textbox = document.getElementById('editor');
const outbox = document.getElementById("editor");

function insert(val, type) {
	chartype = type;
	if (type === 'txt') {
		if (val === 'a') {
			if (!(active.includes(val))) {
				let src = prompt('Enter URL');
				chars.push(`<a href=${src}>`);
				active.push(val);
			} else if (active.includes(val)) {
				chars.push("</a>");
				active.splice(active.indexOf(val), 1);
			}
		} else if (val === 'img') {
			if (!(active.includes(val))) {
				let src = prompt('Enter URL');
				chars.push(`<img src=${src}>`);
				active.push(val);
			}
		} else {
			if (!(active.includes(val))) {
				chars.push(`<${val}>`);
				active.push(val);
			} else if (active.includes(val)) {
				chars.push(`</${val}>`);
				active.splice(active.indexOf(val), 1);
			}
		}
	} else if (type === 'list') {
		if (!(active.includes(val))) {
			chars.push(`<${val}>`);
			active.push(val);
		} else if (active.includes(val)) {
			chars.push(`</li></${val}>`);
			chartype = 'txt';
			active.splice(active.indexOf(val), 1);
		}
	}
	updateOutbox();
}

textbox.addEventListener('keydown', function (e) {
    e.preventDefault();
    if (e.key === "Backspace") {
        chars.pop();
    } 
    else if (e.key.length === 1) {
        let char = e.key;
        chars.push(char);
    }
	if (chartype === 'list') {
		if (e.key === "Enter") {
			chars.push("</li>");
			listactive = 0;
		}
		if (listactive === 0) {
			if (e.key === "Enter") {
				chars.push("<li>");
				listactive = 1;
			}
		}
	} else if (chartype === "txt") {
		if (e.key === "Enter") {
			chars.push("<br>");
		}
	}
    updateOutbox();
});

function updateOutbox() {
    outbox.innerHTML = chars.join('');
}

function download(format) {
	let filename = "document.html"; //also a safety net
	let type = "html"; //safety net
    const html = chars.join('');
	if (format === "md") {
		filename = "document.md";
		type = "text/markdown";
	} else {
		filename = "document.html";
		type = "text/html";
	}
    const blob = new Blob([html], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}