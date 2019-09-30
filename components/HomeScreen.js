import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMountain, faCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Navigation from './Navigation';
import Login from './Login';
import { Provider } from 'react-native-paper';
import * as actions from '../actions/Account';

const HomeScreen = ({ isLoggedIn, logout }) => (
    <Provider>
        <View style={styles.topNavbar} >
            <View style={styles.titleContainer}>
                <FontAwesomeIcon style={styles.icon} icon={faMountain} mask={faCircle} size={40} transform="shrink-6, bottom-3" />
                <Text style={styles.screenTitle}>Bitcoin Trader</Text>
            </View>
            {isLoggedIn && <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
                <FontAwesomeIcon style={styles.logoutIcon} icon={faSignOutAlt} />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>}

        </View>
        {isLoggedIn ?
            <Navigation />
            : <Login />}
    </Provider>
);

const styles = StyleSheet.create({
    topNavbar: { flexDirection: 'row', margin: 10, justifyContent: 'space-between' },
    titleContainer: { flexDirection: 'row' },
    screenTitle: { textAlignVertical: 'center', fontSize: 20, marginLeft: 10, color: '#688aa6', fontWeight: 'bold' },
    icon: { color: '#688aa6' },
    logoutButton: { flexDirection: 'row', alignSelf: 'center', borderColor: '#688aa6', borderWidth: 1, padding: 6 },
    logoutText: { textAlignVertical: 'center', color: '#688aa6', fontWeight: 'bold' },
    logoutIcon: { color: '#688aa6', marginTop: 3, marginRight: 5 },
});

const mapStateToProps = state => ({
    isLoggedIn: state.account.isLoggedIn
});

const mapDispatchToProps = {
    logout: actions.logout
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
