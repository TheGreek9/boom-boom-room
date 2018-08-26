import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Image } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import axios from 'axios';

function CardShare(props) {
  return (
      <Card
        title={props.title}
        image={{uri: 'https://cf.geekdo-images.com/medium/img/g8c7-JXOAIrnQwi2SzK9aTqI5yk=/fit-in/500x500/filters:no_upscale()/pic1836130.png'}}
        imageStyle={styles.image}>
        <Text>
          <Text style={{fontWeight: "bold"}}>GOAL</Text>: {props.description}
        </Text>
        <Button
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 20}}
          title="Color Share"
          onPress={props.onPress}
        />
      </Card>
  )
}

function ColorShare(props) {
  return (
      <Card containerStyle={styles.card2}>
        <Text style={{color: 'white'}}>
            THE BLUE TEAM
        </Text>
        <Button
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 200}}
          title="Card Share"
          onPress={props.onPress}
        />
      </Card>
  )
}

export default class CardDetailsScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isTextShowing: true
        }
    }

    changeCard = () => {
        this.setState(prevState => ({
          isTextShowing: !prevState.isTextShowing
        }));
    }

    render() {
    let display;
    let textShow = this.state.isTextShowing;
    let title = this.state.title;
    let color = this.state.color;
    let description = this.state.description;

    if (textShow) {
      display = <CardShare
        onPress={this.changeCard}
        title={title}
        description={description}
        />;
    } else {
      display = <ColorShare onPress={this.changeCard} />;
    }

    return (
      <View style={styles.container}>
        {display}
      </View>
    );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 200,
    height: 300,
    marginLeft: 70,
  },
  card2: {
    backgroundColor: 'blue',
    width: 200,
    height: 300,
  }
});
