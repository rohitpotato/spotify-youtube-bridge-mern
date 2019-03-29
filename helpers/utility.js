const isObjectEmpty = (ob) => {

	for(var key in ob) {
 
			if(ob.hasOwnProperty(key)) {
 
				return false
			}
		}
 
		return true;
};

module.exports = isObjectEmpty;