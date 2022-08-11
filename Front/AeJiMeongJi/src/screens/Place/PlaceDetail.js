import React, {useEffect, useLayoutEffect, useState} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {View, Pressable, Text, Image, FlatList} from 'react-native';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native';
import {Colors} from '../../constants/styles';
import DetailInfo from '../../components/Place/DetailInfo';
import PlaceMap from '../../components/Place/PlaceMap';
import {getPlaceImage, searchPlace, getAvatar} from '../../utils/place';
import Review, {reviewData} from '../../components/Place/Review';
import ReviewCarousel from '../../components/Place/ReviewCarousel';
import CategoryDummy from '../../components/Place/CategoryDummy';

const DummyData = [
  {
    id: 1,
    source:
      'https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_960_720.jpg',
  },
  {
    id: 2,
    source:
      'https://cdn.pixabay.com/photo/2017/04/10/22/28/residence-2219972_960_720.jpg',
  },
  {
    id: 3,
    source:
      'https://cdn.pixabay.com/photo/2013/04/11/19/46/building-102840__340.jpg',
  },
  {
    id: 4,
    source:
      'https://cdn.pixabay.com/photo/2015/11/17/18/59/architecture-1048092__340.jpg',
  },
  {
    id: 5,
    source:
      'https://cdn.pixabay.com/photo/2017/03/05/00/34/panorama-2117310__340.jpg',
  },
  {
    id: 6,
    source:
      'https://cdn.pixabay.com/photo/2017/10/17/19/11/fantasy-2861815__340.jpg',
  },
  {
    id: 7,
    source:
      'https://cdn.pixabay.com/photo/2016/09/19/22/46/lake-1681485__340.jpg',
  },
];

const renderItem = ({item, index}, parallaxProps) => {
  return (
    <View style={styles.item}>
      <ParallaxImage
        source={{uri: item.source}}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.4}
        {...parallaxProps}
      />
    </View>
  );
};

const PlaceDetail = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  // useLayoutEffect(() => {
  //   const getLocation = async () => {
  //     // const res = await searchPlace('경상북도 구미시 여헌로 87-8');
  //     // setLatitude(+res.y);
  //     // setLongitude(+res.x);
  //     const res = await getAvatar();
  //   };
  //   getLocation();
  // }, []);

  return (
    <ScrollView style={styles.rootContainer}>
      <Carousel
        sliderWidth={responsiveWidth(100)}
        sliderHeight={responsiveHeight(10)}
        itemWidth={responsiveWidth(55)}
        data={DummyData}
        renderItem={renderItem}
        showSpinner={true}
        firstItem={3}
        hasParallaxImages={true}
      />
      <View style={styles.infoContainer}>
        <DetailInfo />
      </View>
      <View>
        {/* <FlatList
        key={'#'}
        data={CategoryDummy}
        renderItem={ReviewCarousel} /> */}
        <ReviewCarousel />
      </View>
      <View style={styles.mapContainer}>
        <PlaceMap latitude={latitude} longitude={longitude} />
      </View>
      <View style={styles.reviewContainer}>
        <FlatList
          key={'#'}
          data={reviewData}
          renderItem={Review}
          numColumns={1}
        />
        {/* <Review /> */}
      </View>
    </ScrollView>
  );
};

export default PlaceDetail;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.back100,
    marginTop: responsiveHeight(3),
  },
  item: {
    width: responsiveWidth(50),
    height: responsiveWidth(50),
  },
  infoContainer: {
    marginVertical: responsiveHeight(4),
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  mapContainer: {},
  reviewContainer: {},
});
