import {AnagramFinder} from "./anagramFinder";
import {useState} from "react";

const anagramFinder = new AnagramFinder()
export const AnagramFinderForm = () => {
	const [string1, setString1] = useState<string>()
	const [string2, setString2] = useState<string>()
	const [isAnagram, setIsAnagram] = useState<boolean>()

	const checkAnagrams = async () => {
		if (!string1 || !string2) return;
		setIsAnagram(undefined)
		setIsAnagram(await anagramFinder.isAnagram(string1, string2))
	}

	return (
		<div>
			<div>
				<input type="text" value={string1} onChange={(e) => setString1(e.target.value)}/>
				<input type="text" value={string2} onChange={(e) => setString2(e.target.value)}/>
				<button disabled={!string1 || !string2} onClick={checkAnagrams}>
					Submit
				</button>
			</div>
			{
				isAnagram !== undefined &&
				<div>The text are{isAnagram ? '' : "n't"} anagrams</div>
			}
		</div>
	)
}