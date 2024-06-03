export function mapToRange(
	value: number,
	valFrom: number,
	valTo: number,
	rangeFrom: number,
	rangeTo: number
) {
	return rangeFrom + (rangeTo - rangeFrom) * ((value - valFrom) / (valTo - valFrom));
}
