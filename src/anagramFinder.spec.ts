import {AnagramFinder} from "./anagramFinder";
import {AntiVirus} from "./antiVirus";

describe('isAnagram', () => {
	let anagramFinder: AnagramFinder;
	const mockedAntiVirus = new (<new () => AntiVirus>AntiVirus)() as jest.Mocked<AntiVirus>;

	beforeEach(() => {
		mockedAntiVirus.isVirus = jest.fn().mockResolvedValue(false)
		anagramFinder = new AnagramFinder(mockedAntiVirus)
	})

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
		mockedAntiVirus.isVirus = jest.fn().mockResolvedValue(true)
		expect.assertions(1)
		await expect(anagramFinder.isAnagram('virus', 'test')).rejects.toThrowError('Value is a virus')
	})
});