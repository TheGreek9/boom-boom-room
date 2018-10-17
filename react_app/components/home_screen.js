import React from 'react';
import { Text, View, Image } from 'react-native';

import { MainButton, StyleButton, HomeButton } from '../utils/Button';
import Scroller from '../utils/Scroller'
import { styles } from '../utils/StyleSheet';
import { ngrok_game_server_site } from '../utils/EnvironmentVars';

export default class HomeScreen extends React.Component {
    render () {
        return (
          <View style={styles.homeScreenContainer}>
            <Image
              source={require('../utils/images/boom_boom_title.png')}
              style={styles.homeBanner}
              resizeMode='center'
            />
            <HomeButton
              title="HOST GAME"
              onPress={() => {
                  this.props.navigation.navigate('HostPage')
              }}
            />
            <HomeButton
              title="JOIN GAME"
              onPress={() => {
                  this.props.navigation.navigate('GameLobby')
              }}
            />
          </View>
        );
    }
}