import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Character} from '@interfaces/character';
import {ListKeyExtractor} from '@interfaces/generic';
import {
  requestCharacterAsync,
  characterList,
  listLoading,
  errorMessage,
} from '@redux/characterSlice';
import {useAppDispatch, useAppSelector} from '@hooks/redux';

import styles from './styles';
import BarSearch from './components/BarSearch';
import CharacterCard from './components/CharacterCard';

function Home() {
  const characters = useAppSelector(characterList);
  const loading = useAppSelector(listLoading);
  const errorRequest = useAppSelector(errorMessage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(requestCharacterAsync({}));
  }, [dispatch]);

  const renderItem: ListRenderItem<Character> = ({item}) => (
    <CharacterCard {...item} />
  );
  const keyExtractor: ListKeyExtractor<Character> = (_, i) => i.toString();
  const separator = () => <View style={styles.separator} />;

  const emptyComponent = () => <Text style={styles.text}>{errorRequest} </Text>;
  const handleMoresCharacters = () => {
    dispatch(requestCharacterAsync({next: true}));
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
        onEndReachedThreshold={0.2}
        onEndReached={handleMoresCharacters}
        ListFooterComponent={footerComponent}
        ListFooterComponentStyle={styles.footer}
      />
    </SafeAreaView>
  );
}

export default Home;
