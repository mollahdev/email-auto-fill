import type { EmailAutoFillConfig } from '@/types';

export default abstract class Base {
    protected abstract value: string;
    protected abstract config: EmailAutoFillConfig;
    extractDomain() {
        const [username, domain] = this.value.split('@');
        return {
            username,
            domain: domain,
        };
    }

    isEmailComplete() {
        const domainObject = this.config.domains.filter((item) =>
            this.value.toLowerCase().includes(item.name)
        );
        return domainObject.length > 0;
    }

    getDomain() {
        const { domain } = this.extractDomain();
        if (domain) {
            return (
                this.config.domains.filter((item) =>
                    item.name.startsWith(domain.toLowerCase())
                )[0] || false
            );
        } else {
            return false;
        }
    }

    hasUppercaseCharacter(str: string) {
        for (let i = 0; i < str.length; i++) {
            //@ts-ignore
            if (str[i] !== str[i].toLowerCase()) {
                return true; // Found an uppercase character
            }
        }
        return false; // No uppercase characters found
    }
}
