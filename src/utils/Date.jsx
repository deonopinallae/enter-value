export default function getDateFormat(date, separator = '.') {
	let month = Number(date.getMonth()) + 1

	function checkDateLowThanTen(el) {
		if (el < 10) {
			el = '0' + el
		}
		return el
	}

	const fullDate =
		checkDateLowThanTen(date.getDate()) +
		separator +
		checkDateLowThanTen(month) +
		separator +
		date.getFullYear() + ' ' +
		date.getHours() + ':' +
		checkDateLowThanTen(date.getMinutes()) + ':' +
		checkDateLowThanTen(date.getSeconds())
	return fullDate
}
