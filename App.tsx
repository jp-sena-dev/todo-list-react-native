import { useState } from 'react';
import { FlatList, SafeAreaView, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
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
    const updatedTasks = tasks;
    if (updatedTasks) {
      updatedTasks[id] = { concluded, description };
      setTasks([...updatedTasks]);
    }
  };

  const deleteTask = (id: number,) => {
    setTasks(tasks?.filter((_task, index) => id !== index))
  };

  return (
    <SafeAreaView style={globlaStyle.container}>
      <StatusBar
        animated={true}
        style="auto"
      />
      <ScrollView>
        <View style={globlaStyle.tasksContainer}>
          <TextInput
            value={currentTaskDescription}
            style={globlaStyle.mainInput}
            onChangeText={(text: string) => setCurrentTaskDescription(text)}
            onSubmitEditing={() => createTask(currentTaskDescription)}
          />
          <FlatList
            data={tasks}
            renderItem={(task) => (
              <View style={globlaStyle.taskContainer}>
                <View style={globlaStyle.taskInformations}>
                  <TextInput
                    value={task.item.description}
                    style={globlaStyle.taskInput}
                    onChange={({ nativeEvent }) => editTask(task.index, nativeEvent.text, task.item.concluded)}
                  >
                  </TextInput>
                  <TouchableOpacity
                    style={globlaStyle.deleteButton}
                    onPress={() => deleteTask(task.index)}
                  >
                    <FontAwesome5  name="trash" size={16} color="red" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={task.item.concluded ? globlaStyle.finishTaskbutton : globlaStyle.unfinishTaskbutton}
                  onPress={() => editTask(task.index, task.item.description, !task.item.concluded)}
                >
                  <Feather name="check" size={30} color="white" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

