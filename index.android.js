/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Navigator
 } from 'react-native';

 import Detail from './detail';
 import List from './list';

 var store = {
   events: [],
   url: ""
 };

 class MyFirstReactProject extends React.Component {
   render() {
     return (
       <Navigator
         initialRoute={{
           name: 'List'
         }}
         renderScene={this.renderScene}
       />
     );
   }

   renderScene(route, navigator) {
     if (route.name === 'List') {
       return (
         <List
           navigator={navigator}
           store={store}
         />
       )
     }
     if (route.name == 'Detail') {
       return (
         <Detail
           navigator={navigator}
           store={store}
         />
       )
     }
   }
 }

 AppRegistry.registerComponent('MyFirstReactProject', () => MyFirstReactProject);
