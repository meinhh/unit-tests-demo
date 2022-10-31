import {AnagramFinder} from "./anagramFinder";
import {AntiVirus} from "./antiVirus";

describe('isAnagram', () => {
	let anagramFinder: AnagramFinder;
	let mockedAntiVirus: jest.Mocked<AntiVirus>;

	beforeEach(() => {
		mockedAntiVirus = {
			isVirus: jest.fn().mockResolvedValue(false)
		}
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
	describe('should check if values are viruses', () => {
		it('should throw an exception on string 1 is a virus', async () => {
			mockedAntiVirus.isVirus = jest.fn().mockResolvedValue(true)
			expect.assertions(1)
			await expect(anagramFinder.isAnagram('virus', 'test')).rejects.toThrowError('Value is a virus')
		})
		it('should throw an exception on string 2 is a virus', async () => {
			mockedAntiVirus.isVirus = jest.fn().mockResolvedValue(true)
			expect.assertions(1)
			await expect(anagramFinder.isAnagram('test', 'virus')).rejects.toThrowError('Value is a virus')
		})
		it('should check for viruses on valid inputs', async () => {
			const str1 = 'test1', str2 = 'test2'
			await anagramFinder.isAnagram(str1, str2)
			expect(mockedAntiVirus.isVirus).toHaveBeenCalledTimes(2)
			expect(mockedAntiVirus.isVirus).toHaveBeenCalledWith(str1)
			expect(mockedAntiVirus.isVirus).toHaveBeenCalledWith(str2)
		})
	});
});