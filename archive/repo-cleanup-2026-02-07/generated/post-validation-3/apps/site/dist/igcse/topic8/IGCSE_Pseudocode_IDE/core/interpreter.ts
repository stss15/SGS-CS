import {
  TokenType, Token, NodeType, Statement, Program, Expression,
  BinaryExpression, Identifier, NumericLiteral, StringLiteral, BooleanLiteral,
  VarDeclaration, Assignment, PrintStatement, InputStatement, IfStatement,
  ForStatement, WhileStatement, RepeatStatement, ProcedureDeclaration,
  FunctionDeclaration, CallStatement, ReturnStatement, ArrayDeclaration, ArrayAccess, CaseStatement, CallExpression, ConstantDeclaration,
  RuntimeValue, NullValue, NumberValue, StringValue, BooleanValue, ArrayValue, ValueType, CharLiteral, CharValue
} from './types';
import { Environment } from './environment';

// --- LEXER ---
class Lexer {
    private static KEYWORDS: Record<string, TokenType> = {
        "DECLARE": TokenType.Keyword, "CONSTANT": TokenType.Keyword, "OUTPUT": TokenType.Keyword, "INPUT": TokenType.Keyword,
        "IF": TokenType.Keyword, "THEN": TokenType.Keyword, "ELSE": TokenType.Keyword, "ENDIF": TokenType.Keyword,
        "CASE": TokenType.Keyword, "OF": TokenType.Keyword, "OTHERWISE": TokenType.Keyword, "ENDCASE": TokenType.Keyword,
        "FOR": TokenType.Keyword, "TO": TokenType.Keyword, "STEP": TokenType.Keyword, "NEXT": TokenType.Keyword,
        "REPEAT": TokenType.Keyword, "UNTIL": TokenType.Keyword,
        "WHILE": TokenType.Keyword, "DO": TokenType.Keyword, "ENDWHILE": TokenType.Keyword,
        "PROCEDURE": TokenType.Keyword, "ENDPROCEDURE": TokenType.Keyword, "CALL": TokenType.Keyword,
        "FUNCTION": TokenType.Keyword, "RETURNS": TokenType.Keyword, "ENDFUNCTION": TokenType.Keyword, "RETURN": TokenType.Keyword,
        "ARRAY": TokenType.Keyword, "TRUE": TokenType.BooleanLiteral, "FALSE": TokenType.BooleanLiteral,
        "AND": TokenType.Operator, "OR": TokenType.Operator, "NOT": TokenType.Operator,
        "MOD": TokenType.Operator, "DIV": TokenType.Operator,
        "INTEGER": TokenType.DataType, "REAL": TokenType.DataType, "STRING": TokenType.DataType, "CHAR": TokenType.DataType, "BOOLEAN": TokenType.DataType,
    };
    
    private source: string;
    private tokens: Token[] = [];
    private start = 0;
    private current = 0;
    private line = 1;

    constructor(source: string) {
        this.source = source;
    }

    tokenize(): Token[] {
        while (!this.isAtEnd()) {
            this.start = this.current;
            this.scanToken();
        }
        this.tokens.push({ type: TokenType.EOF, value: '', line: this.line });
        return this.tokens;
    }

    private isAtEnd = () => this.current >= this.source.length;
    private advance = () => this.source[this.current++];
    private peek = () => this.isAtEnd() ? '\0' : this.source[this.current];
    private peekNext = () => this.current + 1 >= this.source.length ? '\0' : this.source[this.current + 1];

    private addToken(type: TokenType, value: string) {
        this.tokens.push({ type, value, line: this.line });
    }

    private scanToken() {
        const c = this.advance();
        switch (c) {
            case '(': this.addToken(TokenType.Punctuation, '('); break;
            case ')': this.addToken(TokenType.Punctuation, ')'); break;
            case '[': this.addToken(TokenType.Punctuation, '['); break;
            case ']': this.addToken(TokenType.Punctuation, ']'); break;
            case ',': this.addToken(TokenType.Punctuation, ','); break;
            case ':': this.addToken(TokenType.Punctuation, ':'); break;
            case '+': this.addToken(TokenType.Operator, '+'); break;
            case '-': this.addToken(TokenType.Operator, '-'); break;
            case '*': this.addToken(TokenType.Operator, '*'); break;
            case '^': this.addToken(TokenType.Operator, '^'); break;
            case '=': this.addToken(TokenType.Operator, '='); break;
            
            case '<':
                if (this.peek() === '-') { // Assignment operator <-
                    this.advance();
                    this.addToken(TokenType.Operator, '<-');
                } else if (this.peek() === '=') {
                    this.advance();
                    this.addToken(TokenType.Operator, '<=');
                } else if (this.peek() === '>') {
                    this.advance();
                    this.addToken(TokenType.Operator, '<>');
                } else {
                    this.addToken(TokenType.Operator, '<');
                }
                break;

            case '>':
                if (this.peek() === '=') {
                    this.advance();
                    this.addToken(TokenType.Operator, '>=');
                } else {
                    this.addToken(TokenType.Operator, '>');
                }
                break;
            
            case '/':
                if (this.peek() === '/') {
                    while (this.peek() !== '\n' && !this.isAtEnd()) this.advance();
                } else {
                    this.addToken(TokenType.Operator, '/');
                }
                break;
            
            case '"': this.string(); break;
            case "'": this.char(); break;

            case ' ':
            case '\r':
            case '\t':
                break;

            case '\n':
                this.line++;
                break;

            default:
                if (this.isDigit(c)) {
                    this.number();
                } else if (this.isAlpha(c)) {
                    this.identifier();
                } else {
                    throw new Error(`[Line ${this.line}] Unexpected character: ${c}`);
                }
        }
    }

