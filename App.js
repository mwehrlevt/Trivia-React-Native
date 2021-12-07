import { StatusBar } from 'expo-status-bar';
//import React from 'react';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SelectPicker from 'react-native-form-select-picker';


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
                <Stack.Screen
                    name="Game Over"
                    component={EndScreen}
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
    var totalPoints = 0;
    
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
                    navigation.navigate("Questions", { allQuestions: data, num: num, totalPoints: totalPoints } )
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

function addAfter(array, index, newItem) {
    return [
        ...array.slice(0, index),
        newItem,
        ...array.slice(index)
    ];
}

const QuestionsScreen = ({ navigation, route }) => {
    const [selected, setSelected] = useState();
    const totalQuestions = route.params.allQuestions;
    var number = route.params.num;
    var totalPoints= route.params.totalPoints;
    const question = route.params.allQuestions.results[number];
    const incorrectAnswers = question.incorrect_answers;
    const index = Math.floor(Math.random() * (3 + 1));
    const allAnswers = addAfter(incorrectAnswers, index, question.correct_answer);
    return (
        <View>
            <Text style={styles.baseText}>{question.question}</Text>
            <SelectPicker 
                style={styles.baseText}
                placeholder = "--Select Answer--"
                onValueChange={(value) => {
                    // Do anything you want with the value. 
                    // For example, save in state.
        
                    setSelected(value);

                    
                }}
                selected={selected}
                >
                
                {Object.values(allAnswers).map((val, index) => (
                    <SelectPicker.Item label={val} value={val} key={index} />
                ))}
                

		    </SelectPicker>
            <Button
            color='#35327a'
            title="Answer"
            onPress={() => {
                setSelected("--Select Answer--");
                navigation.navigate("Answers", { totalQuestions: totalQuestions, num: number, answer: selected, totalPoints: totalPoints } )
            }
            }
        />
        </View>
    );
};


const RulesScreen = ({ navigation, route }) => {
    return <Text style={styles.baseTextRules}>Instructions: To begin the game, press the Start Game button. A question will appear and will give you a list of possible answers. Select the option you think is correct. At the end of the game, you will see your score.</Text>;
};

const AnswerScreen = ({ navigation, route}) => {
    var numberOn = route.params.num
    var endGame = route.params.endGame
    var text = ""
    var totalPoints = route.params.totalPoints;
    console.log(totalPoints);
    var answerSelected = route.params.answer
    const question = route.params.totalQuestions.results[numberOn];
    const totalQuestions = route.params.totalQuestions
    
    if (question.correct_answer !== answerSelected) {
        text="Incorrect Answer! The correct answer was: "
    }
    else {
        totalPoints += 1
        text = "Correct Answer!" 
    }

    numberOn += 1
    if (numberOn > 9) {
        numberOn = 0
        endGame = true
    }

    if (endGame === true) {
        return (
            <View>
                <Text style={styles.baseText}>{text}</Text>
                <Button
                    color='#35327a'
                    title="Next Question"
                    onPress={() =>
                        navigation.navigate("Game Over", { allQuestions: totalQuestions, num: numberOn, totalPoints: totalPoints })
                    }
                />
            </View>
        );
    }
    else {
        return (
            <View>
                <Text style={styles.baseText}> {text} </Text>
                <Text style={styles.baseTextAnswer}> {question.correct_answer} </Text>
                <Button
                    color='#35327a'
                    title="Next Question"
                    onPress={() =>
                        navigation.navigate("Questions", { allQuestions: totalQuestions, num: numberOn, totalPoints: totalPoints })
                    }
                />
            </View>
        );
    }
};

const EndScreen = ({ navigation, route }) => {
    var totalPoints= route.params.totalPoints;
    console.log(totalPoints);
    return (
        <View>
            <Text style={styles.baseText}> Game Over! Your total was {totalPoints} points!</Text>
            <Button
                color='#35327a'
                title="Back to Home"
                onPress={() =>
                    navigation.navigate("Home")
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
    baseText: {
        paddingTop: 10,
        paddingLeft: 15,
        paddingBottom: 10,
        fontFamily: "Cochin",
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    baseTextRules: {
        paddingTop: 10,
        paddingLeft: 15,
        paddingBottom: 10,
        fontFamily: "Cochin",
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center', 
    },
    baseTextAnswer: {
        paddingTop: 5,
        paddingLeft: 15,
        paddingBottom: 10,
        fontFamily: "Cochin",
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center', 
    }
});
