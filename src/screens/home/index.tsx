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

const INITIAL_URL: string = 'https://rickandmortyapi.com/api/character';

function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [characterName, setCharacterName] = useState<string>('');

  const [url, setUrl] = useState<Nullable<string>>('');
  const [loading, setLoading] = useState<Boolean>(false);

  const requestCharacterApi = async (currenturl: string, push: boolean) => {
    setLoading(true);
    const response = await fetch(`${currenturl}`, {method: 'GET'});
    if (response.ok) {
      const data: RequestCharacter = await response.json();
      setUrl(data.info.next);
      if (push) {
        setCharacters(array => [...array, ...data.results]);
      } else {
        setCharacters(data.results);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    requestCharacterApi(INITIAL_URL, false);
  }, []);
  useEffect(() => {
    if (characterName.length > 0) {
      requestCharacterApi(`${INITIAL_URL}/?name=${characterName}`, false);
    } else {
      requestCharacterApi(INITIAL_URL, false);
    }
  }, [characterName]);

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
      requestCharacterApi(url, true);
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
      <BarSearch findByName={setCharacterName} />
      <FlatList<Character>
        data={characters}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={separator}
        ListEmptyComponent={emptyComponent}
        extraData={[characters, loading]}
        onEndReachedThreshold={0.2}
        onEndReached={handleMoresCharacters}
        ListFooterComponent={footerComponent}
        ListFooterComponentStyle={styles.footer}
      />
    </SafeAreaView>
  );
}

export default Home;
