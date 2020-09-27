export interface pointOnCircleI {
    radius: number;
    angle: number;
    cx: number;
    cy: number;
}

export interface pointI {
    x: number;
    y: number
}

export interface StylesheetInterface {
    size?: number;
    elContainerSize?: number;
    elContainerCoOrdinates?: pointI;
    backgroundColor?: string;
}

export interface PropsI {
    content?: any[];
    size?: number;
    contentContainerStyle?: {
        backgroundColor?: string;
        borderColor?: string;
        borderRadius?: number;
        borderWidth?: number;
    };
    centerContent?: any;
    backgroundColor?: string;
    rotateCenterImage?: boolean;
    centerContentSize?: number;
}