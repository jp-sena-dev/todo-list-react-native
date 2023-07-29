import { useState } from 'react';
import { FlatList, SafeAreaView, Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { globlaStyle } from './styles/global';

type task = {
  concluded: boolean;
  description: string;
}

export default function App() {
  const [tasks, setTasks] = useState<task[]>();
  const [currentTaskDescription, setCurrentTaskDescription] = useState('')

  const createTask = (description: string) => {
    setTasks((prev) => prev ? [...prev as task[], {description, concluded: false}] : [{description, concluded: false}] );
    setCurrentTaskDescription('');
  };
  
  console.log(tasks);

  return (
    <SafeAreaView style={globlaStyle.container}>
      <StatusBar style="auto" />
      <View>
        <TextInput
          value={currentTaskDescription}
          style={globlaStyle.input}
          onChangeText={(text: string) => setCurrentTaskDescription(text)}
          onSubmitEditing={() => createTask(currentTaskDescription)}
        />
        <FlatList
          data={tasks}
          renderItem={(task) => (
            <View>
              <Text>{ task.item.description }</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

