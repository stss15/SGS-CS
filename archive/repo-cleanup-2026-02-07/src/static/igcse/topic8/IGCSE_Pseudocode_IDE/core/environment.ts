
import { RuntimeValue, ValueType, ProcedureDeclaration, FunctionDeclaration } from './types';

type NativeFn = (args: RuntimeValue[]) => RuntimeValue;

export class Environment {
    private parent?: Environment;
    private variables: Map<string, RuntimeValue>;
    private types: Map<string, ValueType>;
    private constants: Set<string>;

    constructor(parent?: Environment) {
        this.parent = parent;
        this.variables = new Map();
        this.types = new Map();
        this.constants = new Set();
    }

    public declareVar(name: string, value: RuntimeValue, isConstant: boolean, type?: ValueType): RuntimeValue {
        const varName = name.toLowerCase();
        if (this.variables.has(varName)) {
            throw new Error(`Variable '${name}' already declared in this scope.`);
        }
        this.variables.set(varName, value);
        if (type) {
            this.types.set(varName, type);
        }
        if (isConstant) {
            this.constants.add(varName);
        }
        return value;
    }
    
    public declareNativeFn(name: string, fn: NativeFn) {
        this.variables.set(name.toLowerCase(), { type: 'NATIVE_FN', value: fn } as any);
    }

    public assignVar(name: string, value: RuntimeValue): RuntimeValue {
        const env = this.resolve(name);
        const varName = name.toLowerCase();

        if (env.constants.has(varName)) {
            throw new Error(`Cannot assign to constant '${name}'.`);
        }
        
        const declaredType = env.types.get(varName);
        if (declaredType && declaredType !== 'NULL' && value.type !== 'NULL') {
            if (declaredType === 'NUMBER' && value.type !== 'NUMBER') {
                 throw new Error(`Type mismatch: Cannot assign value of type ${value.type} to variable '${name}' of type ${declaredType}.`);
            }
             if (declaredType !== 'NUMBER' && declaredType !== value.type) {
                throw new Error(`Type mismatch: Cannot assign value of type ${value.type} to variable '${name}' of type ${declaredType}.`);
            }
        }

        env.variables.set(varName, value);
        return value;
    }

    public lookupVar(name: string): RuntimeValue {
        const env = this.resolve(name);
        return env.variables.get(name.toLowerCase())!;
    }

    public getVarType(name: string): ValueType | undefined {
        const env = this.resolve(name);
        return env.types.get(name.toLowerCase());
    }

    private resolve(name: string): Environment {
        const varName = name.toLowerCase();
        if (this.variables.has(varName)) {
            return this;
        }
        if (this.parent) {
            return this.parent.resolve(name);
        }
        throw new Error(`Variable '${name}' not found.`);
    }
}
