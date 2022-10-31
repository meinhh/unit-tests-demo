import {AntiVirus} from "./antiVirus";

describe('isVirus', () => {
	const antiVirus = new AntiVirus()
	jest.useFakeTimers()

	it('should return true on virus', () => {
		expect.assertions(1)
		antiVirus.isVirus('virus').then((isVirus) => {
			expect(isVirus).toBeTruthy()
		})
		jest.runAllTimers()
	})
	it('should return false on regular string', async () => {
		expect.assertions(1)
		antiVirus.isVirus('test').then((isVirus) => {
			expect(isVirus).toBeFalsy()
		})
		jest.runAllTimers()
	})
});