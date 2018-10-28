function getLocation() {
    return new Promise(function (resolve, reject) {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
}

function parsePosition(position) {
	console.log(position);
    return {
		'latitude': position.coords.latitude,
		'longitude': position.coords.longitude
	}
}

export default getLocation;