    private identifier() {
        while (this.isAlphaNumeric(this.peek())) this.advance();
        const text = this.source.substring(this.start, this.current);
        const upperText = text.toUpperCase();
        const type = Lexer.KEYWORDS[upperText] ?? TokenType.Identifier;
        
        if (type === TokenType.BooleanLiteral) {
            this.addToken(type, upperText);
        } else if (type === TokenType.Operator) {
            this.addToken(type, upperText);
        } else if (type === TokenType.DataType) {
             this.addToken(type, text);
        }
        else {
             this.addToken(type, text);
        }
    }

    private number() {
        let isReal = false;
        while (this.isDigit(this.peek())) this.advance();

        if (this.peek() === '.' && this.isDigit(this.peekNext())) {
            isReal = true;
            this.advance();
            while (this.isDigit(this.peek())) this.advance();
        }

        const value = this.source.substring(this.start, this.current);
        this.addToken(isReal ? TokenType.RealLiteral : TokenType.IntegerLiteral, value);
    }
    
    private string() {
        while (this.peek() !== '"' && !this.isAtEnd()) {
            if (this.peek() === '\n') this.line++;
            this.advance();
        }
        if (this.isAtEnd()) {
            throw new Error(`[Line ${this.line}] Unterminated string.`);
        }
        this.advance(); // consume the closing "
        const value = this.source.substring(this.start + 1, this.current - 1);
        this.addToken(TokenType.StringLiteral, value);
    }

    private char() {
        if(this.peekNext() === "'" && !this.isAtEnd()){
            const charVal = this.advance();
            this.advance(); // consume closing '
            this.addToken(TokenType.CharLiteral, charVal);
        } else {
            throw new Error(`[Line ${this.line}] Unterminated or invalid character literal.`);
        }
    }

    private isDigit = (c: string) => c >= '0' && c <= '9';
    private isAlpha = (c: string) => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_';
    private isAlphaNumeric = (c: string) => this.isAlpha(c) || this.isDigit(c);
}


