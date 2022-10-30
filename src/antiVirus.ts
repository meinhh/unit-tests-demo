export class AntiVirus {
	public isVirus(value: string): Promise<boolean> {
		return new Promise<boolean>(resolve => {
			setTimeout(() => {
				resolve(value === 'virus')
			}, 1000)
		})
	}
}