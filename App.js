import { StatusBar } from 'expo-status-bar';
//import React from 'react';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button } from 'react-native';


const Stack = createNativeStackNavigator();

const MyStack = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

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
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MyStack;

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <Button
                color='#35327a'
                title="Start Game"
                onPress={() =>
                    navigation.navigate("Questions", { question: "How many planets are there?" })
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
    return <Text>Question: {route.params.question}</Text>;
};


const RulesScreen = ({ navigation, route }) => {
    return <Text>Instructions:</Text>;
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },
});
