import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import BoomButton from '../utils/Button'
import { imagePaths } from '../utils/ImagePaths'

export default class BoomCard extends React.Component{
  render(){
    return (
      <Card
        title={this.props.title}
      >
        <Image
            source={imagePaths[this.props.imageSource]}
            style={styles.image}
        />
          <Divider style={styles.divider} />
        <Text>
          <Text style={{fontWeight: "bold"}}>GOAL</Text>: {this.props.description}
        </Text>
        <BoomButton
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 20}}
          title="Color Share"
          onPress={this.props.onPress}
        />
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 350,
    marginLeft: 20,
    marginRight: 20
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'grey'
  }
});