// --- PARSER ---
class Parser {
    private tokens: Token[];
    private current = 0;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }
    
    public parse(): Program {
        const program: Program = { kind: NodeType.Program, body: [] };
        while (!this.isAtEnd()) {
            program.body.push(this.parseStatement());
        }
        return program;
    }

    private isAtEnd = () => this.peek().type === TokenType.EOF;
    private peek = () => this.tokens[this.current];
    private previous = () => this.tokens[this.current - 1];
    private advance = () => {
        if (!this.isAtEnd()) this.current++;
        return this.previous();
    };
    private check = (type: TokenType) => this.peek().type === type;

    private expect(type: TokenType, message: string, value?: string): Token {
        const token = this.peek();
        if (token.type !== type) {
            throw new Error(`[Line ${token.line}] ${message}. Expected type ${TokenType[type]}, but got type ${TokenType[token.type]} ('${token.value}').`);
        }
        if (value !== undefined && token.value.toUpperCase() !== value.toUpperCase()) {
            throw new Error(`[Line ${token.line}] ${message}. Expected value '${value}', but got '${token.value}'.`);
        }
        return this.advance();
    }

    private match(...types: TokenType[]): boolean {
        for (const type of types) {
            if (this.check(type)) {
                this.advance();
                return true;
            }
        }
        return false;
    }

    private matchValue(type: TokenType, value: string): boolean {
        if (this.check(type) && this.peek().value.toUpperCase() === value.toUpperCase()) {
            this.advance();
            return true;
        }
        return false;
    }
    
    // Refactored statement parser to be more robust
    private parseStatement(): Statement {
        const currentToken = this.peek();

        // Check for keywords first
        if (currentToken.type === TokenType.Keyword) {
            switch (currentToken.value.toUpperCase()) {
                case 'DECLARE': return this.parseVarDeclaration();
                case 'CONSTANT': return this.parseConstantDeclaration();
                case 'OUTPUT': return this.parsePrintStatement();
                case 'INPUT': return this.parseInputStatement();
                case 'IF': return this.parseIfStatement();
                case 'FOR': return this.parseForStatement();
                case 'WHILE': return this.parseWhileStatement();
                case 'REPEAT': return this.parseRepeatStatement();
                case 'PROCEDURE': return this.parseProcedureDeclaration();
                case 'FUNCTION': return this.parseFunctionDeclaration();
                case 'CALL': return this.parseCallStatement();
                case 'RETURN': return this.parseReturnStatement();
                case 'CASE': return this.parseCaseStatement();
                // Keywords that don't start statements are errors when encountered here.
                default:
                    throw new Error(`[Line ${currentToken.line}] Misplaced keyword '${currentToken.value}'. It does not start a valid statement.`);
            }
        }

        // If not a keyword, it must be an identifier for an assignment
        if (currentToken.type === TokenType.Identifier) {
            return this.parseAssignmentStatement();
        }

        // Anything else is an error
        throw new Error(`[Line ${currentToken.line}] Invalid statement. Expected keyword or assignment.`);
    }

    
    private parseAssignmentStatement(): Assignment {
        const identifierToken = this.expect(TokenType.Identifier, "Expected identifier for assignment statement.");
        
        let assignee: Identifier | ArrayAccess;

        if (this.check(TokenType.Punctuation) && this.peek().value === '[') {
            assignee = this.parseArrayAccess(identifierToken.value);
        } else {
            assignee = { kind: NodeType.Identifier, symbol: identifierToken.value };
        }
        
        this.expect(TokenType.Operator, "Expected assignment operator '<-' after identifier.", '<-');
        const value = this.parseExpression();
        
        return { kind: NodeType.Assignment, assignee, value };
    }

    private parseVarDeclaration(): VarDeclaration | ArrayDeclaration {
        this.advance(); // consume DECLARE
        const identifier = this.expect(TokenType.Identifier, "Expected variable name after DECLARE.").value;
        this.expect(TokenType.Punctuation, "Expected ':' after variable name.", ':');

        if (this.peek().value.toUpperCase() === 'ARRAY') {
            return this.parseArrayDeclaration(identifier);
        }

        const dataType = this.expect(TokenType.DataType, "Expected data type (INTEGER, REAL, STRING, CHAR, BOOLEAN).").value;
        return { kind: NodeType.VarDeclaration, identifier, dataType };
    }
    
    private parseConstantDeclaration(): ConstantDeclaration {
        this.advance(); // consume CONSTANT
        const identifier = this.expect(TokenType.Identifier, "Expected constant name after CONSTANT.").value;
        this.expect(TokenType.Operator, "Expected '<-' after constant name.", '<-'); 
        const value = this.parsePrimaryExpr();
        
        if (value.kind !== NodeType.NumericLiteral && value.kind !== NodeType.StringLiteral && value.kind !== NodeType.BooleanLiteral && value.kind !== NodeType.CharLiteral) {
            throw new Error(`[Line ${this.peek().line}] Constant value must be a literal.`);
        }

        return { kind: NodeType.ConstantDeclaration, identifier, value };
    }

    private parseArrayDeclaration(identifier: string): ArrayDeclaration {
        this.advance(); // consume ARRAY
        this.expect(TokenType.Punctuation, "Expected '[' after ARRAY keyword.", '[');
        
        const dimensions: {lower: Expression, upper: Expression}[] = [];
        
        // Parse first dimension (always present)
        const firstLower = this.parseExpression();
        this.expect(TokenType.Punctuation, "Expected ':' to separate array bounds.", ':');
        const firstUpper = this.parseExpression();
        dimensions.push({lower: firstLower, upper: firstUpper});

        // Parse subsequent dimensions (optional, comma-separated)
        while (this.matchValue(TokenType.Punctuation, ',')) {
            const nextLower = this.parseExpression();
            this.expect(TokenType.Punctuation, "Expected ':' to separate array bounds.", ':');
            const nextUpper = this.parseExpression();
            dimensions.push({lower: nextLower, upper: nextUpper});
        }
        
        this.expect(TokenType.Punctuation, "Expected ']' after array bounds.", ']');
        this.expect(TokenType.Keyword, "Expected 'OF' keyword after array bounds.", 'OF');
        const dataType = this.expect(TokenType.DataType, "Expected data type for array.").value;

        return { kind: NodeType.ArrayDeclaration, identifier, dimensions, dataType };
    }


    private parsePrintStatement(): PrintStatement {
        this.advance(); // consume OUTPUT
        const values: Expression[] = [this.parseExpression()];
        while (this.matchValue(TokenType.Punctuation, ',')) {
            values.push(this.parseExpression());
        }
        return { kind: NodeType.PrintStatement, values };
    }

    private parseInputStatement(): InputStatement {
        this.advance(); // consume INPUT
        const identifier = this.expect(TokenType.Identifier, "Expected identifier after INPUT.").value;
        return { kind: NodeType.InputStatement, identifier };
    }

    private parseIfStatement(): IfStatement {
        this.advance(); // consume IF
        const condition = this.parseExpression();
        this.expect(TokenType.Keyword, "Expected 'THEN' after IF condition.", 'THEN');
        
        const body: Statement[] = [];
        while (!this.check(TokenType.Keyword) || (this.peek().value.toUpperCase() !== 'ELSE' && this.peek().value.toUpperCase() !== 'ENDIF')) {
            body.push(this.parseStatement());
        }

        let elseBody: Statement[] | undefined;
        if (this.matchValue(TokenType.Keyword, 'ELSE')) {
            elseBody = [];
            while (!this.check(TokenType.Keyword) || this.peek().value.toUpperCase() !== 'ENDIF') {
                elseBody.push(this.parseStatement());
            }
        }

        this.expect(TokenType.Keyword, "Expected 'ENDIF' to close IF statement.", 'ENDIF');
        return { kind: NodeType.IfStatement, condition, body, elseBody };
    }

    private parseForStatement(): ForStatement {
        this.advance(); // consume FOR
        const identifier = this.expect(TokenType.Identifier, "Expected identifier for loop variable.").value;
        this.expect(TokenType.Operator, "Expected '<-' after loop variable.", '<-');
        const startValue = this.parseExpression();
        this.expect(TokenType.Keyword, "Expected 'TO' in FOR loop.", 'TO');
        const endValue = this.parseExpression();
        
        let step: Expression | undefined;
        if (this.matchValue(TokenType.Keyword, 'STEP')) {
            step = this.parseExpression();
        }

        const body: Statement[] = [];
        while (!(this.check(TokenType.Keyword) && this.peek().value.toUpperCase() === 'NEXT')) {
             if (this.isAtEnd()) {
                throw new Error(`[Line ${this.peek().line}] Unterminated FOR loop, expected NEXT.`);
            }
            body.push(this.parseStatement());
        }
        this.expect(TokenType.Keyword, "Expected 'NEXT' to close FOR loop.", 'NEXT');
        this.expect(TokenType.Identifier, "Expected loop variable name after NEXT.");

        return { kind: NodeType.ForStatement, identifier, startValue, endValue, step, body };
    }
    
    private parseWhileStatement(): WhileStatement {
        this.advance(); // consume WHILE
        const condition = this.parseExpression();
        this.expect(TokenType.Keyword, "Expected 'DO' after WHILE condition.", 'DO');
        const body: Statement[] = [];
        while (!this.check(TokenType.Keyword) || this.peek().value.toUpperCase() !== 'ENDWHILE') {
            body.push(this.parseStatement());
        }
        this.expect(TokenType.Keyword, "Expected 'ENDWHILE' to close WHILE loop.", 'ENDWHILE');
        return { kind: NodeType.WhileStatement, condition, body };
    }
    
    private parseRepeatStatement(): RepeatStatement {
        this.advance(); // consume REPEAT
        const body: Statement[] = [];
        while (!this.check(TokenType.Keyword) || this.peek().value.toUpperCase() !== 'UNTIL') {
            body.push(this.parseStatement());
        }
        this.expect(TokenType.Keyword, "Expected 'UNTIL' to close REPEAT loop.", 'UNTIL');
        const condition = this.parseExpression();
        return { kind: NodeType.RepeatStatement, condition, body };
    }

    private parseCaseStatement(): CaseStatement {
        this.advance(); // consume CASE
        this.expect(TokenType.Keyword, "Expected 'OF' after CASE.", 'OF');
        const identifier = this.parseExpression();

        const cases: { value: Expression, statements: Statement[] }[] = [];
        let otherwise: Statement[] | undefined;

        while (!this.check(TokenType.Keyword) || (this.peek().value.toUpperCase() !== 'ENDCASE' && this.peek().value.toUpperCase() !== 'OTHERWISE')) {
            const value = this.parsePrimaryExpr();
            this.expect(TokenType.Punctuation, "Expected ':' after case value.", ':');
            const statements = [this.parseStatement()];
            cases.push({ value, statements });
        }

        if (this.matchValue(TokenType.Keyword, 'OTHERWISE')) {
            otherwise = [this.parseStatement()];
        }
        
        this.expect(TokenType.Keyword, "Expected 'ENDCASE' to close CASE statement.", 'ENDCASE');

        return { kind: NodeType.CaseStatement, identifier, cases, otherwise };
    }

    private parseProcedureDeclaration(): ProcedureDeclaration {
        this.advance(); // consume PROCEDURE
        const name = this.expect(TokenType.Identifier, "Expected procedure name.").value;
        const parameters: { name: string, type: string }[] = [];

        if (this.matchValue(TokenType.Punctuation, '(')) {
            if (this.peek().value !== ')') {
                do {
                    const paramName = this.expect(TokenType.Identifier, "Expected parameter name.").value;
                    this.expect(TokenType.Punctuation, "Expected ':' after parameter name.", ':');
                    const paramType = this.expect(TokenType.DataType, "Expected parameter type.").value;
                    parameters.push({ name: paramName, type: paramType });
                } while (this.matchValue(TokenType.Punctuation, ','))
            }
            this.expect(TokenType.Punctuation, "Expected ')' after parameters.", ')');
        }
        
        const body: Statement[] = [];
        while (!this.check(TokenType.Keyword) || this.peek().value.toUpperCase() !== 'ENDPROCEDURE') {
            body.push(this.parseStatement());
        }
        this.expect(TokenType.Keyword, "Expected 'ENDPROCEDURE'.", 'ENDPROCEDURE');

        return { kind: NodeType.ProcedureDeclaration, name, parameters, body };
    }

    private parseFunctionDeclaration(): FunctionDeclaration {
        this.advance(); // consume FUNCTION
        const name = this.expect(TokenType.Identifier, "Expected function name.").value;
        const parameters: { name: string, type: string }[] = [];
        
        if (this.matchValue(TokenType.Punctuation, '(')) {
             if (this.peek().value !== ')') {
                do {
                    const paramName = this.expect(TokenType.Identifier, "Expected parameter name.").value;
                    this.expect(TokenType.Punctuation, "Expected ':' after parameter name.", ':');
                    const paramType = this.expect(TokenType.DataType, "Expected parameter type.").value;
                    parameters.push({ name: paramName, type: paramType });
                } while (this.matchValue(TokenType.Punctuation, ','))
            }
            this.expect(TokenType.Punctuation, "Expected ')' after parameters.", ')');
        }

        this.expect(TokenType.Keyword, "Expected 'RETURNS' keyword.", 'RETURNS');
        const returnType = this.expect(TokenType.DataType, "Expected return type.").value;
        
        const body: Statement[] = [];
        while (!this.check(TokenType.Keyword) || this.peek().value.toUpperCase() !== 'ENDFUNCTION') {
            body.push(this.parseStatement());
        }
        this.expect(TokenType.Keyword, "Expected 'ENDFUNCTION'.", 'ENDFUNCTION');

        return { kind: NodeType.FunctionDeclaration, name, parameters, returnType, body };
    }
    
    private parseCallStatement(): CallStatement {
        this.advance(); // Consume CALL
        const callee = this.expect(TokenType.Identifier, "Expected procedure name after CALL.").value;
        const args: Expression[] = [];
        if (this.matchValue(TokenType.Punctuation, '(')) {
            if (this.peek().value !== ')') {
                 do {
                    args.push(this.parseExpression());
                } while (this.matchValue(TokenType.Punctuation, ','));
            }
            this.expect(TokenType.Punctuation, "Expected ')' after arguments.", ')');
        }
        return { kind: NodeType.CallStatement, callee, args };
    }

    private parseReturnStatement(): ReturnStatement {
        this.advance(); // Consume RETURN
        const value = this.parseExpression();
        return { kind: NodeType.ReturnStatement, value };
    }


    // Expression parsing (uses Pratt parser logic for handling precedence)
    private parseExpression(precedence: number = 0): Expression {
        let left = this.parsePrimaryExpr();

        while (precedence < this.getPrecedence(this.peek())) {
            const operatorToken = this.advance();
            const operator = operatorToken.value;
            const right = this.parseExpression(this.getPrecedence(operatorToken));
            left = {
                kind: NodeType.BinaryExpression,
                left,
                operator,
                right,
            } as BinaryExpression;
        }

        return left;
    }

    private getPrecedence(token: Token): number {
        const op = token.value.toUpperCase();
        if (token.type !== TokenType.Operator) return 0;
        switch (op) {
            case 'OR': return 1;
            case 'AND': return 2;
            case '=': case '<>': case '<': case '>': case '<=': case '>=': return 3;
            case '+': case '-': return 4;
            case '*': case '/': case 'DIV': case 'MOD': return 5;
            case '^': return 6; // Right associative, but we'll treat as left for simplicity
            default: return 0;
        }
    }
    
    private parseArrayAccess(name: string): ArrayAccess {
        this.expect(TokenType.Punctuation, "Expected '[' for array access.", '[');
        const indices = [this.parseExpression()];
        while(this.matchValue(TokenType.Punctuation, ',')) {
            indices.push(this.parseExpression());
        }
        this.expect(TokenType.Punctuation, "Expected ']' after array index.", ']');
        return { kind: NodeType.ArrayAccess, identifier: name, indices };
    }

    private parsePrimaryExpr(): Expression {
        const token = this.advance();
        switch (token.type) {
            case TokenType.Identifier:
                // could be function call or array access
                if (this.peek().value === '(') {
                    return this.parseCallExpression(token.value);
                }
                if (this.peek().value === '[') {
                    return this.parseArrayAccess(token.value);
                }
                return { kind: NodeType.Identifier, symbol: token.value } as Identifier;
            case TokenType.IntegerLiteral:
                return { kind: NodeType.NumericLiteral, value: parseInt(token.value) } as NumericLiteral;
            case TokenType.RealLiteral:
                return { kind: NodeType.NumericLiteral, value: parseFloat(token.value) } as NumericLiteral;
            case TokenType.StringLiteral:
                return { kind: NodeType.StringLiteral, value: token.value } as StringLiteral;
            case TokenType.CharLiteral:
                return { kind: NodeType.CharLiteral, value: token.value } as CharLiteral;
            case TokenType.BooleanLiteral:
                return { kind: NodeType.BooleanLiteral, value: token.value.toUpperCase() === 'TRUE' } as BooleanLiteral;
            case TokenType.Punctuation:
                if (token.value === '(') {
                    const value = this.parseExpression();
                    this.expect(TokenType.Punctuation, "Expected ')' after expression.", ')');
                    return value;
                }
            default:
                throw new Error(`[Line ${token.line}] Unexpected token found during parsing: ${token.value}`);
        }
    }
    
    private parseCallExpression(callee: string): Expression {
        this.advance(); // consume (
        const args: Expression[] = [];
        if (this.peek().value !== ')') {
            do {
                args.push(this.parseExpression());
            } while (this.matchValue(TokenType.Punctuation, ','));
        }
        this.expect(TokenType.Punctuation, "Expected ')' after arguments.", ')');
        return { kind: NodeType.CallExpression, callee, args } as CallExpression;
    }
}

