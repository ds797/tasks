export const methods = () => {
	Array.prototype.insert = function(index, item) {
		let build = [...this];

		build.splice(index, 0, item);

		return build;
	}

	Array.prototype.grep = function(callback) {
		let build = [];
		for (let i = 0; i < this.length; i++) {
			const result = callback(this[i], i, this);
			if (result) build.push(result);
		}

		return build;
	}
}