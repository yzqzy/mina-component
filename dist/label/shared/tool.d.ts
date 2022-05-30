/**
 * @file 工具函数
 * @module label/shared/tool
 */
declare type SelectorElement = {
    width: number;
    height: number;
    top: number;
    left: number;
    node: any;
};
export declare const selectorQuery: (selector: any, receiver: any) => Promise<SelectorElement>;
declare type DrawLayout = {
    canvas: any;
    ctx: any;
};
export declare const drawLayout: ({ dpr, width, height, selector }: {
    dpr: any;
    width: any;
    height: any;
    selector: any;
}, receiver: any) => Promise<DrawLayout>;
declare type Scale = {
    x: number;
    y: number;
};
declare type ComputeLayout = {
    width: number;
    height: number;
    scale: Scale;
};
export declare const computeLayout: (maxWidth: any, maxHeight: any, width: any, height: any) => ComputeLayout;
export {};
