import { EVENT_AUTO_FILL, EVENT_SUGGESATION } from '@/constants';

export interface EmailAutoFillConfig {
    domains: {
        name: `${string}.${string}`;
        autoCompleteAfter: number;
        misspelledVariations?: string[];
    }[];
    subscribe: (value: OutputType) => void;
}

export type EventType = typeof EVENT_AUTO_FILL | typeof EVENT_SUGGESATION;

export type OutputType = {
    type: EventType;
    inValue: string;
    outValue: string;
};
