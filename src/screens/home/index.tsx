import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Character, RequestCharacter} from '@interfaces/character';
import {ListKeyExtractor, Nullable} from '@interfaces/generic';

import styles from './styles';
import BarSearch from './components/BarSearch';
import CharacterCard from './components/CharacterCard';

const INITIAL_URL = 'https://rickandmortyapi.com/api/character';
function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [url, setUrl] = useState<Nullable<string>>('');
  const [loading, setLoading] = useState<Boolean>(false);

  const requestCharacterApi = async (currenturl: string) => {
    setLoading(true);
    const response = await fetch(`${currenturl}`, {method: 'GET'});
    const data: RequestCharacter = await response.json();
    setUrl(data.info.next);
    setCharacters(array => [...array, ...data.results]);
    setLoading(false);
  };

  useEffect(() => {
    requestCharacterApi(INITIAL_URL);
  }, []);

  const renderItem: ListRenderItem<Character> = ({item}) => (
    <CharacterCard {...item} />
  );
  const keyExtractor: ListKeyExtractor<Character> = (_, i) => i.toString();
  const separator = () => <View style={styles.separator} />;

  const emptyComponent = () => (
    <Text style={styles.text}>no hay resultado </Text>
  );
  const handleMoresCharacters = () => {
    if (url) {
      requestCharacterApi(url);
    }
  };
  const footerComponent = () => {
    if (loading) {
      return <ActivityIndicator size="large" />;
    }
    return null;
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <BarSearch />
      <FlatList<Character>
        data={characters}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={separator}
        ListEmptyComponent={emptyComponent}
        extraData={[characters, loading]}
        onEndReachedThreshold={0.1}
        onEndReached={handleMoresCharacters}
        ListFooterComponent={footerComponent}
        ListFooterComponentStyle={styles.footer}
      />
    </SafeAreaView>
  );
}

export default Home;
