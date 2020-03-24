import * as Crypto from 'crypto'

export default class SecurityService{
    static generateHashPass(password: string): string{
        const secretWord = 'typescript';
        return Crypto.createHmac('sha1', secretWord).update(password).digest('hex')
    }

    static validatePass(password: string, hash: string){
        return SecurityService.generateHashPass(password) === hash;
    }
}