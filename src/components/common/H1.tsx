import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function H1({ t, s }: any) {
    return <Text style={[{ fontSize: 24, fontWeight: 'bold'}, s]}>{t}</Text>
};