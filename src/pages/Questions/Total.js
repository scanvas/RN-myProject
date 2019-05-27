import React, {Component} from 'react';
import {
    View, Text, StyleSheet
} from 'react-native';
import Picker from 'react-native-picker';
import ImagePicker from 'react-native-image-picker';
import * as WeChat from 'react-native-wechat';
import Video from 'react-native-video';
let jsonData = require('../../assets/area.json');
let data = [];
for(let i in jsonData){
    let obj = new Object();
    let arr = jsonData[i];
    for(let j in arr){
        obj[i] = [];
        for(let k in arr[j]){
            obj[i].push(k);
        }
    }
    data.push(obj);
}

const options = {
    title: '请选择图片来源',
    cancelButtonTitle:'取消',
    chooseFromLibraryButtonTitle:'相册图片',
    takePhotoButtonTitle:'拍照',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  
export default class Total extends Component {
    constructor( props ){
      super(props);
      this.state={
        userCity:'',
        companyAreaArray:[]
    }
      WeChat.registerApp('wxbc79e19076fd1ed9');
    }
    _createAreaData = () => {
        let data = [];
        let len = area.length;
        for(let i=0;i<len;i++){
            let city = [];
            for(let j=0,cityLen=area[i]['city'].length;j<cityLen;j++){
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }

            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }
    xxx=()=>{
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('用户取消了选择！');
            } else if (response.error) {
              console.log('ImagePicker发生错误：', response.error);
            } else if (response.customButton) {
              console.log('自定义按钮点击：', response.customButton);
            } else {
              const source = { uri: response.uri };
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
              this.setState({
                avatarSource: source,
              });
            }
          });
    }
    sss = ()=>{
      WeChat.isWXAppInstalled()
      .then((isInstalled) => {
          if (isInstalled) {
              WeChat.shareToSession({type: 'text', description: '测试微信好友分享的文本内容'})
                  .catch((error) => {
                      alert(error.message);
                  });
          } else {
              alert('请安装微信');
          }
      });
    }
    sss1 = ()=>{
      WeChat.isWXAppInstalled()
      .then((isInstalled) => {
          if (isInstalled) {
              WeChat.shareToSession({
                  title:'微信好友测试的链接',
                  description: '分享的标题内容',
                  thumbImage: '分享的标题图片',
                  type: 'news',
                  webpageUrl: '分享的链接'
              })
                  .catch((error) => {
                      Alert.alert(error.message);
                  });
          } else {
              Alert.alert('请安装微信');
          }
      });
    }
    sss2 = ()=>{
      WeChat.isWXAppInstalled()
      .then((isInstalled) => {
          if (isInstalled) {
              WeChat.shareToTimeline({type: 'text', description: '测试微信朋友圈分享的文本内容'})
                  .catch((error) => {
                      Alert.alert(error.message);
                  });
          } else {
              Alert.alert('请安装微信');
          }
      });
    }
    sss3 = ()=>{
      WeChat.isWXAppInstalled()
      .then((isInstalled) => {
          if (isInstalled) {
              WeChat.shareToTimeline({
                  title:'分享的标题',
                  description: '分享的标题内容',
                  thumbImage: '分享的标题图片',
                  type: 'news',
                  webpageUrl: '分享的链接'
              })
                  .catch((error) => {
                      Alert.alert(error.message);
                  });
          } else {
              Alert.alert('请安装微信');
          }
      });
    }
    sss4 =()=>{
      Picker.init({
        pickerData: data,
        // pickerData: this._createAreaData(),
        selectedValue: this.state.companyAreaArray,
        pickerConfirmBtnText: '确认',
        pickerCancelBtnText: '取消',
        pickerConfirmBtnColor: [70,123,237,1],
        pickerCancelBtnColor: [144,144,144,1],
        pickerTitleColor: [51,51,51,1],
        pickerToolBarBg: [255,255,255,1],
        pickerToolBarFontSize: 15,
        pickerBg: [245,245,245,1],
        pickerFontColor: [48,48,48,1],
        pickerFontSize: 17,
        pickerTextEllipsisLen:10,
        pickerRowHeight: 100,
        pickerTitleText: '选择城市',
        onPickerConfirm: data => {
            this.setState({
                companyAreaArray: data,
                userCity: data.join('-'),
                // isShowMengCeng: false,
            })
        },
        onPickerCancel: data => {
            // this.setState({isShowMengCeng: false})
        },
    });
    Picker.show();
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <Text onPress={()=>{this.xxx()}} style={{height:50,backgroundColor:'yellow'}}>Total</Text>
                    {/* <Picker
                    selectedValue='js'
                    style={{ height: 50 }}
                    onValueChange={(itemValue, itemIndex) => {}}>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                    </Picker> */}
                    <Text onPress={()=>{this.sss()}} style={{height:50,backgroundColor:'yellow'}}>分享好友文本</Text>
                    <Text onPress={()=>{this.sss1()}} style={{height:50,backgroundColor:'yellow'}}>分享好友链接</Text>
                    <Text onPress={()=>{this.sss2()}} style={{height:50,backgroundColor:'yellow'}}>分享朋友圈文本</Text>
                    <Text onPress={()=>{this.sss3()}} style={{height:50,backgroundColor:'yellow'}}>分享朋友圈链接</Text>
                    <Text onPress={()=>{this.sss4()}} style={{height:50,backgroundColor:'yellow'}}>{this.state.userCity}</Text>
                    {/* <Video source={require('../../assets/video1.mp4')}   // Can be a URL or a local file.
                      // ref={(ref) => {
                      //   this.player = ref
                      // }}                                      // Store reference
                      // onBuffer={this.onBuffer}                // Callback when remote video is buffering
                      // onError={this.videoError}               // Callback when video cannot be loaded
                      style={{width: 300, height: 300}} /> */}
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});