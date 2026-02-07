
// --- GENERAL ---
export type ValueType = 'NUMBER' | 'STRING' | 'BOOLEAN' | 'CHAR' | 'ARRAY' | 'NULL' | 'PROCEDURE' | 'FUNCTION' | 'NATIVE_FN' | 'RETURN';

// --- TOKENIZER ---
export enum TokenType {
    Keyword, Identifier, DataType,
    IntegerLiteral, RealLiteral, StringLiteral, CharLiteral, BooleanLiteral,
    Operator, Punctuation, Comment,
    EOF
}

export interface Token {
    type: TokenType;
    value: string;
    line: number;
    className?: string; // For highlighter
}


// --- AST NODES ---
export enum NodeType {
    Program,
    VarDeclaration, ArrayDeclaration, ConstantDeclaration,
    Assignment,
    PrintStatement,
    InputStatement,
    IfStatement, ForStatement, WhileStatement, RepeatStatement, CaseStatement,
    ProcedureDeclaration, FunctionDeclaration, CallStatement, ReturnStatement,
    
    // Expressions
    BinaryExpression,
    Identifier,
    NumericLiteral, StringLiteral, CharLiteral, BooleanLiteral,
    ArrayAccess, CallExpression,
}

export interface Statement {
    kind: NodeType;
}

export interface Expression extends Statement {}

export interface Program extends Statement {
    kind: NodeType.Program;
    body: Statement[];
}

export interface VarDeclaration extends Statement {
    kind: NodeType.VarDeclaration;
    identifier: string;
    dataType: string;
}

export interface ArrayDeclaration extends Statement {
    kind: NodeType.ArrayDeclaration;
    identifier: string;
    dimensions: { lower: Expression, upper: Expression }[];
    dataType: string;
}

export interface ConstantDeclaration extends Statement {
    kind: NodeType.ConstantDeclaration;
    identifier: string;
    value: Expression;
}

export interface Assignment extends Statement {
    kind: NodeType.Assignment;
    assignee: Identifier | ArrayAccess;
    value: Expression;
}

export interface PrintStatement extends Statement {
    kind: NodeType.PrintStatement;
    values: Expression[];
}

export interface InputStatement extends Statement {
    kind: NodeType.InputStatement;
    identifier: string;
}

export interface IfStatement extends Statement {
    kind: NodeType.IfStatement;
    condition: Expression;
    body: Statement[];
    elseBody?: Statement[];
}

export interface ForStatement extends Statement {
    kind: NodeType.ForStatement;
    identifier: string;
    startValue: Expression;
    endValue: Expression;
    step?: Expression;
    body: Statement[];
}

export interface WhileStatement extends Statement {
    kind: NodeType.WhileStatement;
    condition: Expression;
    body: Statement[];
}

export interface RepeatStatement extends Statement {
    kind: NodeType.RepeatStatement;
    body: Statement[];
    condition: Expression;
}

export interface CaseStatement extends Statement {
    kind: NodeType.CaseStatement;
    identifier: Expression;
    cases: { value: Expression, statements: Statement[] }[];
    otherwise?: Statement[];
}

export interface ProcedureDeclaration extends Statement {
    kind: NodeType.ProcedureDeclaration;
    name: string;
    parameters: { name: string, type: string }[];
    body: Statement[];
}
export interface FunctionDeclaration extends Statement {
    kind: NodeType.FunctionDeclaration;
    name: string;
    parameters: { name: string, type: string }[];
    returnType: string;
    body: Statement[];
}
export interface CallStatement extends Statement {
    kind: NodeType.CallStatement;
    callee: string;
    args: Expression[];
}
export interface ReturnStatement extends Statement {
    kind: NodeType.ReturnStatement;
    value: Expression;
}

export interface BinaryExpression extends Expression {
    kind: NodeType.BinaryExpression;
    left: Expression;
    operator: string;
    right: Expression;
}

export interface Identifier extends Expression {
    kind: NodeType.Identifier;
    symbol: string;
}

export interface ArrayAccess extends Expression {
    kind: NodeType.ArrayAccess;
    identifier: string;
    indices: Expression[];
}

export interface CallExpression extends Expression {
    kind: NodeType.CallExpression;
    callee: string;
    args: Expression[];
}

export interface NumericLiteral extends Expression {
    kind: NodeType.NumericLiteral;
    value: number;
}
export interface StringLiteral extends Expression {
    kind: NodeType.StringLiteral;
    value: string;
}
export interface CharLiteral extends Expression {
    kind: NodeType.CharLiteral;
    value: string;
}
export interface BooleanLiteral extends Expression {
    kind: NodeType.BooleanLiteral;
    value: boolean;
}


// --- RUNTIME VALUES ---
export interface RuntimeValue {
    type: ValueType;
    value: any;
}
export interface NullValue extends RuntimeValue { type: 'NULL'; value: null; }
export interface NumberValue extends RuntimeValue { type: 'NUMBER'; value: number; }
export interface StringValue extends RuntimeValue { type: 'STRING'; value: string; }
export interface CharValue extends RuntimeValue { type: 'CHAR'; value: string; }
export interface BooleanValue extends RuntimeValue { type: 'BOOLEAN'; value: boolean; }
export interface ArrayValue extends RuntimeValue { type: 'ARRAY'; value: RuntimeValue[]; }