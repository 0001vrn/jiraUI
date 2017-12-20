export class User {
    constructor(
        public serverUrl: string,
        public email: string,
        public password: string
      ) {  }

    toString(): string{
        return this.serverUrl+'-'+this.email+'-'+this.password;
    }
}
