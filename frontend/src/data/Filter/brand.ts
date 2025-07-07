export interface Brand {
    id: number;
    name: string;
    logoUrl: string;
}

export const brands: Brand[] = [
    { id: 1, name: 'Brand A', logoUrl: 'https://example.com/logoA.png' },
    { id: 2, name: 'Brand B', logoUrl: 'https://example.com/logoB.png' },
    { id: 3, name: 'Brand C', logoUrl: 'https://example.com/logoC.png' },
];