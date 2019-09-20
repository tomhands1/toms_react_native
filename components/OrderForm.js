import React, { useState } from 'react';
import { Button, View, TextInput, StyleSheet, Picker } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/Orders';

const OrderForm = ({ accountNumber, placeOrder }) => {
    const [price, setPrice] = useState('10');
    const [quantity, setQuantity] = useState('10');
    const [action, setAction] = useState('Buy');

    const newOrder = {
        accountNumber,
        price,
        quantity,
        action,
    };
    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput} onChangeText={text => setPrice(text)} value={price} />
            <TextInput style={styles.textInput} onChangeText={text => setQuantity(text)} value={quantity} />
            <Picker selectedValue={action} onValueChange={itemValue => setAction(itemValue)}>
                <Picker.Item label="Buy" value="Buy" />
                <Picker.Item label="Sell" value="Sell" />
            </Picker>
            <Button color="green" title="Submit" onPress={() => placeOrder(newOrder)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    textInput: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        borderColor: 'gray',
        borderWidth: 1,
    },
});

const mapStateToProps = state => ({
    accountNumber: state.account.accountNumber
});


const mapDispatchToProps = {
    placeOrder: actions.addOrderStarted,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
