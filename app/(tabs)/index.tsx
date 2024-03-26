import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TextInput } from 'react-native';
import useDebounce from '@/hooks/useDebounce';

import { Text, View } from '@/components/Themed';
import BookResult, { Book } from '@/components/BookResults';

export default function TabOneScreen(): JSX.Element {
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchterm = useDebounce(searchTerm, 500)
    const [booksResults, setBooksResults] = useState([])
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const booksResponse = await fetch(`https://openlibrary.org/search.json?title=${debouncedSearchterm}&limit=10`)

                if (!booksResponse.ok) {
                    throw new Error('Response was not ok.')
                }

                const data = await booksResponse.json()
                setBooksResults(data.docs)
            } catch (e) {
                setError((e as Error).message)
            }
        } 

        if (debouncedSearchterm.length > 0) {
            fetchBook()
        }
    }, [debouncedSearchterm])

    const booksList = booksResults.map((book: Book, index: number) => ({
        key: `${index}-${book.title}`,
        title: book.title,
        first_publish_year: book.first_publish_year,
        author_name: book.author_name,
        isbn: book.isbn,
        cover_i: book.cover_i,
    }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book search</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <TextInput style={styles.searchInput} value={searchTerm} placeholder="Search..." onChangeText={(text: string) => setSearchTerm(text)} />
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      {booksResults.length > 0 ? (
        <FlatList
            data={booksList}
            renderItem={({ item }) => (
                <View key={item.key}>
                    <BookResult book={item} />
                </View>
            )}
        />
      ) : (
        <Text>No results</Text>
      )} 
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
  searchInput: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  }
});
