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
import {Character} from '@interfaces/character';
import {ListKeyExtractor} from '@interfaces/generic';
import {
  requestCharacterAsync,
  //characterList,  //createAsyncThunk
  listLoading,
  errorMessage,
  characterName,
} from '@redux/characterSlice';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {useGetCharacterByNameQuery} from '@services/character';

import styles from './styles';
import BarSearch from './components/BarSearch';
import CharacterCard from './components/CharacterCard';

function Home() {
  /* RTK */
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [characterList, setCharacterList] = useState<Character[]>([]);
  const nameSearch = useAppSelector(characterName);
  const {currentData, isFetching} = useGetCharacterByNameQuery({
    name: nameSearch,
    page: currentPage,
  });
  useEffect(() => {
    if (currentData?.info.prev === null) {
      setCharacterList(currentData?.results || []);
    } else {
      setCharacterList(array => [...array, ...(currentData?.results || [])]);
    }
  }, [currentData]);
  useEffect(() => {
    setCurrentPage(1);
  }, [nameSearch]);
  /* RTK */
  // const characters = useAppSelector(characterList); //createAsyncThunk
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
    // dispatch(requestCharacterAsync({next: true})); //createAsyncThunk

    if (Number(currentData?.info.pages) > currentPage) {
      setCurrentPage(x => x + 1);
    } //RTK
  };
  const footerComponent = () => {
    if (loading || isFetching) {
      return <ActivityIndicator size="large" />;
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <BarSearch />
      <FlatList<Character>
        //data={characters} //createAsyncThunk
        data={characterList} //RTK
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={separator}
        ListEmptyComponent={emptyComponent}
        // extraData={[characters, loading]} //createAsyncThunk
        extraData={[characterList, loading, isFetching]} // RTK
        onEndReachedThreshold={0.1}
        onEndReached={handleMoresCharacters}
        ListFooterComponent={footerComponent}
        ListFooterComponentStyle={styles.footer}
      />
    </SafeAreaView>
  );
}

export default Home;
