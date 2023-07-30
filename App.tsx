import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { globlaStyle } from './styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';

type task = {
  concluded: boolean;
  description: string;
}

export default function App() {
  const [tasks, setTasks] = useState<task[]>();
  const [currentTaskDescription, setCurrentTaskDescription] = useState('');

  const saveTaks = async () => {
    try {
      const value = await JSON.stringify(tasks)
      await AsyncStorage.setItem('tasks', value);
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = async () => {
    try {
      const res = await AsyncStorage.getItem('tasks');
      const tasksSaved = await JSON.parse(res);
      if (res) setTasks(tasksSaved);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    saveTaks();
  }, [tasks]);

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = (description: string) => {
    setTasks((prev) => prev ? [...prev as task[], {description, concluded: false}] : [{description, concluded: false}]);
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
    setTasks(tasks?.filter((_task, index) => id !== index));
  };

  return (
    <SafeAreaView style={globlaStyle.container}>
      <StatusBar
        animated={true}
        style="auto"
      />
      <ScrollView>
        <View style={globlaStyle.tasksContainer}>
          <Text style={{ fontSize: 52 }}>
            Todo
            <Text style={{ color: "#0575F2", fontSize: 60 }}>.</Text>
          </Text>
          <FlatList
            data={tasks}
            renderItem={(task) => (
              <View style={globlaStyle.taskContainer}>
                <TouchableOpacity
                  style={task.item.concluded ? globlaStyle.finishTaskbutton : globlaStyle.unfinishTaskbutton}
                  onPress={() => editTask(task.index, task.item.description, !task.item.concluded)}
                >
                  <Feather name="check" size={15} color="white" />
                </TouchableOpacity>
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
            )}
          />
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 14, paddingTop: 8, paddingBottom: 18, flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput
          value={currentTaskDescription}
          style={globlaStyle.mainInput}
          onChangeText={(text: string) => setCurrentTaskDescription(text)}
          onSubmitEditing={() => createTask(currentTaskDescription)}
        />
        <TouchableOpacity
          onPress={() => createTask(currentTaskDescription)}
          style={globlaStyle.buttonAddTask}
        >
          <Entypo name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

