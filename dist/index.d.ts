import Base from '@/base';
import type { EmailAutoFillConfig, EventType } from '@/types';
export default class EmailAutoFill extends Base {
    protected config: EmailAutoFillConfig;
    protected value: string;
    constructor(config: EmailAutoFillConfig);
    dispatch(eventName: EventType, value: string): void;
    private checkSuggesation;
    private autoCompleteHandler;
    private getAutoCompleteEmail;
}
