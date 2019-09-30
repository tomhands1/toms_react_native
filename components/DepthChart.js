import React from 'react';
import { View } from 'react-native';
import { StackedAreaChart, XAxis, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

const DepthChart = ({ depth }) => {

    const buyData = depth.buysDepth || [];
    const sellData = depth.sellsDepth || [];

    const keys = ['quantity'];


    return (
        <View style={{ flexDirection: 'row' }}>
            <YAxis
                data={buyData}
                formatLabel={value => value}
                yAccessor={({ item }) => item.quantity}
                svg={{ fill: 'black', fontSize: 10 }}
                contentInset={{
                    left: 8, right: 8, top: 0, bottom: 10
                }}
                style={{ backgroundColor: 'white', height: 180, paddingRight: 5 }}
            />
            <View styles={{ flex: 1 }}>
                <StackedAreaChart
                    style={{ height: 180, width: 180, paddingVertical: 16 }}
                    data={buyData}
                    keys={keys}
                    xAccessor={({ item }) => item.price}
                    yAccessor={({ item }) => item.quantity}
                    colors={['green']}
                    curve={shape.curveNatural}
                    showGrid={false}
                />
                <XAxis
                    data={buyData}
                    formatLabel={value => value}
                    xAccessor={({ item }) => item.price}
                    svg={{ fill: 'black', fontSize: 10 }}
                    contentInset={{
                        left: 8, right: 8, top: 0, bottom: 10
                    }}
                    style={{ backgroundColor: 'white' }}
                    numberOfTicks={buyData.length}
                />
            </View>
            <View styles={{ flex: 1 }}>
                <StackedAreaChart
                    style={{ height: 180, width: 180, paddingVertical: 16 }}
                    data={sellData}
                    keys={keys}
                    xAccessor={({ item }) => item.price}
                    yAccessor={({ item }) => item.quantity}
                    colors={['red']}
                    curve={shape.curveNatural}
                    showGrid={false}
                />
                <XAxis
                    data={sellData}
                    formatLabel={value => value}
                    xAccessor={({ item }) => item.price}
                    svg={{ fill: 'black', fontSize: 10 }}
                    contentInset={{
                        left: 8, right: 8, top: 0, bottom: 10
                    }}
                    style={{ backgroundColor: 'white' }}
                    numberOfTicks={sellData.length}
                />
            </View>
        </View>
    );
};

export default DepthChart;
