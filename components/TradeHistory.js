import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const TradeHistory = ({ }) => {

    return (
        <View>
            <Text>Hello World</Text>
        </View>
    );
};

const mapStateToProps = state => ({
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(TradeHistory);
