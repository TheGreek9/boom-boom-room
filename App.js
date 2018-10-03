import React, { Component } from 'react';
import axios from 'axios';
import { Alert, StyleSheet, Text, View, Image, FlatList, ScrollView, SectionList } from 'react-native';
import { Button, Card } from 'react-native-elements';

import { createStackNavigator } from 'react-navigation';
import HomeScreen from './react_app/components/home_screen';
import CardSetListScreen from './react_app/components/card_set_list';
import DeckDetailsScreen from './react_app/components/deck_details';
import GameLobbyScreen from './react_app/components/game_lobby';
import HostPageScreen from './react_app/components/host_start_page';


const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    HostPage: HostPageScreen,
    CardSetList: CardSetListScreen,
    DeckDetails: DeckDetailsScreen,
    GameLobby: GameLobbyScreen
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

