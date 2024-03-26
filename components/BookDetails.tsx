// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from './Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BookDetailsScreen() {
    const [book, setBook] = useState(null); 

    useEffect(() => {
        const fetchBook = async () => {
            try {
                // Retrieve the book string from storage
                const bookString = await AsyncStorage.getItem('books');
                if (bookString !== null) {
                    setBook(JSON.parse(bookString)); 
                }
            } catch (error) {
                console.error("Failed to fetch books from storage:", error);
            }
        };

        fetchBook(); 
    }, []);

  return (
    <View>
      <View style={styles.bookDetailsContainer}>
        {book && (
            <View>
                {Object.keys(book).map((key: string) => {
                    return (
                        <Text
                            key={Math.random()}
                            style={styles.bookInfoText}
                            lightColor="rgba(0,0,0,0.8)"
                            darkColor="rgba(255,255,255,0.8)">
                            <strong>{key.split('_').join(' ').toUpperCase()}:</strong> {Array.isArray(book[key]) ? book[key][0] : book[key]}
                        </Text>
                    )
                })}
            </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bookDetailsContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  bookInfoText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
});
