export class Logger {
    static #generateTitle(size: number, color: string, title: string): string[] {
        const q = (title.length & 1) === 0;
        const size2 = Math.max(0, (size - title.length - 10) >> 1);
        const style = `font-weight: bold; background-color: ${color};`;
        const text = ` ${"=".repeat(size2)}>>  ${title}${q ? "" : " "}  <<${"=".repeat(size2)} `;
        return [text, style];
    }

    static #generateKeyValStyles(color: string): [string, string, string] {
        const baseStyle = `font-weight: bold;`;
        return [
            `${baseStyle} background-color: ${color};`,
            `${baseStyle} color: ${color};`,
            `${baseStyle} background-color: ${color};`
        ];
    }

    static logTitle(color: string | null, title: string, size: number): void {
        const [text, style] = this.#generateTitle(size, color, title.trim());
        console.log(`%c${text}`, style ?? '');
    }

    static logKeyVal(color: string | null, kv: { k: string; v: any }): void {
        const [bgStyle, fgStyle, arrowStyle] = this.#generateKeyValStyles(color);
        console.log(`%c ### %c ${kv.k} %c --> `, bgStyle ?? '', fgStyle ?? '', arrowStyle ?? '', kv.v);
    }

    static logVariable(color: string | null, obj: Record<string, any>): void {
        const [key, value] = Object.entries(obj)[0];
        this.logKeyVal(color, { k: key, v: value });
    }

    static logBlank(color: string | null, sizeH: number, sizeV: number): void {
        const space = " ".repeat(Math.max(2, sizeH & ~1));
        for (let i = 0; i < Math.max(1, sizeV); i++) {
            console.log(`%c${space}`, `background-color: ${color};` ?? '');
        }
    }
}
