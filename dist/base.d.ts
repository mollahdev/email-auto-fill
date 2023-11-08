import type { EmailAutoFillConfig } from '@/types';
export default abstract class Base {
    protected abstract value: string;
    protected abstract config: EmailAutoFillConfig;
    extractDomain(): {
        username: string | undefined;
        domain: string | undefined;
    };
    isEmailComplete(): boolean;
    getDomain(): false | {
        name: `${string}.${string}`;
        autoCompleteAfter: number;
        misspelledVariations?: string[] | undefined;
    };
    hasUppercaseCharacter(str: string): boolean;
}
