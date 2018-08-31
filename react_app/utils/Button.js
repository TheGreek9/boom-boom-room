import React from 'react';
import { Button } from 'react-native-elements';
import {StyleSheet} from "react-native";

export default class BoomButton extends React.Component{
    render(){
        const { onPress, title } = this.props
        return (
            <Button
                    raised
                    buttonStyle={styles.button}
                    title={title}
                    onPress={onPress}
            />
        )

    }

}

const styles = StyleSheet.create({
  button: {
      backgroundColor: '#03A9F4',
      margin: 10,
      borderRadius: 10,
  }
});