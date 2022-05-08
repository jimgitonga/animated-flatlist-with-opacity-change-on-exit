
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import * as React from 'react';
 import {
  StatusBar,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
 } from 'react-native';
 import {faker} from '@faker-js/faker';
 const {width, height} = Dimensions.get('screen');
 faker.seed(10);
 const DATA = [...Array(30).keys()].map((_, i) => {
   return {
     key: faker.datatype.uuid(),
     image: `https://randomuser.me/api/portraits/${faker.helpers.arrayElement([
       'women',
       'men',
     ])}/${faker.datatype.number(60)}.jpg`,
     name: faker.name.findName(),
     jobTitle: faker.name.jobTitle(),
     email: faker.internet.email(),
   };
 });
 
 const SPACING = 20;
 const AVATAR_SIZE = 70;
 const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
 const BG_IMG =
   'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';
 
 export default function App() {
   console.log(DATA.length);
   const scrollY = React.useRef(new Animated.Value(0)).current;
   return (
     <View style={{flex: 1, backgroundColor: '#fff'}}>
       <Image
         source={{uri: BG_IMG}}
         style={StyleSheet.absoluteFillObject}
         blurRadius={80}
       />
 
       <Animated.FlatList
         data={DATA}
         contentContainerStyle={{
           padding: SPACING,
           paddingTop: StatusBar.currentHeight || 42,
         }}
         keyExtractor={item => item.key.toString()}
         onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        )}
         renderItem={({item, index}) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });
        // 
           return (
             <Animated.View
               key={index}
               style={{
                 flexDirection: 'row',
                 padding: SPACING,
                 marginBottom: SPACING,
                 backgroundColor: 'rgba(255,255,255,0.8)',
                 borderRadius: 12,
                 elevation: 3,
                
               }}>
               <Image
                 source={{uri: item.image}}
                 style={{
                   width: AVATAR_SIZE,
                   height: AVATAR_SIZE,
                   borderRadius: AVATAR_SIZE,
                   margin: SPACING / 2,
                 }}
               />
               <View>
                 <Text style={{fontSize: 22, fontWeight: '700'}}>
                   {item.name}
                 </Text>
                 <Text style={{fontSize: 18, opacity: 0.7}}>
                   {item.jobTitle}
                 </Text>
                 <Text style={{fontSize: 22, opacity: 0.8}}>{item.email}</Text>
               </View>
             </Animated.View>
           );
         }}
       />
     </View>
   );
 }
 