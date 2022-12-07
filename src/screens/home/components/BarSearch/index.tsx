import React, {useState, useEffect, SetStateAction, Dispatch} from 'react';
import {View, Image, TextInput, TouchableOpacity} from 'react-native';
import useDebounce from '@hooks/useDebounce';
import {mediumGray} from '@constants/colors';

import iconSerch from './assets/ic_search.png';
import clearIcon from './assets/ic_close.png';
import styles from './styles';

interface Props {
  findByName: Dispatch<SetStateAction<string>>;
}

function BarSearch({findByName}: Props) {
  const [search, setSearch] = useState<string>('');
  const debouncesSearch = useDebounce(search, 500);
  useEffect(() => {
    findByName(debouncesSearch);
  }, [debouncesSearch, findByName]);

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
