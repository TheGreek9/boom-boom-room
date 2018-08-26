import React, { Component } from 'react';
import axios from 'axios';
import { Alert, StyleSheet, Text, View, Image, FlatList, ScrollView, SectionList } from 'react-native';
import { Button, Card } from 'react-native-elements';

import { createStackNavigator } from 'react-navigation';
import HomeScreen from './react_app/components/home_screen';
import CardSetListScreen from './react_app/components/card_set_list';
import DeckDetailsScreen from './react_app/components/deck_details';
import CardDetailsScreen from './react_app/components/card_details';



const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    CardSetList: CardSetListScreen,
    DeckDetails: DeckDetailsScreen,
    CardDetails: CardDetailsScreen
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

