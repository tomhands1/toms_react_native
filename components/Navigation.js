import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChartArea, faExchangeAlt, faHistory, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { createAppContainer } from 'react-navigation';

import OrderForm from './OrderForm';
import PrivateOrderbook from './PrivateOrderbook';
import TradeHistory from './TradeHistory';
import AggregatedOrders from './AggregatedOrders';

const Tabs = createMaterialBottomTabNavigator(
    {
        AggregatedOrders: {
            screen: AggregatedOrders,
            navigationOptions: () => ({
                title: 'Orders',
                tabBarColor: '#96C6EE',
                tabBarIcon: <FontAwesomeIcon icon={faChartArea} color={'white'} size={25} />
            })
        },
        PrivateOrderbook: {
            screen: PrivateOrderbook,
            navigationOptions: () => ({
                title: 'My Orders',
                tabBarColor: '#7fa8c9',
                tabBarIcon: <FontAwesomeIcon icon={faIdCard} color={'white'} size={25} />
            })
        },
        OrderForm: {
            screen: OrderForm,
            navigationOptions: () => ({
                title: 'Start Trading',
                tabBarColor: '#688aa6',
                tabBarIcon: <FontAwesomeIcon icon={faExchangeAlt} color={'white'} size={25} />
            })
        },
        TradeHistory: {
            screen: TradeHistory,
            navigationOptions: () => ({
                title: 'Trade History',
                tabBarColor: '#4a6275',
                tabBarIcon: <FontAwesomeIcon icon={faHistory} color={'white'} size={25} />,
            })
        }
    },
    {
        tabBarOptions: {
            activeTintColor: 'red',
            labelStyle: {
                fontSize: 12,
                marginBottom: 10,
            },
            style: {
                elevation: 5,
            }
        }
    });

const Navigation = createAppContainer(Tabs);

export default Navigation;
