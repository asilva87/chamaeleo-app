import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from './Themed';

export default function InfoScreen() {
  return (
    <View>
      <View style={styles.infoContainer}>
        <Text
          style={styles.infoText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          App created for the selection process at Chamaeleo.
        </Text>

        <Text
          style={styles.infoText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Version 0.1.0
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  infoText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
});
