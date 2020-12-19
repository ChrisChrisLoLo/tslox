import {error} from "./index"
import {TokenType} from "./TokenType";
import {Token} from "./Token";

export class Scanner {
    readonly #source: string;
    readonly #tokens: Token[] = [];

    // Offsets of the program
    #start: number = 0;
    #current: number = 0;
    #line: number = 1;

    constructor(source: string, tokens: Token[]){
        this.#source = source;
    }

    scanTokens(): Token[] {
        while (!this.isAtEnd()){
            this.#start = this.#current;
            this.scanTokens();
        }

        this.#tokens.push(new Token(TokenType.EOF, "", null, this.#line));
        return this.#tokens;
    }
    
    private isAtEnd(): boolean {
        return this.#current >= this.#source.length;
    }

    private scanToken(): void {
        const char: string = this.advance();
        switch (char) {
            case '(': this.addToken(TokenType.LEFT_PAREN); break;
            case ')': this.addToken(TokenType.RIGHT_PAREN); break;
            case '{': this.addToken(TokenType.LEFT_BRACE); break;
            case '}': this.addToken(TokenType.RIGHT_BRACE); break;
            case ',': this.addToken(TokenType.COMMA); break;
            case '.': this.addToken(TokenType.DOT); break;
            case '-': this.addToken(TokenType.MINUS); break;
            case '+': this.addToken(TokenType.PLUS); break;
            case ';': this.addToken(TokenType.SEMICOLON); break;
            case '*': this.addToken(TokenType.STAR); break;
            case '!':
                this.addToken(this.match('=') ? TokenType.BANG_EQUAL : TokenType.BANG);
                break;
            case '=':
                this.addToken(this.match('=') ? TokenType.EQUAL_EQUAL : TokenType.EQUAL);
                break;
            case '<':
                this.addToken(this.match('=') ? TokenType.LESS_EQUAL : TokenType.LESS);
                break;
            case '>':
                this.addToken(this.match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER);
                break;
            case '/':
                if (this.match('/')) {
                    // A comment goes until the end of the line.
                    while (this.peek() != '\n' && !this.isAtEnd()) this.advance();
                } else {
                    this.addToken(TokenType.SLASH);
                }
                break;
            default:
                error(this.#line, "Unexpected character.");
                break;
        }
    }

    private advance(): string {
        this.#current++;
        return this.#source[this.#current - 1];
    }

    private addToken(type: TokenType, literal: object|null = null): void{
        // MAY HAVE WRONG INDICES
        const text: String = this.#source.substring(this.#start, this.#current);
        this.#tokens.push(new Token(type, text, literal, this.#line));
    }

    private match(expected: string) {
        if (this.isAtEnd()) return false;
        if (this.#source.charAt(this.#current) != expected) return false;

        this.#current++;
        return true;
    }

    private peek(): string{
        if (this.isAtEnd()) return "\0";
        return this.#source.charAt(this.#current);
    }
}