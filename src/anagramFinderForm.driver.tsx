import {fireEvent, render, RenderResult} from "@testing-library/react";
import {AnagramFinderForm} from "./anagramFinderForm";

export class AnagramFinderFormDriver {
	private renderedAnagramFinderForm?: RenderResult

	public get = {
		string1Input: () => this.renderedAnagramFinderForm!.queryByTestId('string1-input'),
		string2Input: () => this.renderedAnagramFinderForm!.queryByTestId('string2-input'),
		submitButton: () => this.renderedAnagramFinderForm!.queryByTestId('submit-button'),
		result: () => this.renderedAnagramFinderForm!.queryByTestId('result'),
	}
	public when = {
		created: (): AnagramFinderFormDriver => {
			if (!!this.renderedAnagramFinderForm) throw new Error('Component already rendered')
			this.renderedAnagramFinderForm = render(<AnagramFinderForm/>)
			return this
		},
		string1InputChanged: (value: string) => {
			fireEvent.change(this.get.string1Input()!, {target: {value: value}})
			return this
		},
		string2InputChanged: (value: string) => {
			fireEvent.change(this.get.string2Input()!, {target: {value: value}})
			return this
		},
		submitButtonClicked: () => {
			this.get.submitButton()!.click()
			return this
		}
	}
}