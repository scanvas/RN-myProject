import React, {Component} from 'react';
import {
    View, Text, StyleSheet
} from 'react-native';

export default class ScanPage extends Component {
    static navigationOptions = {
        title: 'ProfileScreen'
      }
    render() {
        return (
            <View style={{flex: 1}}>
                {navigationBar}
                <View style={styles.container}>
                    <Text>ScanPage</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
    },
});