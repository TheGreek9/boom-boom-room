import React from 'react';
import { Button } from 'react-native-elements';
import {StyleSheet, TouchableOpacity} from "react-native";

export class MainButton extends React.Component{
    render(){
        const { onPress, title, disabled } = this.props
        return (
            <Button
                Component={TouchableOpacity}
                raised
                buttonStyle={styles.button}
                title={title}
                onPress={onPress}
                disabled={disabled}
                disabledStyle={{opacity: 0}}
            />
        )
    }
}

export class StyleButton extends React.Component{
    render(){
        const { onPress, title, disabled, buttonStyle, buttonColor } = this.props
        var bStyle = this.props.style ? this.props.style : styles.button
        var bTitleStyle = this.props.titleStyle ? this.props.titleStyle : null
        return (
            <Button
                Component={TouchableOpacity}
                raised
                buttonStyle={[styles.descButton, bStyle]}
                title={title}
                titleStyle={{fontSize: 2}}
                disabled={disabled}
                disabledStyle={{opacity: 0}}
                onPress={onPress}
            />
        )
    }
}

export class HomeButton extends React.Component{
    render(){
        const { onPress, title } = this.props
        return (
            <Button
                Component={TouchableOpacity}
                raised
                buttonStyle={styles.homeButton}
                title={title}
                onPress={onPress}
            />
        )
    }
}

MainButton.defaultProps = {
  disabled: false
}

StyleButton.defaultProps = {
  disabled: false
}

const styles = StyleSheet.create({
  button: {
      backgroundColor: '#006699',
      margin: 10,
      borderRadius: 10,
  },
  descButton: {
    margin: 10,
    borderRadius: 10,
  },
  homeButton: {
    height: 100,
    width: 250,
    marginTop: 80,
    backgroundColor: '#006699',
    margin: 10,
    borderRadius: 10
  }
});