export default class FormatPixKey {
    static format(value: string): string {
        if (!value || value.toString().length !== 10) return ""
        const pixKeys = this.unformat(value)
        return this.replaceKeys(pixKeys, "xxx-xxx-xxx-x")
    }

    static unformat(value: string): string {
        if (!value || value.toString().length !== 10) return "";

        return value.replace(/\D/g, "").slice(0, 11)
    }

    private static replaceKeys(key: string, ref: string): string {
        let formatted = key.split("").reduce((key, value) => {
            return key.replace("x", value)
        }, ref)
            .replace(/x/g, "");
        return formatted.slice(0, 10) || ""
    }
}