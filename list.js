'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  Navigator
} from 'react-native';

var QIITA_REACTJS_ENTRY_URL = "https://qiita.com/api/v2/tags/reactjs/items";

var List = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      // リモートから取ってこない場合はここでdataSourceをreturnすれば勝手にListViewに渡る
      //dataSource: ds.cloneWithRows(['Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'John', 'Joel'])
      dataSource: ds
    };
  },
  componentDidMount: function(){
    this.fetchData();
  },
  render: function() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) =>
            <TouchableHighlight onPress={() => this.onPressed(rowData, rowID)}>
              <View style={styles.listViewElement}>
                <Image
                  style={styles.icon}
                  source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
                />
                <View style={styles.listTextContainar}>
                  <Text style={styles.listText}>{rowData.title}</Text>
                  <Text>{rowData.created_at}</Text>
                  <View style={styles.rowstyle}>
                    <Image
                      style={styles.favIcon}
                      source={require('./img/fav-red.png')}
                    />
                    <Text>{rowData.user.followers_count}</Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
           }
        />
      </View>
    );
  },
  onPressed: function(_rowData, _rowID) {
    // storeに選択したイベントIDを保存
    this.props.store.selected_index = _rowID;
    this.props.navigator.push({
      name: 'Detail',
      // なぜか動かない
      // passProps: { url: _rowData.url }
    });
  },
  fetchData: function() {
    fetch(QIITA_REACTJS_ENTRY_URL)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      this.props.store.events = responseData;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.props.store.events)
      });
    })
    .done();
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  icon: {
    flex: 1,
    height: 100,
    margin: 8,
  },
  listTextContainar: {
    marginRight: 40,
    flex: 3,
  },
  listText: {
    color: 'black',
    fontWeight: 'bold',
  },
  listViewElement: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#eeeeee'
  },
  rowstyle: {
    flexDirection: 'row',
  },
  favIcon: {
    height: 20,
    width: 20,
    marginRight: 5,
  },
});

module.exports = List;