// --- INTERPRETER ---
interface InterpreterCallbacks {
    output: (...args: RuntimeValue[]) => void;
    outputLine: (...args: RuntimeValue[]) => void;
    input: () => Promise<string>;
}

export class Interpreter {
    private callbacks: InterpreterCallbacks;
    private globalEnv: Environment;

    constructor(callbacks: InterpreterCallbacks) {
        this.callbacks = callbacks;
        this.globalEnv = new Environment();
        this.setupBuiltins(this.globalEnv);
    }
    
    private setupBuiltins(env: Environment) {
        env.declareNativeFn("LENGTH", (args) => {
            if (args.length !== 1 || args[0].type !== 'STRING') throw new Error("LENGTH expects one STRING argument.");
            return { type: 'NUMBER', value: (args[0] as StringValue).value.length } as NumberValue;
        });
        env.declareNativeFn("UCASE", (args) => {
            if (args.length !== 1 || (args[0].type !== 'STRING' && args[0].type !== 'CHAR')) throw new Error("UCASE expects one STRING or CHAR argument.");
            const strVal = (args[0] as StringValue | CharValue).value;
            return args[0].type === 'STRING' ? { type: 'STRING', value: strVal.toUpperCase() } as StringValue : { type: 'CHAR', value: strVal.toUpperCase() } as CharValue;
        });
        env.declareNativeFn("LCASE", (args) => {
             if (args.length !== 1 || (args[0].type !== 'STRING' && args[0].type !== 'CHAR')) throw new Error("LCASE expects one STRING or CHAR argument.");
             const strVal = (args[0] as StringValue | CharValue).value;
             return args[0].type === 'STRING' ? { type: 'STRING', value: strVal.toLowerCase() } as StringValue : { type: 'CHAR', value: strVal.toLowerCase() } as CharValue;
        });
         env.declareNativeFn("SUBSTRING", (args) => {
            if (args.length !== 3 || args[0].type !== 'STRING' || args[1].type !== 'NUMBER' || args[2].type !== 'NUMBER') throw new Error("SUBSTRING expects (STRING, NUMBER, NUMBER).");
            const str = (args[0] as StringValue).value;
            const start = (args[1] as NumberValue).value;
            const length = (args[2] as NumberValue).value;
            return { type: 'STRING', value: str.substring(start - 1, start - 1 + length)} as StringValue;
        });
        env.declareNativeFn("RANDOM", (args) => {
             if (args.length !== 0) throw new Error("RANDOM expects no arguments.");
             return { type: 'NUMBER', value: Math.random() } as NumberValue;
        });
        env.declareNativeFn("ROUND", (args) => {
             if (args.length !== 2 || args[0].type !== 'NUMBER' || args[1].type !== 'NUMBER') throw new Error("ROUND expects (NUMBER, NUMBER).");
             const num = (args[0] as NumberValue).value;
             const places = (args[1] as NumberValue).value;
             return { type: 'NUMBER', value: parseFloat(num.toFixed(places)) } as NumberValue;
        });
    }

