import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Table, Row } from 'react-native-table-component';
import fp from 'lodash/fp';

import { tradeColumns as columns } from '../constants';

const mapRows = fp.map(row =>
    columns.map(
        column => column.format ? column.format(row[column.id]) : row[column.id]
    )
);

const tableHeaders = [
    'Buyer',
    'Seller',
    'Price',
    'Quantity',
    'Traded'
];

const columnWidths = [50, 50, 60, 80, 140];

const TradeHistory = ({ trades }) => {
    const tradeHistory = useMemo(() => mapRows(trades), [trades]);
    return (
        <View style={styles.container}>
            <Table>
                <Row style={styles.header} data={tableHeaders} widthArr={columnWidths} textStyle={styles.text} />
            </Table>
            <ScrollView>
                <Table>
                    {tradeHistory.map((row, index) => (
                        <Row
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
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#96C6EE' },
    oddRow: { height: 60, backgroundColor: '#E7E6E1' },
    evenRow: { height: 60, backgroundColor: '#F7F6E7' },
    text: { textAlign: 'center' }
});

const mapStateToProps = state => ({
    trades: state.trades.trades
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeHistory);
