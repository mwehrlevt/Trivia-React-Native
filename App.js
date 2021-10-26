import { StatusBar } from 'expo-status-bar';
//import React from 'react';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Welcome to Trivia!' }}
                />
                <Stack.Screen
                    name="Questions"
                    component={QuestionsScreen}
                />
                <Stack.Screen
                    name="Rules"
                    component={RulesScreen}
                />
                <Stack.Screen
                    name="Answers"
                    component={AnswerScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MyStack;

const HomeScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    var num = 0;
    
    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);
    console.log(data)
    return (
        <View>
            <Button
                color='#35327a'
                title="Start Game"
                onPress={() =>
                    navigation.navigate("Questions", { allQuestions: data, num: num } )
                }
            />
            <Button
                color='#35327a'
                title="Rules"
                onPress={() =>
                    navigation.navigate("Rules")
                }
                />
        </View>
    );
};

const QuestionsScreen = ({ navigation, route }) => {
    const totalQuestions = route.params.allQuestions;
    var number = route.params.num;
    const question = route.params.allQuestions.results[number];
    return (
        <View>
            <Text> { question.question } </Text>
            <Button
            color='#35327a'
            title="Answer"
            onPress={() =>
                navigation.navigate("Answers", { totalQuestions: totalQuestions, num: number } )
            }
        />
        </View>
    );
};


const RulesScreen = ({ navigation, route }) => {
    return <Text>Instructions:</Text>;
};

const AnswerScreen = ({ navigation, route}) => {
    var numberOn =  route.params.num
    const question = route.params.totalQuestions.results[numberOn];
    const totalQuestions = route.params.totalQuestions
    numberOn += 1
    if (numberOn > 9) {
        numberOn = 0
    }
    return (
        <View>
            <Text> { question.correct_answer } </Text>
            <Button
            color='#35327a'
            title="Next Question"
            onPress={() =>
                navigation.navigate("Questions", { allQuestions: totalQuestions, num: numberOn} )
            }
        />
        </View>
    );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },
});
