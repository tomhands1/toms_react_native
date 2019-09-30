import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Picker, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Slider from '@react-native-community/slider';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { fetchOrdersStarted, updateAggregation } from '../actions/Orders';
import { fetchTradesStarted } from '../actions/Trades';
import { changeAccount } from '../actions/Account';
import DepthChart from './DepthChart';
import { getMaxAggregation, getDepth } from '../selectors/Orders';


const AggregatedOrders = ({ aggregation, fetchDepth, depth, orders, maxAggregation, minPrice, maxPrice, maxQuantity, fetchOrders, fetchTrades, accountNumber }) => {
    const [account, setAccount] = useState(accountNumber);

    useEffect(() => {
        fetchDepth(aggregation);
        fetchOrders();
        fetchTrades();
    }, [aggregation, fetchDepth, orders, fetchOrders, fetchTrades]);

    return (
        <View style={styles.aggData}>
            <ScrollView>
                <TouchableOpacity style={styles.button} onPress={() => changeAccount(account)} >
                    <FontAwesomeIcon icon={faUser} color={'white'} size={25} />
                    <Text style={styles.text}>Change Account</Text>
                </TouchableOpacity>
                <Picker style={styles.picker} selectedValue={account} onValueChange={value => setAccount(value)}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                </Picker>
                <Text style={styles.aggTitle}>Aggregation</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={maxAggregation}
                    value={aggregation}
                    onSlidingComplete={value => updateAggregation(value)}
                    thumbTintColor="#96C6EE"
                    minimumTrackTintColor="#96C6EE"
                    maximumTrackTintColor="#d3d3d3"
                    step={1}
                />
                <View style={styles.textCon}>
                    <Text style={styles.colorGrey}>1</Text>
                    <Text style={styles.aggregation}>
                        {aggregation}
                    </Text>
                    <Text style={styles.colorGrey}>{Math.round(maxAggregation)}</Text>
                </View>
                <DepthChart
                    depth={depth}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    maxQuantity={maxQuantity}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    aggData: { padding: 10 },
    slider: { alignSelf: 'center', width: 250, height: 40 },
    aggTitle: { textAlign: 'center' },
    textCon: { width: 250, flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' },
    colorGrey: { color: '#000000' },
    aggregation: { color: '#96C6EE', fontSize: 20, fontWeight: 'bold' },
    button: {
        width: 70, height: 60, borderRadius: 5, alignItems: 'center', backgroundColor: '#96C6EE', justifyContent: 'center', alignSelf: 'center', margin: 5
    },
    text: { fontWeight: 'bold', fontSize: 10, color: 'black', textAlign: 'center' },
    picker: { width: 140 }
});

const mapStateToProps = state => ({
    aggregation: state.order.aggregation,
    depth: getDepth(state),
    orders: state.order.orders,
    maxAggregation: getMaxAggregation(state) || 10,
    accountNumber: state.account.accountNumber
});

const mapDispatchToProps = {
    fetchDepth: updateAggregation,
    changeAccount: changeAccount,
    fetchOrders: fetchOrdersStarted,
    fetchTrades: fetchTradesStarted,
};

export default connect(mapStateToProps, mapDispatchToProps)(AggregatedOrders);
