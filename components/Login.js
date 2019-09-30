import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { loginStarted } from '../actions/Account';

const Login = ({ login }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginCredentials = { username, password };

    return (
        <View style={styles.loginContainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Username</Text>
                <TextInput style={styles.inputText} value={username} onChangeText={text => setUsername(text)} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput style={styles.inputText} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={() => login(loginCredentials)}>
                <FontAwesomeIcon style={styles.loginIcon} icon={faSignInAlt} />
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.forgottenButton}>
                <Text style={styles.forgottenText}>Forgotten username or password?</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    loginContainer: {},
    inputContainer: { width: 200, alignSelf: 'center', marginTop: 10 },
    inputTitle: { fontSize: 12 },
    inputText: { borderBottomColor: 'black', borderBottomWidth: 2, fontSize: 18 },
    loginButton: { flexDirection: 'row', alignSelf: 'center', backgroundColor: '#688aa6', paddingHorizontal: 15, paddingVertical: 5, color: 'white', margin: 20 },
    loginIcon: { color: 'white', marginRight: 10, marginTop: 5 },
    loginText: { fontSize: 18, color: 'white' },
    forgottenButton: { alignSelf: 'center' },
    forgottenText: { fontSize: 15 }
});

const mapStateToProps = state => ({

});


const mapDispatchToProps = {
    login: loginStarted
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
