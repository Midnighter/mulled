export interface ITheme {
    backgroundColor: string;
    fontColor: string;
    backHighlight: string;
    fontHighlight: string;
}

export const dark = {
    backgroundColor: 'var(--base03)',
    fontColor: 'var(--base0)',
    backHighlight: 'var(--base02)',
    fontHighlight: 'var(--base1)'
} as ITheme;

export const light = {
    backgroundColor: 'var(--base3)',
    fontColor: 'var(--base00)',
    backHighlight: 'var(--base2)',
    fontHighlight: 'var(--base01)'
} as ITheme;
