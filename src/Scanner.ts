import {TokenType} from "./TokenType";
import {Token} from "./Token";

export class Scanner {
    readonly #source: String;
    readonly #tokens: Token[] = [];

    // Line counts
    #start: number = 0;
    #current: number = 0;
    #line: number = 1;

    constructor(source: String, tokens: Token[]){
        this.#source = source;
    }

    scanTokens(): Token[] {
        while (!this._isAtEnd()){
            this.#start = this.#current;
            this.scanTokens();
        }

        this.#tokens.push(new Token(TokenType.EOF, "", null, line));
        return this.#tokens;
    }
    
    _isAtEnd(): boolean {
        return this.#current >= this.#source.length;
    }

}