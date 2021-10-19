import { StatusBar } from 'expo-status-bar';
import React from 'react';
//import { StackNavigator } from '@react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button } from 'react-native';


const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Welcome' }}
                />
                <Stack.Screen
                    name="Questions"
                    component={QuestionsScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MyStack;

const HomeScreen = ({ navigation }) => {
    return (
        <Button
            title="Start Game"
            onPress={() =>
                navigation.navigate("Trivia", { question: "How many planets are there?" })
            }
        />
    );
};

const QuestionsScreen = ({ navigation, route }) => {
    return <Text>Question: {route.params.question}</Text>;
};




/*export default Trivia = StackNavigator(
    {
        Home: { screen: HomePage },
        Questions: { screen: QuestionPage }
    }
);
App() {

  return (
    <View style={styles.container}>
          <Text>Welcome to Trivia!</Text>
        <StatusBar style="auto" />
    </View>
  );
}


class HomePage extends Component {
    static navigationOptions = {
        title: "MainScreen",
    };


    goToQuestionPage = () => {
        this.props.navigation.navigate("QuestionPage");
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome to Trivia!</Text>
                <Button
                    onPress={this.goToQuestionPage}
                    title="Start Game"
                    color="#841584"
                    accessibilityLabel="Start the trivia game with this button" />
            </View>
        );
    }
}

class QuestionPage extends Component {
    static navigationOptions = {
        title: "SecondActivity",
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Question 1!</Text>
            </View>
        );
    }
}*/



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
