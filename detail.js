'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import Button from 'react-native-button';

var Detail = React.createClass({
  render: function(){
    var index = this.props.store.selected_index;
    return(
      <View style={styles.container}>
        <Text>{this.props.store.events[index].url}</Text>
        <Text>Event ID :{index}</Text>
        <Text>Fav Count:{this.props.store.events[index].user.followers_count}</Text>
        <Button
          style={{fontSize: 20, color: 'pink'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._handleFavButton()}>
          Fav!!
        </Button>
        <Button
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._handleBackButton()}>
          Back
        </Button>
      </View>
    );
  },
  _handleBackButton: function() {
    this.props.navigator.pop();
  },
  _handleFavButton: function() {
    var index = this.props.store.selected_index;
    this.props.store.events[index].user.followers_count += 1;
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
});

module.exports = Detail;
