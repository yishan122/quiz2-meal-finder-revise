import React, { useState, useEffect, Component, useRef } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('beef');
  const [loading, setLoading] = useState(false);

  const getMeals = async () => {
    try {
      setLoading(true);
      const url =
        'https://www.themealdb.com/api/json/v1/1/filter.php?i=' + search;
      const response = await fetch(url);
      const json = await response.json();
      console.log(json)
      setData(json.meals);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMeals();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Meal Finder</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <Text allowFontScaling={false}>Main Ingredient: </Text>
        <TextInput
          style={{ width: 100 }}
          allowFontScaling={false}
          placeholder="Input search word ..."
          clearButtonMode="while-editing"
          keyboardType="text"
          defaultValue={search || ''}
          placeholderTextColor="grey"
          onChangeText={(search) => setSearch(search)}
          returnKeyType="send"
          onSubmitEditing={() => {
            setData([]);
            getMeals();
          }}
        />
      </View>
      {loading ? (
        <View
          style={{
            height: 300,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ textAlign: 'center', fontStyle: 'italic' }}>
            Loading ...
          </Text>
        </View>
      ) : (
        <></>
      )}
      {loading == false && data == null ? (
        <View
          style={{
            height: 300,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ textAlign: 'center', fontStyle: 'italic' }}>
            Nothing
          </Text>
        </View>
      ) : (
        <></>
      )}
      <View style={styles.items}>
        {data &&
          data.map((item, key) => {
            return (
              <View style={styles.item}>
                <Text style={styles.mealName}>{item.strMeal}</Text>
                <Image
                  resizeMode="cover"
                  style={styles.image}
                  source={{
                    uri: item.strMealThumb,
                  }}
                />
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: 600,
    marginBottom: 15,
  },
  items: {
    paddingBottom: 160,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 3,
    borderColor: '#000',
    marginTop: 20,
    backgroundColor: 'orange',
  },
  mealName: {
    fontSize: 18,
  },
  image: {
    width: 80,
    height: 80,
  },
});
