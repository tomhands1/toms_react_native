import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const PrivateOrderbook = ({ myOrders }) => {
    const buyOrders = useMemo(() => myOrders.buyOrders, [myOrders]);
    const sellOrders = useMemo(() => myOrders.sellOrders, [myOrders]);
    return (
        <View>
            <Text>Hello World</Text>
        </View>
    );
};

const mapStateToProps = state => ({
    myOrders: state.order.orders
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateOrderbook);
