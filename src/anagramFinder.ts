import {AntiVirus} from "./antiVirus";

export class AnagramFinder {
	constructor(private readonly antiVirus: AntiVirus = new AntiVirus()) {
	}

	public async isAnagram(string1: string, string2: string): Promise<boolean> {
		if (await this.antiVirus.isVirus(string1) || await this.antiVirus.isVirus(string2))
			throw new Error('Value is a virus')

		return string1.toLowerCase().split("").sort().join("") ===
			string2.toLowerCase().split("").sort().join("")
	}
}