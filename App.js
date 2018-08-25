import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Image, FlatList, ScrollView, SectionList } from 'react-native';
import { Button, Card } from 'react-native-elements';
import HomeScreen from './react_app/components/home_screen';
import CardSetListScreen from './react_app/components/card_set_list';
import DeckDetailsScreen from './react_app/components/deck_details';
import { createStackNavigator } from 'react-navigation';
import axios from 'axios';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    CardSetList: CardSetListScreen,
    DeckDetails: DeckDetailsScreen
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

