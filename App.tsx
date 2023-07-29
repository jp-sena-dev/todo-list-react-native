import { useState } from 'react';
import { FlatList, SafeAreaView, Text, TextInput, View, TouchableOpacity } from 'react-native';
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

  const editTask = (id: number, description: string, concluded: boolean) => {
    setTasks(tasks?.map((data, index) => (
      index === id ? { description, concluded } : data
    )));
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
              <TextInput onSubmitEditing={({ nativeEvent }) => editTask(task.index, nativeEvent.text, task.item.concluded)}>
                { task.item.description }
              </TextInput>
              <TouchableOpacity
                style={task.item.concluded ? globlaStyle.finishTaskbutton : globlaStyle.unfinishTaskbutton}
                onPress={({ nativeEvent }) => editTask(task.index, task.item.description, !task.item.concluded)}  
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

