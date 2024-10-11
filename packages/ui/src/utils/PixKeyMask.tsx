export default class FormatPixKey {
    static format(value: string): string {
        if (!value || value.toString().length !== 10) return "";
        const pixKeys = this.unformat(value);
        return this.replaceKeys(pixKeys, "xxx-xxx-xxxx");
    }

    static unformat(value: string): string {
        return value.replace(/\D/g, "").slice(0, 10);
    }

    private static replaceKeys(key: string, ref: string): string {
        let formatted = key.split("").reduce((formattedKey, currentChar) => {
            return formattedKey.replace("x", currentChar);
        }, ref);
        return formatted;
    }
}
