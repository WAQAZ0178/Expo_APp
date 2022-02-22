import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'What is the meaning of life?'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'What are my options?'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Why is the sky blue?'
  }
]

export default function DoctorQuestionsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {DATA.map(item => {
        return (
          <View key={item.id} style={styles.questionCardStyle}>
            <Text style={styles.itemTextStyle}>{item.title}</Text>
          </View>
        )
      })}
    </SafeAreaView>
  )
}

DoctorQuestionsScreen.navigationOptions = {
  title: 'Questions to Ask Your Doctor'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  questionCardStyle: {
    backgroundColor: '#434470',
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 10
  },
  itemTextStyle: {
    color: '#FFFFFF'
  },
  title: {
    fontSize: 32
  }
})
