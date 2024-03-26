import BookDetailsModal from '@/app/book-details-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export interface Book {
    title: string;
    first_publish_year: number;
    author_name: string;
    isbn: any
    cover_i: number
}

interface BookResultsProps {
    book: Book
}

const BookResults: React.FC<BookResultsProps> = ( { book }  ) =>  {
    const handlePress = async () => {
        try {
            await AsyncStorage.setItem('book', JSON.stringify(book));
        }
        catch  {
            console.error('Could not add book to local storage')
        }
      };

    return (
        <Link href="/book-details-modal" asChild >
            <TouchableOpacity  style={styles.container} onPress={handlePress} >
            {book.cover_i ? (
                <Image source={{ uri: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` }} style={styles.image} />
            ) : (
                <Text style={styles.noCover}>No cover</Text>
            )}
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{book?.title}</Text>
                <Text>First published year: {book?.first_publish_year}</Text>
                <Text>Author: {book?.author_name}</Text>
                {book.isbn && <Text>ISBN: {book?.isbn[0]}</Text>}
            </View>
        </TouchableOpacity>
        </Link>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    image: {
        width: 70,
        height: 120,
        marginRight: 10,
    },
    noCover: {
        width: 70,
        height: 120,
        marginRight: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    detailsContainer: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default BookResults