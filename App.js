import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Counter from './components/Counter';

const App = () => {
    return (
        <View style={styles.body}>
            <Counter/>
        </View>
    );
};


const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'grey',
        justifyContent: "center",
        alignItems: "center",
    }
});

export default App;
