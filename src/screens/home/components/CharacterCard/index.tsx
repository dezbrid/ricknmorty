import React from 'react';
import {Text, View, Image} from 'react-native';
import {Character} from '@interfaces/character';
import styles from './styles';

function CharacterCard(character: Character) {
  const {name, image, status, species, location} = character;
  const pointStatusColor = {
    Alive: styles.backGroudGreen,
    Dead: styles.backGroudRed,
    unknown: styles.backGroudGray,
  };
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: image}} resizeMode="stretch" />
      <View style={styles.containerInfo}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.containerStatus}>
          <View style={[styles.statusPoint, pointStatusColor[status]]} />
          <Text style={styles.subtitle}>{`${status} - ${species}`}</Text>
        </View>
        <View style={styles.containerLocation}>
          <Text style={[styles.subtitle, styles.colorLocation]}>
            Last know location:
          </Text>
          <Text style={styles.subtitle}>{location.name}</Text>
        </View>
      </View>
    </View>
  );
}
export default CharacterCard;
