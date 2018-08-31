import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Image } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import BoomButton from '../utils/Button'
import { createStackNavigator } from 'react-navigation';
import axios from 'axios';

function CardShare(props) {
  return (
      <Card
        title={props.title}
      >
        <Image
            source={require('../../boomboom/images/blue_team.png')}
            style={styles.image}
        />
          <Divider style={styles.divider} />
        <Text>
          <Text style={{fontWeight: "bold"}}>GOAL</Text>: {props.description}
        </Text>
        <BoomButton
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
        <BoomButton
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 200}}
          title="Card Share"
          onPress={props.onPress}
        />
      </Card>
  )
}

export default class CardDetails extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isTextShowing: true,
            title: this.props.title,
            color: this.props.color,
            description: this.props.description
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
    width: 250,
    height: 350,
    marginLeft: 20,
    marginRight: 20
  },
  card2: {
    backgroundColor: 'blue',
    width: 300,
    height: 400,
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'grey'
  }
});
