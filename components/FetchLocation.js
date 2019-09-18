import React from 'react';
import { Button } from 'react-native';

const fetchLocation = ({ getLocation }) => (
    <Button title="Get Location!" onPress={ getLocation } />
);

export default fetchLocation;
