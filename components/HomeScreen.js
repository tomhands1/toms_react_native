import React, { useState, useEffect } from 'react';
import { Button, View, Picker } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions/Account';
import { fetchOrdersStarted } from '../actions/Orders';

const HomeScreen = ({ accountNumber, changeAccount, navigation, fetchOrders }) => {
    const [account, setAccount] = useState(accountNumber);
    const { navigate } = navigation;

    useEffect(() => { fetchOrders(); }, [fetchOrders]);

    return (
        <View>
            <Button
                title="Start Trading!"
                onPress={() => navigate('OrderForm')}
            />
            <Button
                title="View My Orders"
                onPress={() => navigate('PrivateOrderbook')}
            />
            <Button
                title="Trade History"
                onPress={() => navigate('TradeHistory')}
            />
            <Picker selectedValue={account} onValueChange={value => setAccount(value)} >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
            </Picker>
            <Button
                title="Change Account"
                onPress={() => changeAccount(account)}
            />
        </View>
    );
};

const mapStateToProps = state => ({
    accountNumber: state.account.accountNumber,
});


const mapDispatchToProps = {
    changeAccount: actions.changeAccount,
    fetchOrders: fetchOrdersStarted
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
