import React, {useState, useEffect} from 'react';
import {View, Image, TextInput, TouchableOpacity} from 'react-native';
import useDebounce from '@hooks/useDebounce';
import {mediumGray} from '@constants/colors';
import {
  /*requestCharacterAsync,*/ setCharacterName,
} from '@redux/characterSlice';
import {useAppDispatch} from '@hooks/redux';

import iconSerch from './assets/ic_search.png';
import clearIcon from './assets/ic_close.png';
import styles from './styles';

function BarSearch() {
  const [search, setSearch] = useState<string>('');
  const dispatch = useAppDispatch();
  const debouncesSearch = useDebounce(search, 500);
  useEffect(() => {
    //dispatch(requestCharacterAsync({name: debouncesSearch.trim()})); //createAsyncThunk
    dispatch(setCharacterName(debouncesSearch.trim()));
  }, [debouncesSearch, dispatch]);

  const handlePressClearSearch = () => {
    setSearch('');
  };
  const handleChangeText = (text: string) => {
    setSearch(text);
  };
  return (
    <View style={styles.container}>
      <View style={[styles.barSearch, styles.barSearchShadow]}>
        <Image
          source={iconSerch}
          resizeMode="contain"
          style={styles.iconSearch}
        />
        <TextInput
          autoComplete="off"
          autoCorrect={false}
          style={styles.inputStyle}
          placeholder={'Buscar por nombre'}
          placeholderTextColor={mediumGray}
          onChangeText={handleChangeText}
          value={search}
          autoCapitalize="none"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={handlePressClearSearch}>
            <Image
              source={clearIcon}
              resizeMode="contain"
              style={styles.clearIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
export default BarSearch;
