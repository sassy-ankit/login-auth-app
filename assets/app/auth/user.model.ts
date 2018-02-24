export class User {
	constructor(
		public Email: string,
		public password: string,
		public firstName?: string,
		public lastName?: string
	) {}
}
