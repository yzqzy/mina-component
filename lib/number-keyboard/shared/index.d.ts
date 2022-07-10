declare type KeyType = '' | 'delete' | 'extra' | 'close';
export declare type KeyConfig = {
    text?: number;
    type?: KeyType;
    color?: string;
    wider?: boolean;
};
export declare const genCustomKeys: ({ extraKey }: {
    extraKey: any;
}) => KeyConfig[];
export {};
