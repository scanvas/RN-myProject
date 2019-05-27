// import React from 'react';

// import {createAppContainer, createStackNavigator} from 'react-navigation';

// import TabBar from './pages/TabBar';
// import HomePage from './pages/HomePage';
// import ScanPage from "./pages/ScanPage";
// import MinePage from "./pages/MinePage";
// import SharePage from "./pages/SharePage";


// const StackNavigator = createStackNavigator(
//     {
//         // TabBar: TabBar,
//         HomePage: HomePage,
//         MinePage: MinePage,
//         ScanPage: ScanPage,
//         SharePage: SharePage,
//     },
//     {
//         initialRouteName: 'HomePage',
//         defaultNavigationOptions: {
//             header: null
//         }
//     }
// );

// export default App = createAppContainer(StackNavigator);
// const navigator = createStackNavigator({
//     Home: { screen: HomePage },
//     Profile: { screen: ScanPage }
//   })

//   const App = createAppContainer(navigator)

//   export default App

import React ,{ Component }from 'react';
import { Text, View, Button } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomePage from './pages/HomePage';
import QuestionsPage from "./pages/QuestionsPage";
import MinePage from "./pages/MinePage";
import Search from "./pages/Search";
import List from "./pages/List";
import Follow from "./pages/Questions/Follow";
import Total from "./pages/Questions/Total";
import Voting from "./pages/Questions/Voting";
import MusicPlayer from "./pages/MusicPlayer"; // 音乐播放器组件
import MyWeb from "./pages/MyWeb"; // app内打开网页组件
import HuatiList from "./pages/HuatiList" // 话题列表组件
// const HomeStack = createStackNavigator({
//     //底部导航页面
//     Home: {
//         screen: HomePage,
//         navigationOptions: {
//             header: null  //顶部导航很多都会自己自定义，这里就为空
//         }
//     },
//     Search: {
//         screen: Search,
//     },
// }, {
//     //默认出现的首页页面
//     initialRouteName: 'Home'
// });

const QTab = createMaterialTopTabNavigator({
    Total:{
        screen:Total,
        navigationOptions:{
            title:"全部"
        }
    },
    Follow:{
        screen:MusicPlayer,
        navigationOptions:{
            title:"已关注"
        }
    },
    Voting:{
        screen:Voting,
        navigationOptions:{
            title:"投票中"
        }
    }
},{
    animationEnabled:false,
    initialRouteName:"Total",
    backBehavior:"none",
    order:["Total","Follow","Voting"],
    tabBarOptions:{
        activeTintColor:"red",
        inactiveTintColor:"#0366d6",
        // pressColor:"red",
        scrollEnabled:false,
        tabStyle:{
            // borderColor:"blue",
            // borderWidth:2,
            width:80,
            height:50,
            justifyContent:'center',
            alignContent:'center',
            alignSelf:'center'
        },
        indicatorStyle:{
            // backgroundColor: "blue",
            height:2,
            marginLeft:100
        },
        labelStyle:{
            // backgroundColor:"black"
            color:'#666'
        },
        style:{
            backgroundColor:"#fff",
            paddingLeft:100        }
    }
})








const TabNavigator = createBottomTabNavigator({
    Home: HomePage,
    Questions:QTab,
    User: MinePage
  }, 
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
            const {routeName} = navigation.state;
            let IconComponent = Icon;
            let iconName;
            if (routeName === 'Home') {
                //iconName = `home${focused ? '' : '-outline'}`;
                iconName = `home`;
                // Sometimes we want to add badges to some icons. 
                // You can check the implementation below.
                //IconComponent = HomeIconWithBadge; 
              } else if (routeName === 'Questions') {
                IconComponent = MaterialCommunityIcons;
                iconName = `comment-question-outline`;
              }else if(routeName === 'User'){
                iconName = `user`;
              }
              return <IconComponent name={iconName} size={25} color={tintColor} />;
        },
        tabBarLabel: ({focused, tintColor}) => {
            const {routeName} = navigation.state;
            let title;
            if (routeName === 'Home') {
                title = '首页';
            } else if (routeName === 'Questions') {
                title = '问答';
            }else if (routeName === 'User') {
                title = '我的';
            }
            return <Text
                style={{fontSize: 11, color: tintColor, marginBottom: 1.5, textAlign: 'center'}}>{title}</Text>;
        },
        tabBarOptions: {
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
            style: {
                backgroundColor: '#fff',
                paddingBottom: 1,
                borderTopWidth: 0.2,
                paddingTop: 1,
                borderTopColor: '#ccc',
            },
        },
        lazy: true,// 是否懒加载
    }),
}

);

// export default createAppContainer(TabNavigator);
// export default class App extends Component {
//     render() {
//         return (
//             <HomeStack/>
//         );
//     }
// }

const YNMain = createStackNavigator({
    Main: {
        screen: TabNavigator,
        navigationOptions: {
            header: null  //顶部导航很多都会自己自定义，这里就为空
        }
    },
    Search: {
        screen: Search,
        navigationOptions: {
            header: null 
        }
    },
    List: {
        screen: List,
        navigationOptions: {
            header: null 
        }
    },
    // MusicPlayer:{
    //     screen: MusicPlayer,
    //     navigationOptions: {
    //         title:'MusicPlayer'
    //     }
    // },
    MyWeb:{
        screen: MyWeb,
    },
    HuatiList:{
        screen: HuatiList,
        navigationOptions: {
            title: '话题列表' 
        }
    }
},
{
    initialRouteName: 'Main',
}
);
export default createAppContainer(YNMain);

// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//         <YNMain/>
//     );
//   }
// }