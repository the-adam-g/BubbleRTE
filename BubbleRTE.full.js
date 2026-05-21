let chars = [];
let active = [];
let chartype = 'txt';
let listactive = 0;
const textbox = document.getElementById('editor');
const outbox = document.getElementById("editor");

function insert(val, type) {
	chartype = type;
	if (type === 'txt') {
		if (!(active.includes(val))) {
			chars.push(`<${val}>`);
			active.push(val);
		} else if (active.includes(val)) {
			chars.push(`</${val}>`);
			active.splice(active.indexOf(val), 1);
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