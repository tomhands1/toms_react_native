import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getPrivateOrders } from '../selectors/Orders';
import { Table, Row } from 'react-native-table-component';
import fp from 'lodash/fp';

import { ordersColumns as columns } from '../constants';

const mapRows = fp.map(row =>
    columns.map(
        column => column.format ? column.format(row[column.id]) : row[column.id]
    )
);

const tableHeaders = [
    'Price',
    'Quantity',
    'Date'
];
const columnWidths = [90, 90, 200];

const PrivateOrderbook = ({ myOrders }) => {
    const buyOrders = useMemo(() => mapRows(myOrders.buyOrders), [myOrders]);
    const sellOrders = useMemo(() => mapRows(myOrders.sellOrders), [myOrders]);
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Buy Orders</Text>
                <Table>
                    <Row style={styles.buy} data={tableHeaders} widthArr={columnWidths} textStyle={styles.text} />
                    {buyOrders.map((row, index) => (
                        <Row
                            key={index}
                            data={row}
                            style={index % 2 ? styles.evenRow : styles.oddRow}
                            widthArr={columnWidths}
                            textStyle={styles.text}
                        />
                    ))}
                </Table>
                <Text style={styles.title}>Sell Orders</Text>
                <Table>
                    <Row style={styles.sell} data={tableHeaders} widthArr={columnWidths} textStyle={styles.text} />
                    {sellOrders.map((row, index) => (
                        <Row
                            key={index}
                            data={row}
                            style={index % 2 ? styles.evenRow : styles.oddRow}
                            widthArr={columnWidths}
                            textStyle={styles.text}
                        />
                    ))}
                </Table>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    buy: { height: 50, backgroundColor: '#228B22' },
    sell: { height: 50, backgroundColor: '#FF6347' },
    oddRow: { height: 60, backgroundColor: '#E7E6E1' },
    evenRow: { height: 60, backgroundColor: '#F7F6E7' },
    title: { textAlign: 'center', fontSize: 18, fontWeight: 'bold', paddingTop: 30, paddingBottom: 10 },
    text: { textAlign: 'center' }
});


const mapStateToProps = state => ({
    myOrders: getPrivateOrders(state)
});


const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateOrderbook);
