import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import BookDetails from '@/components/BookDetails';

export default function BookDetailsModal() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book details</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <BookDetails />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
      },
      separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
      },
});
