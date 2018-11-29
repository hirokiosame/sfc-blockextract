const through = require('through');
const ptrn = /\<cypress\>((?:.|\n)+)\<\/cypress\>/;

function sfcBlockextract(file) {
	if (!/.vue$/.test(file)) {
		return through();
	}

	let data = '';
	return through(
		function write(buf) {
			data += buf;
		},
		function end() {
			const match = data.match(ptrn);
			if (!match) {
				return this.emit('error', 'cypress block not found');
			}

			this.queue(match[1]);
			this.queue(null);
		}
	);
}

module.exports = sfcBlockextract;
