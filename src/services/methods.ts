import { Dimensions } from 'react-native';
import { pointI, pointOnCircleI } from './interfaces'

export const WidthPercentage = (percentage: number | string): number => {
    const { width } = Dimensions.get('screen');
    return width * parseInt(String(percentage)) / 100;
}
export function pointOnCircle({ radius, angle, cx, cy }: pointOnCircleI): [x: number, y: number] {

    angle = angle * (Math.PI / 180); // Convert from Degrees to Radians
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    return [x, y];
}
export const calculateRadius = (center: pointI, point: pointI): number => {
    const sqrX = Math.pow((center.x - point.x), 2);
    const sqrY = Math.pow((center.y - point.y), 2);

    const sqrRadius = sqrX + sqrY;

    return Math.sqrt(sqrRadius);
}
export const calculateAngleBetweenTwoPoints = (center: pointI, p1: pointI, p2: pointI): number => {
    const p1Angle = Math.atan2(p1.y - center.y, p1.x - center.x);
    const p2Angle = Math.atan2(p2.y - center.y, p2.x - center.x);

    return (p2Angle - p1Angle) * 180 / Math.PI;
}
