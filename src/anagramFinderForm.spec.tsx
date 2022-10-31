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
it('should show inputs aren\'t anagrams', () => {
	mockedAnagramFinder.prototype.isAnagram.mockResolvedValue(false)
	fireEvent.change(renderedAnagramFinderForm.getByTestId('string1-input'), {target: {value: 'test1'}})
	fireEvent.change(renderedAnagramFinderForm.getByTestId('string2-input'), {target: {value: 'test2'}})
	renderedAnagramFinderForm.getByTestId('submit-button').click()
	expect(renderedAnagramFinderForm.getByTestId('result')).toEqual('The text aren\'t anagrams')
})