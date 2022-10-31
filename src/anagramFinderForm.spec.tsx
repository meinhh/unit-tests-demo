import {AnagramFinder} from "./anagramFinder";
import {AnagramFinderFormDriver} from "./anagramFinderForm.driver";
import {waitFor} from "@testing-library/react";

jest.mock('./anagramFinder')
const mockedAnagramFinder = AnagramFinder as jest.MockedClass<typeof AnagramFinder>
let driver: AnagramFinderFormDriver

beforeEach(() => {
	mockedAnagramFinder.mockClear()
	driver = new AnagramFinderFormDriver()
})

it('should disable submit on empty inputs', async () => {
	expect(await driver.when.created().get.submitButton()).toBeDisabled()
})
it('should not display result before submit button is clicked', async () => {
	await waitFor(() => expect(driver.when.created().get.result()).not.toBeInTheDocument())
})
it('should display inputs aren\'t anagrams', async () => {
	const str1 = 'test1', str2 = 'test2'
	mockedAnagramFinder.prototype.isAnagram.mockResolvedValue(false)
	driver = driver.when.created()
		.when.string1InputChanged(str1)
		.when.string2InputChanged(str2)
		.when.submitButtonClicked()
	await waitFor(() => expect(driver.get.result()?.textContent).toEqual('The text aren\'t anagrams'))
	expect(mockedAnagramFinder.prototype.isAnagram).toHaveBeenCalledWith(str1, str2)
})
it('should display inputs are anagrams', async () => {
	const str1 = 'test1', str2 = 'test2'
	mockedAnagramFinder.prototype.isAnagram.mockResolvedValue(true)
	driver = driver.when.created()
		.when.string1InputChanged(str1)
		.when.string2InputChanged(str2)
		.when.submitButtonClicked()
	await waitFor(() => expect(driver.get.result()?.textContent).toEqual('The text are anagrams'))
	expect(mockedAnagramFinder.prototype.isAnagram).toHaveBeenCalledWith(str1, str2)
})