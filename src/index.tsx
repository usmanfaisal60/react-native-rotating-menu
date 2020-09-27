import React, { useRef, useCallback, useState } from 'react'
import { View, StyleSheet, I18nManager, NativeTouchEvent, TouchableOpacity, Image } from 'react-native';
import { WP, pointOnCircle, calculateRadius, calculateAngleBetweenTwoPoints } from './services';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { StylesheetInterface, PropsI, pointI } from './services/interfaces';


const RoundMenu = ({
    content = [],
    size = WP('100'),
    contentContainerStyle,
    centerContent,
    centerContentSize = size / 4,
    rotateCenterImage,
    backgroundColor
}: PropsI) => {

    const touchEvent = useRef<pointI>({ x: undefined, y: undefined });
    const touchEventPrev = useRef<pointI>({ x: undefined, y: undefined });
    const touchStart = useRef(undefined);
    const center = { x: size / 2, y: size / 2 };
    const radius = size / 3;
    const divisionAngle = content.length ? 360 / content.length : 0;
    const [offsetAngle, setOffsetAngle] = useState(0);

    const handleGesture = (e: any) => {
        touchEvent.current = e.nativeEvent;
        if (!touchStart.current) {
            touchStart.current = {
                touchEvent: e.nativeEvent,
                angle: offsetAngle
            };
            touchEventPrev.current = e.nativeEvent;
            return;
        }
        const touchDistanceFromCenter = calculateRadius(center, touchEvent.current);
        if (touchDistanceFromCenter > radius * 0.3 && touchDistanceFromCenter < radius * 1.5) {
            const angleMoved = calculateAngleBetweenTwoPoints(center, touchEventPrev.current, touchEvent.current);
            touchEventPrev.current = e.nativeEvent;
            setOffsetAngle(offsetAngle + (I18nManager.isRTL ? - angleMoved : angleMoved));
        }
    }

    const onTouchRelease = (e: any) => {
        if (e.nativeEvent.oldState === 4) {
            touchEventPrev.current = undefined;
            touchStart.current = undefined;
        }
    }

    return (
        <View>
            <PanGestureHandler
                onHandlerStateChange={onTouchRelease}
                onGestureEvent={handleGesture}>
                <View style={styles({ size, backgroundColor }).container}>
                    {content.map((el, i) => {
                        const [x, y] = pointOnCircle({
                            radius,
                            angle: divisionAngle * (i + 1) + offsetAngle + 90,
                            cx: center.x,
                            cy: center.y
                        });
                        const elContainerSize = size / 4;
                        return (
                            <TouchableOpacity
                                key={i}
                                activeOpacity={1}
                                style={[
                                    styles({ elContainerSize, elContainerCoOrdinates: { x, y } }).elContainer,
                                    {
                                        backgroundColor: contentContainerStyle?.backgroundColor ? contentContainerStyle?.backgroundColor : undefined,
                                        borderColor: contentContainerStyle?.borderColor ? contentContainerStyle?.borderColor : undefined,
                                        borderRadius: contentContainerStyle?.borderRadius ? contentContainerStyle?.borderRadius : undefined,
                                        borderWidth: contentContainerStyle?.borderWidth ? contentContainerStyle?.borderWidth : undefined,
                                    }
                                ]}>
                                {el}
                            </TouchableOpacity>
                        )
                    })}
                    {centerContent ?
                        <View
                            style={{
                                transform: rotateCenterImage ? [{ rotate: I18nManager.isRTL ? (-offsetAngle + 'deg') : (offsetAngle + 'deg') }] : null,
                                left: center.x - centerContentSize / 2,
                                top: center.x - centerContentSize / 2,
                                width: centerContentSize,
                                height: centerContentSize,
                                position: "absolute",
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            {centerContent}
                        </View>
                        : null}
                </View>
            </PanGestureHandler>
        </View>
    );
}

export default RoundMenu;

const styles = ({
    size,
    elContainerSize,
    elContainerCoOrdinates = { x: 0, y: 0 },
    backgroundColor
}: StylesheetInterface) => StyleSheet.create({
    container: {
        width: size ? size : WP('100'),
        height: size ? size : WP('100'),
        backgroundColor,
    },
    textStyle: {
        marginTop: 10,
        textAlign: 'center',
        color: "#000000",
        overflow: 'visible',
    },
    imageStyle: {
        width: '100%',
        height: '100%'
    },
    elContainer: {
        position: "absolute",
        left: elContainerCoOrdinates.x - elContainerSize / 2,
        top: elContainerCoOrdinates.y - elContainerSize / 2,
        width: elContainerSize,
        height: elContainerSize,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
