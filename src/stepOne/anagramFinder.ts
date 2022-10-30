export class AnagramFinder {
	public async isAnagram(string1: string, string2: string): Promise<boolean> {
		if (!await this.isValueValid(string1) || !await this.isValueValid(string2))
			throw new Error('Value is a virus')

		return string1.toLowerCase().split("").sort().join("") ===
			string2.toLowerCase().split("").sort().join("")
	}

	private isValueValid(value: string): Promise<boolean> {
		return new Promise<boolean>(resolve => {
			setTimeout(() => {
				resolve(value !== 'virus')
			}, 1000)
		})
	}
}