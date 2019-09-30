import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/Orders';
import { TouchableRipple } from 'react-native-paper';
import { faMoneyCheck, faToggleOn, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const SubmitButton = () => (
    <View style={styles.submitButtonView}>
        <FontAwesomeIcon icon={faMoneyCheck} style={styles.submitButtonIcon} size={20} />
        <Text style={styles.submitButtonText}>Submit</Text>
    </View>
);

const CurrencyCheck = ({ isActive }) => (
    <View style={styles.activeCheck} >
        {isActive && <FontAwesomeIcon icon={faCheck} transform="shrink-4" />}
    </View>
);

const currencies = [
    { title: 'GBP', symbol: '£' },
    { title: 'USD', symbol: '$' },
    { title: 'EUR', symbol: '€' },
];

const OrderForm = ({ accountNumber, placeOrder }) => {
    const [price, setPrice] = useState('10');
    const [quantity, setQuantity] = useState('10');
    const [action, setAction] = useState(true);
    const [currency, setCurrency] = useState('£');

    const newOrder = {
        accountNumber,
        price,
        quantity,
        action: action === true ? 'Buy' : 'Sell',
    };
    return (
        <View style={styles.container}>
            <View style={styles.currencies}>
                {currencies.map(type =>
                    <View key={type.title} style={styles.currencyType}>
                        <Text style={styles.symbol}>{type.symbol}:</Text>
                        <TouchableOpacity onPress={() => setCurrency(type.symbol)}>
                            <CurrencyCheck isActive={type.symbol === currency} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <Text style={styles.inputTitle}>{`Price (${currency})`}</Text>
            <TextInput style={styles.textInput} onChangeText={text => setPrice(text)} value={price} />
            <Text style={styles.inputTitle}>Quantity</Text>
            <TextInput style={styles.textInput} onChangeText={text => setQuantity(text)} value={quantity} />
            <View style={styles.actionSelector}>
                <Text style={action ? styles.actionText : styles.actionTextActive}>Sell</Text>
                <TouchableWithoutFeedback style={styles.actionToggle} onPress={() => setAction(!action)} >
                    {action
                        ? <FontAwesomeIcon icon={faToggleOn} color="#287a2b" size={50} />
                        : <FontAwesomeIcon icon={faToggleOn} color="#e83f3f" transform={{ rotate: 180 }} size={50} />}
                </TouchableWithoutFeedback>
                <Text style={action ? styles.actionTextActive : styles.actionText}>Buy</Text>
            </View>
            <TouchableRipple style={styles.submitButton} rippleColor={action ? '#287a2b' : '#e83f3f'} onPress={() => placeOrder(newOrder)}>
                <SubmitButton />
            </TouchableRipple>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'column', marginTop: 20 },
    textInput: { color: 'black', fontSize: 25, fontWeight: 'bold', textAlign: 'center', borderColor: 'gray', borderWidth: 1, margin: 10, marginHorizontal: 80 },
    inputTitle: { fontSize: 16, marginLeft: 90 },
    actionSelector: { flexDirection: 'row', justifyContent: 'center', marginBottom: 30 },
    actionToggle: { margin: 10 },
    actionText: { marginHorizontal: 20, textAlignVertical: 'center', fontSize: 20 },
    actionTextActive: { marginHorizontal: 20, textAlignVertical: 'center', fontSize: 20, fontWeight: 'bold' },
    submitButton: { width: 150, backgroundColor: '#688aa6', alignItems: 'center', alignSelf: 'center', borderRadius: 5, padding: 10 },
    submitButtonView: { flexDirection: 'row' },
    submitButtonText: { color: 'white', textAlign: 'center', marginLeft: 10, fontSize: 20 },
    submitButtonIcon: { color: 'white', alignSelf: 'center' },
    activeCheck: { height: 20, width: 20, borderColor: 'black', borderRadius: 10, borderWidth: 2, alignItems: 'center' },
    currencies: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
    currencyType: { flexDirection: 'row', marginHorizontal: 30 },
    symbol: { fontSize: 15, fontWeight: 'bold', marginRight: 5 }
});

const mapStateToProps = state => ({
    accountNumber: state.account.user.accountNumber
});


const mapDispatchToProps = {
    placeOrder: actions.addOrderStarted,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
