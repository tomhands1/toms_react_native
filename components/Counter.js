import React, { useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

const Counter = () => {
    const [count, setCount] = useState(0);
    return (
        <View style={styles.container}>
            <Text style={styles.count}>{count}</Text>
            <Button color='green' title="Plus 1" onPress={() => setCount(count + 1)} />
            <Button color='red' title="Minus 1" onPress={() => setCount(count - 1)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column"
    },    
    count: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default Counter;