    public async run(source: string) {
        const lexer = new Lexer(source);
        const tokens = lexer.tokenize();
        const parser = new Parser(tokens);
        const ast = parser.parse();

        // First pass: declare all functions and procedures in the global scope
        for (const stmt of ast.body) {
            if (stmt.kind === NodeType.ProcedureDeclaration) {
                this.globalEnv.declareVar((stmt as ProcedureDeclaration).name, { type: 'PROCEDURE', value: stmt }, true, 'PROCEDURE');
            } else if (stmt.kind === NodeType.FunctionDeclaration) {
                this.globalEnv.declareVar((stmt as FunctionDeclaration).name, { type: 'FUNCTION', value: stmt }, true, 'FUNCTION');
            }
        }
        
        await this.evaluateProgram(ast, this.globalEnv);
    }
    
    private async evaluateProgram(program: Program, env: Environment): Promise<RuntimeValue> {
        let lastEvaluated: RuntimeValue = { type: 'NULL', value: null };
        for (const statement of program.body) {
             if (statement.kind === NodeType.ProcedureDeclaration || statement.kind === NodeType.FunctionDeclaration) {
                continue; // Skip declarations as they are already hoisted
            }
            lastEvaluated = await this.evaluate(statement, env);
            // FIX: Propagate the 'RETURN' signal up the call stack. Do not unwrap it here.
            if(lastEvaluated && lastEvaluated.type === 'RETURN') {
                return lastEvaluated;
            }
        }
        return lastEvaluated;
    }
    
