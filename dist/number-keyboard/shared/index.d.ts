declare type KeyType = '' | 'delete' | 'extra' | 'close';
export declare type KeyConfig = {
    text?: number | string;
    type?: KeyType;
    color?: string;
    wider?: boolean;
};
export declare const shuffle: (array: unknown[]) => unknown[];
export declare const genCustomKeys: ({ extraKeys, randomKey }: {
    extraKeys: any;
    randomKey?: boolean | undefined;
}) => KeyConfig[];
export declare const getDefaultKeys: ({ randomKey }: {
    randomKey?: boolean | undefined;
}) => KeyConfig[];
export declare const getKeys: (options: any) => KeyConfig[];
export {};
