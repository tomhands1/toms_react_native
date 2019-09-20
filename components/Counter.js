import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/Counter';

const Counter = ({ count, increaseCounter, decreaseCounter }) => (
    <View style={styles.container}>
        <Text style={styles.count}>{count}</Text>
        <Button color="green" title="Plus 1" onPress={increaseCounter} />
        <Button color="red" title="Minus 1" onPress={decreaseCounter} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    count: {
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

const mapStateToProps = state => ({
    count: state.counter.count,
});


const mapDispatchToProps = {
    increaseCounter: actions.increaseCount,
    decreaseCounter: actions.decreaseCount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