    private evaluate = async (node: Statement | Expression, env: Environment): Promise<RuntimeValue> => {
        switch (node.kind) {
            case NodeType.NumericLiteral: return { type: 'NUMBER', value: (node as NumericLiteral).value } as NumberValue;
            case NodeType.StringLiteral: return { type: 'STRING', value: (node as StringLiteral).value } as StringValue;
            case NodeType.CharLiteral: return { type: 'CHAR', value: (node as CharLiteral).value } as CharValue;
            case NodeType.BooleanLiteral: return { type: 'BOOLEAN', value: (node as BooleanLiteral).value } as BooleanValue;
            case NodeType.Identifier: return env.lookupVar((node as Identifier).symbol);
            case NodeType.ArrayAccess: {
                const arrValue = env.lookupVar((node as ArrayAccess).identifier);
                if (arrValue.type !== 'ARRAY') throw new Error(`'${(node as ArrayAccess).identifier}' is not an array.`);
                let target = (arrValue as ArrayValue).value;
                for (let i = 0; i < (node as ArrayAccess).indices.length; i++) {
                    const indexExpr = (node as ArrayAccess).indices[i];
                    const indexVal = await this.evaluate(indexExpr, env);
                    if (indexVal.type !== 'NUMBER') throw new Error("Array index must be a number.");
                    const arrayBaseIndex = 1; // Pseudocode is 1-based
                    const actualIndex = (indexVal as NumberValue).value - arrayBaseIndex;

                    if(i < (node as ArrayAccess).indices.length - 1){
                         target = (target as any[])[actualIndex];
                    } else {
                        return (target as any[])[actualIndex];
                    }
                }
                throw new Error("Internal error: Array access evaluated with no indices.");
            }

            case NodeType.BinaryExpression: {
                const bn = node as BinaryExpression;
                const lhs = await this.evaluate(bn.left, env);
                const rhs = await this.evaluate(bn.right, env);

                if (lhs.type === 'NUMBER' && rhs.type === 'NUMBER') {
                    const l = (lhs as NumberValue).value;
                    const r = (rhs as NumberValue).value;
                    switch (bn.operator.toUpperCase()) {
                        case '+': return { type: 'NUMBER', value: l + r } as NumberValue;
                        case '-': return { type: 'NUMBER', value: l - r } as NumberValue;
                        case '*': return { type: 'NUMBER', value: l * r } as NumberValue;
                        case '/': return { type: 'NUMBER', value: l / r } as NumberValue;
                        case '^': return { type: 'NUMBER', value: Math.pow(l, r) } as NumberValue;
                        case 'DIV': return { type: 'NUMBER', value: Math.trunc(l / r) } as NumberValue;
                        case 'MOD': return { type: 'NUMBER', value: l % r } as NumberValue;
                        case '=': return { type: 'BOOLEAN', value: l === r } as BooleanValue;
                        case '<>': return { type: 'BOOLEAN', value: l !== r } as BooleanValue;
                        case '<': return { type: 'BOOLEAN', value: l < r } as BooleanValue;
                        case '>': return { type: 'BOOLEAN', value: l > r } as BooleanValue;
                        case '<=': return { type: 'BOOLEAN', value: l <= r } as BooleanValue;
                        case '>=': return { type: 'BOOLEAN', value: l >= r } as BooleanValue;
                    }
                }

                if (bn.operator === '+') {
                    if (lhs.type === 'STRING' || rhs.type === 'STRING' || lhs.type === 'CHAR' || rhs.type === 'CHAR') {
                         const l = String(lhs.value);
                         const r = String(rhs.value);
                         return { type: 'STRING', value: l + r } as StringValue;
                    }
                }

                 if (lhs.type === 'STRING' && rhs.type === 'STRING') {
                     const l = (lhs as StringValue).value;
                     const r = (rhs as StringValue).value;
                     switch (bn.operator) {
                         case '=': return { type: 'BOOLEAN', value: l === r } as BooleanValue;
                         case '<>': return { type: 'BOOLEAN', value: l !== r } as BooleanValue;
                     }
                 }
                 if (lhs.type === 'BOOLEAN' && rhs.type === 'BOOLEAN') {
                      const l = (lhs as BooleanValue).value;
                      const r = (rhs as BooleanValue).value;
                       switch (bn.operator.toUpperCase()) {
                          case 'AND': return { type: 'BOOLEAN', value: l && r } as BooleanValue;
                          case 'OR': return { type: 'BOOLEAN', value: l || r } as BooleanValue;
                          case '=': return { type: 'BOOLEAN', value: l === r } as BooleanValue;
                          case '<>': return { type: 'BOOLEAN', value: l !== r } as BooleanValue;
                      }
                 }

                throw new Error(`Cannot perform operator '${bn.operator}' on types ${lhs.type} and ${rhs.type}`);
            }

            case NodeType.CallExpression: {
                const call = node as CallExpression;
                const args = await Promise.all(call.args.map(arg => this.evaluate(arg, env)));
                const fn = env.lookupVar(call.callee);

                if (fn.type === 'NATIVE_FN') {
                    // The 'value' is the callable function itself
                    return (fn.value as (args: RuntimeValue[]) => RuntimeValue)(args);
                }
                
                if (fn.type !== 'FUNCTION') throw new Error(`'${call.callee}' is not a function.`);
                const func = (fn.value as FunctionDeclaration);
                
                const scope = new Environment(env);
                if (args.length !== func.parameters.length) throw new Error(`Function '${func.name}' expects ${func.parameters.length} arguments, but got ${args.length}.`);
                for (let i = 0; i < func.parameters.length; i++) {
                    scope.declareVar(func.parameters[i].name, args[i], false);
                }
                
                const result = await this.evaluateProgram({ kind: NodeType.Program, body: func.body }, scope);
                
                // FIX: Check if the result from the program is a 'RETURN' signal.
                if(result && result.type === 'RETURN') {
                    // Unwrap the actual return value.
                    return (result as any).returnValue;
                }

                // If the program finished without a RETURN signal, it's an error.
                throw new Error(`Function '${func.name}' did not return a value.`);
            }

            // STATEMENTS
            case NodeType.Program: return await this.evaluateProgram(node as Program, env);
            case NodeType.VarDeclaration: {
                const decl = node as VarDeclaration;
                const dataType = decl.dataType.toUpperCase();
                let storedType: ValueType;
                if (dataType === 'INTEGER' || dataType === 'REAL') {
                    storedType = 'NUMBER';
                } else if (dataType === 'STRING' || dataType === 'CHAR' || dataType === 'BOOLEAN') {
                    storedType = dataType as ValueType;
                } else {
                    throw new Error(`Unsupported data type in declaration: ${decl.dataType}`);
                }
                env.declareVar(decl.identifier, { type: 'NULL', value: null }, false, storedType);
                return { type: 'NULL', value: null } as NullValue;
            }
             case NodeType.ConstantDeclaration: {
                const decl = node as ConstantDeclaration;
                const value = await this.evaluate(decl.value, env); 
                env.declareVar(decl.identifier, value, true, value.type);
                return { type: 'NULL', value: null } as NullValue;
            }
            case NodeType.ArrayDeclaration: {
                const decl = node as ArrayDeclaration;
                const arrayBaseIndex = 1; // Pseudocode is 1-based

                const initArray = async (dims: any[], depth: number): Promise<any> => {
                    if (depth >= dims.length) return {type: 'NULL', value: null};
                    const lowerBound = (await this.evaluate(dims[depth].lower, env) as NumberValue).value;
                    const upperBound = (await this.evaluate(dims[depth].upper, env) as NumberValue).value;
                    const size = upperBound - lowerBound + 1;
                    if (size <= 0) return [];
                    
                    // Create an array with an offset to simulate 1-based indexing
                    const arr = new Array(size);
                    for (let i=0; i < size; i++) {
                        arr[i] = await initArray(dims, depth+1);
                    }
                    return arr;
                }
                const arrValue = await initArray(decl.dimensions, 0);
                env.declareVar(decl.identifier, { type: 'ARRAY', value: arrValue } as ArrayValue, false, 'ARRAY');
                return { type: 'NULL', value: null } as NullValue;
            }
            
            case NodeType.Assignment: {
                const assign = node as Assignment;
                const value = await this.evaluate(assign.value, env);
                const arrayBaseIndex = 1; // Pseudocode is 1-based

                if (assign.assignee.kind === NodeType.Identifier) {
                    env.assignVar((assign.assignee as Identifier).symbol, value);
                } else if (assign.assignee.kind === NodeType.ArrayAccess) {
                    const acc = assign.assignee as ArrayAccess;
                    const arr = env.lookupVar(acc.identifier);
                    if(arr.type !== 'ARRAY') throw new Error(`'${acc.identifier}' is not an array.`);

                    let target = (arr as ArrayValue).value;
                    for(let i=0; i < acc.indices.length -1; i++){
                        const index = (await this.evaluate(acc.indices[i], env) as NumberValue).value;
                        target = (target as any)[index - arrayBaseIndex];
                    }
                    const finalIndex = (await this.evaluate(acc.indices[acc.indices.length - 1], env) as NumberValue).value;
                    (target as any[])[finalIndex - arrayBaseIndex] = value;
                }
                return value;
            }
            
            case NodeType.PrintStatement: {
                const print = node as PrintStatement;
                const values = await Promise.all(print.values.map(v => this.evaluate(v, env)));
                this.callbacks.outputLine(...values);
                return { type: 'NULL', value: null } as NullValue;
            }

            case NodeType.InputStatement: {
                const inputNode = node as InputStatement;
                const input = await this.callbacks.input();
                const type = env.getVarType(inputNode.identifier);
                let value: RuntimeValue;
                switch(type) {
                    case 'NUMBER': 
                        const num = parseFloat(input);
                        if(isNaN(num)) throw new Error(`Invalid input. Expected a NUMBER for ${inputNode.identifier}`);
                        value = { type: 'NUMBER', value: num }; break;
                    case 'STRING': value = { type: 'STRING', value: input }; break;
                    case 'CHAR': 
                        if(input.length !== 1) throw new Error(`Invalid input. Expected a CHAR for ${inputNode.identifier}`);
                        value = { type: 'CHAR', value: input }; break;
                    case 'BOOLEAN': 
                        if(input.toUpperCase() !== 'TRUE' && input.toUpperCase() !== 'FALSE') throw new Error(`Invalid input. Expected TRUE or FALSE for ${inputNode.identifier}`);
                        value = { type: 'BOOLEAN', value: input.toUpperCase() === 'TRUE' }; break;
                    default: value = { type: 'STRING', value: input }; break;
                }

                env.assignVar(inputNode.identifier, value);
                return { type: 'NULL', value: null } as NullValue;
            }

            case NodeType.IfStatement: {
                const ifStmt = node as IfStatement;
                const condition = await this.evaluate(ifStmt.condition, env);
                if (condition.type !== 'BOOLEAN') throw new Error("IF condition must be a boolean.");
                const scope = new Environment(env);
                if ((condition as BooleanValue).value) {
                    return await this.evaluateProgram({ kind: NodeType.Program, body: ifStmt.body }, scope);
                } else if (ifStmt.elseBody) {
                    return await this.evaluateProgram({ kind: NodeType.Program, body: ifStmt.elseBody }, scope);
                }
                return { type: 'NULL', value: null } as NullValue;
            }

            case NodeType.ForStatement: {
                const forStmt = node as ForStatement;
                const scope = new Environment(env);
                const startVal = (await this.evaluate(forStmt.startValue, scope) as NumberValue).value;
                const endVal = (await this.evaluate(forStmt.endValue, scope) as NumberValue).value;
                const stepVal = forStmt.step ? (await this.evaluate(forStmt.step, scope) as NumberValue).value : 1;

                scope.declareVar(forStmt.identifier, { type: 'NUMBER', value: startVal }, false, 'NUMBER');
                
                let i = startVal;
                while (stepVal > 0 ? i <= endVal : i >= endVal) {
                    await this.evaluateProgram({ kind: NodeType.Program, body: forStmt.body }, new Environment(scope));
                    i += stepVal;
                    scope.assignVar(forStmt.identifier, { type: 'NUMBER', value: i });
                }
                return { type: 'NULL', value: null };
            }

            case NodeType.WhileStatement: {
                const whileStmt = node as WhileStatement;
                let condition = await this.evaluate(whileStmt.condition, env);
                if(condition.type !== 'BOOLEAN') throw new Error("WHILE condition must be a boolean.");
                
                while((condition as BooleanValue).value) {
                    await this.evaluateProgram({ kind: NodeType.Program, body: whileStmt.body }, new Environment(env));
                    condition = await this.evaluate(whileStmt.condition, env);
                }
                return { type: 'NULL', value: null };
            }

            case NodeType.RepeatStatement: {
                const repeatStmt = node as RepeatStatement;
                let condition: RuntimeValue;
                const scope = new Environment(env);
                do {
                    await this.evaluateProgram({ kind: NodeType.Program, body: repeatStmt.body }, scope);
                    condition = await this.evaluate(repeatStmt.condition, scope);
                    if(condition.type !== 'BOOLEAN') throw new Error("REPEAT...UNTIL condition must be a boolean.");
                } while (!(condition as BooleanValue).value);
                return { type: 'NULL', value: null };
            }

            case NodeType.CaseStatement: {
                 const caseStmt = node as CaseStatement;
                 const identValue = await this.evaluate(caseStmt.identifier, env);
                 let matched = false;
                 const scope = new Environment(env);
                 for (const caseBranch of caseStmt.cases) {
                     const caseValue = await this.evaluate(caseBranch.value, scope);
                     if (identValue.value === caseValue.value) {
                         await this.evaluateProgram({ kind: NodeType.Program, body: caseBranch.statements }, scope);
                         matched = true;
                         break;
                     }
                 }
                 if (!matched && caseStmt.otherwise) {
                     await this.evaluateProgram({ kind: NodeType.Program, body: caseStmt.otherwise }, scope);
                 }
                 return { type: 'NULL', value: null };
            }

            case NodeType.CallStatement: {
                 const call = node as CallStatement;
                 const args = await Promise.all(call.args.map(arg => this.evaluate(arg, env)));
                 const fn = env.lookupVar(call.callee);
                 if (fn.type !== 'PROCEDURE') throw new Error(`'${call.callee}' is not a procedure.`);
                 
                 const proc = (fn as any).value as ProcedureDeclaration;
                 const scope = new Environment(env);
                 if (args.length !== proc.parameters.length) throw new Error(`Procedure '${proc.name}' expects ${proc.parameters.length} arguments, but got ${args.length}.`);
                 
                 for (let i = 0; i < proc.parameters.length; i++) {
                     scope.declareVar(proc.parameters[i].name, args[i], false);
                 }
                 await this.evaluateProgram({ kind: NodeType.Program, body: proc.body }, scope);
                 return { type: 'NULL', value: null };
            }
            case NodeType.ReturnStatement: {
                const returnStmt = node as ReturnStatement;
                const returnValue = await this.evaluate(returnStmt.value, env);
                return { type: 'RETURN', returnValue } as any;
            }


            default:
                throw new Error(`Unhandled AST node type: ${(node as any).kind}`);
        }
    }
}