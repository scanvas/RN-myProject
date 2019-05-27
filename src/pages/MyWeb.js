
import React from 'react';
import { View, StyleSheet, WebView, Text } from 'react-native';

export default class MyWeb extends React.Component {
    static navigationOptions=((props)=>{
        return {
          title:props.navigation.state.params.userInfo
        }
      });
    constructor(props) {
        super(props);

        this.state = {
        }
    }
    componentWillMount(){

    }
    render() {
        const data=this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <Text>{ data.userName }</Text>
                <WebView source={{uri: 'https://www.baidu.com/'}}>
                </WebView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#363636',
        flexDirection: 'column'
    },
});

