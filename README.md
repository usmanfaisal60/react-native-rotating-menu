### React native rotating icons

#### Installation
    npm install react-native-rotating-menu

## =========== Please note===========

>This package needs [`react-native-gesture-handler`](https://github.com/software-mansion/react-native-gesture-handler) to work. Install it before proceeding with this package 

This project is a work in progress. Suggestions and issues are always welcomed.

### Usage

```
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import RoundMenu from './react-native-rotating-menu';
import facebook from './images/facebook.png';
import google from './images/google.png';
import insta from './images/insta.png';
import speaker from './images/speaker.png';
import twitter from './images/twitter.png';

const style = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
  },
  centerImage: {
    width: '100%',
    height: '100%'
  }
});

const App = () => {
  const content = [
    <Image source={facebook} resizeMode="contain" style={style.icon} />,
    <Image source={google} resizeMode="contain" style={style.icon} />,
    <Image source={insta} resizeMode="contain" style={style.icon} />,
    <Image source={twitter} resizeMode="contain" style={style.icon} />,
  ]

  return (
    <>
      <RoundMenu
        centerContent={<Image source={speaker} resizeMode="contain" style={style.centerImage} />}
        content={content} />
    </>
  );
};

export default App;
```

![DEMO IMAGE](https://raw.githubusercontent.com/usmanfaisal60/react-native-rotating-menu/master/src/readme-images/simple.gif)

### Props and usage
- `size` (number)
    `default value = total width of the device`
    Size of the outer container can be changed. Bear in mind that the size of most of the things inside the package is calculated based on the size prop. So changing this value will also affect the dimensions of the content elements container
    ```
    <RoundMenu
        size={300}
        backgroundColor="#EEEEEE"
        centerContent={<Image source={speaker} resizeMode="contain" style={style.centerImage} />}
        content={content} />
    ```

    ![SIZE IMAGE](https://raw.githubusercontent.com/usmanfaisal60/react-native-rotating-menu/master/src/readme-images/size.jpg)
- `content` (JSX elements array)
    `An array of JSX elements to be presented in the circular fashion`
    Place your content elements in this prop as an array. The code will place them in a circular order with equally distant from each other
- `contentContainerStyle` (style object)
  This style object will be applied to the view around the elements which are passed to the content array
  ```
    <RoundMenu
        contentContainerStyle={{
          backgroundColor: "#DDDDDD",
          borderRadius: 10,
        }}
        centerContent={<Image source={speaker} resizeMode="contain" style={style.centerImage} />}
        content={content} />
    ```
    ![STYLE IMAGE](https://raw.githubusercontent.com/usmanfaisal60/react-native-rotating-menu/master/src/readme-images/style.jpg)
    You can only apply the following styles
  - `backgroundColor` set the background color of the container (Optional)
  - `borderColor` set the border color of the container (Optional)
  - `borderRadius` set the border radius of the container (Optional)
  - `borderWidth` set the border width of the container (Optional)
- `centerContent` (JSX element)
  This is going to be displayed in the center. For example an image or a view
- `backgroundColor` (color string)
    ```
    <RoundMenu
        backgroundColor="teal"
        centerContent={<Image source={speaker} resizeMode="contain" style={style.centerImage} />}
        content={content} />
    ```

    ![BGCOLOR IMAGE](https://raw.githubusercontent.com/usmanfaisal60/react-native-rotating-menu/master/src/readme-images/bgcolor.jpg)
- `rotateCenterImage` (boolean)
  If set to true, the center component will also rotate along with the rest of the icons. Defaults to false
  ```
  <RoundMenu
        rotateCenterImage
        centerContent={<Image source={speaker} resizeMode="contain" style={style.centerImage} />}
        content={content} />
  ```
  ![ROT IMAGE](https://raw.githubusercontent.com/usmanfaisal60/react-native-rotating-menu/master/src/readme-images/rotate.gif)
- `centerContentSize` (number)
  Center content contianer size. Default value is `size/4`
  ```
   <RoundMenu
        centerContentSize={200}
        centerContent={<Image source={speaker} resizeMode="contain" style={style.centerImage} />}
        content={content} />
  ```
  ![CENTERSIZE IMAGE](https://raw.githubusercontent.com/usmanfaisal60/react-native-rotating-menu/master/src/readme-images/centersize.jpg)