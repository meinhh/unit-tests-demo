import {AnagramFinder} from "./anagramFinder";

describe('isAnagram', () => {
	const anagramFinder: AnagramFinder = new AnagramFinder()

	it('should return true on same string', async () => {
		expect(await anagramFinder.isAnagram('test', 'test')).toBeTruthy()
	})
	it('should return true on anagram', async () => {
		expect(await anagramFinder.isAnagram('race', 'care')).toBeTruthy()
	})
	it('should return false on one string contains the other', async () => {
		expect(await anagramFinder.isAnagram('hello', 'he')).toBeFalsy()
	})
	it('should return false on different strings', async () => {
		expect(await anagramFinder.isAnagram('test', 'wow')).toBeFalsy()
	})
	it('should throw an exception on virus', async () => {
		// expect(anagramFinder.isAnagram('virus', 'test')).toThrowError('Value is a virus')
		expect.assertions(1)
		await expect(anagramFinder.isAnagram('virus', 'test')).rejects.toThrowError('Value is a virus')
	})
});