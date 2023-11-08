import Base from '@/base';
import { EVENT_AUTO_FILL, EVENT_SUGGESATION } from '@/constants';
import type { EmailAutoFillConfig, EventType } from '@/types';

export default class EmailAutoFill extends Base {
    protected value = '';
    constructor(protected config: EmailAutoFillConfig) {
        super();
    }

    public dispatch(eventName: EventType, value: string) {
        this.value = value;
        const { domain, username } = this.extractDomain();

        if (domain && username) {
            if (eventName === EVENT_AUTO_FILL) {
                this.autoCompleteHandler();
            }

            if (eventName === EVENT_SUGGESATION) {
                this.checkSuggesation();
            }
        }
    }

    private checkSuggesation() {
        const { domain } = this.extractDomain();
        if (!domain) return;
        if (this.isEmailComplete()) return;

        const suggestedDomain =
            this.config.domains.filter((item) => {
                if (item.name === domain.toLowerCase().trim()) return;
                // if the domain has no uppercase character, we should check the misspelled variations
                if (!Array.isArray(item.misspelledVariations)) return;
                return item.misspelledVariations.includes(domain.toLowerCase());
            })[0] || false;

        if (suggestedDomain) {
            this.config.subscribe({
                type: EVENT_SUGGESATION,
                inValue: this.value,
                outValue: `${this.extractDomain().username}@${
                    suggestedDomain.name
                }`,
            });
        }
    }

    private autoCompleteHandler() {
        if (this.isEmailComplete()) return;
        const { shouldShow, email } = this.getAutoCompleteEmail();

        if (shouldShow) {
            this.config.subscribe({
                type: EVENT_AUTO_FILL,
                inValue: this.value,
                outValue: email,
            });
        }
    }

    private getAutoCompleteEmail() {
        const { domain, username } = this.extractDomain();

        if (!domain || !username) {
            return {
                shouldShow: false,
                email: this.value,
            };
        }

        const validDomain = this.getDomain();

        if (
            validDomain &&
            domain.length >= validDomain.autoCompleteAfter &&
            domain.length <= validDomain.name.length
        ) {
            let email = '';
            /**
             * @const domain might contain uppercase character
             * @const validDomain.name is always lowercase
             * - need to make validDomain.name case according to the user input like domain variable
             */
            if (this.hasUppercaseCharacter(domain)) {
                const [, restPart] = validDomain.name.split(
                    domain.toLowerCase()
                );
                email = `${username}@${domain}${restPart}`;
            } else {
                email = `${username}@${validDomain.name}`;
            }

            return {
                shouldShow: true,
                email,
            };
        }

        return {
            shouldShow: false,
            email: this.value,
        };
    }
}