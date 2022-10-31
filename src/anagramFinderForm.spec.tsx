import {fireEvent, render, RenderResult} from "@testing-library/react";
import {AnagramFinderForm} from "./anagramFinderForm";
import {AnagramFinder} from "./anagramFinder";

jest.mock('./anagramFinder')
const mockedAnagramFinder = AnagramFinder as jest.MockedClass<typeof AnagramFinder>
let renderedAnagramFinderForm: RenderResult

beforeEach(() => {
	mockedAnagramFinder.mockClear()
	renderedAnagramFinderForm = render(<AnagramFinderForm/>)
})

it('should disable submit on empty inputs', () => {
	expect(renderedAnagramFinderForm.getByTestId('submit-button')).toBeDisabled()
})
it('should not display result before submit button is clicked', () => {
	expect(renderedAnagramFinderForm.queryByTestId('result')).not.toBeInTheDocument()
})
it('should display inputs aren\'t anagrams', async () => {
	const str1 = 'test1', str2 = 'test2'
	mockedAnagramFinder.prototype.isAnagram.mockResolvedValue(false)
	fireEvent.change(renderedAnagramFinderForm.getByTestId('string1-input'), {target: {value: str1}})
	fireEvent.change(renderedAnagramFinderForm.getByTestId('string2-input'), {target: {value: str2}})
	renderedAnagramFinderForm.getByTestId('submit-button').click()
	expect((await renderedAnagramFinderForm.findByTestId('result')).textContent).toEqual('The text aren\'t anagrams')
	expect(mockedAnagramFinder.prototype.isAnagram).toHaveBeenCalledWith(str1, str2)
})
it('should display inputs are anagrams', async () => {
	const str1 = 'test1', str2 = 'test2'
	mockedAnagramFinder.prototype.isAnagram.mockResolvedValue(true)
	fireEvent.change(renderedAnagramFinderForm.getByTestId('string1-input'), {target: {value: str1}})
	fireEvent.change(renderedAnagramFinderForm.getByTestId('string2-input'), {target: {value: str2}})
	renderedAnagramFinderForm.getByTestId('submit-button').click()
	expect((await renderedAnagramFinderForm.findByTestId('result')).textContent).toEqual('The text are anagrams')
	expect(mockedAnagramFinder.prototype.isAnagram).toHaveBeenCalledWith(str1, str2)
})