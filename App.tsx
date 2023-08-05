import { useEffect, useState } from 'react';
import { SafeAreaView, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { globlaStyle } from './styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';

type task = {
  id: number;
  concluded: boolean;
  description: string;
}

export default function App() {
  const [tasks, setTasks] = useState<task[]>();
  const [currentTaskDescription, setCurrentTaskDescription] = useState('');
  const [editing, setEditing] = useState(false);

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

  const createTask = (description: string,) => {
    if (description) {
      const newTask: task = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        description,
        concluded: false,
      }
      setTasks((prev) => (prev ? [...prev, newTask] : [newTask]));
      setCurrentTaskDescription('');
    }
  };

  const editTask = (data: task) => {
    setTasks((prev) => prev?.map((task) => task.id === data.id ? data : task));
  };

  const deleteTask = (id: number,) => {
    setTasks(tasks?.filter((task) => task.id !== id));
  };

  return (
    <SafeAreaView style={globlaStyle.container}>
      <StatusBar
        animated={true}
        style="auto"
      />
      <View style={globlaStyle.tasksContainer}>
        <Text style={{ fontSize: 52 }}>
          Todo
          <Text style={{ color: "#0575F2", fontSize: 60 }}>.</Text>
        </Text>
        <ScrollView>
          {tasks && (
            tasks.map((task) => (
              <View key={task.id} style={globlaStyle.taskContainer}>
                <TouchableOpacity
                  style={task.concluded ? globlaStyle.finishTaskbutton : globlaStyle.unfinishTaskbutton}
                  onPress={() => editTask({...task, concluded: !task.concluded})}
                >
                  <Feather name="check" size={15} color="white" />
                </TouchableOpacity>
                <TextInput
                  value={task.description}
                  style={globlaStyle.taskInput}
                  onFocus={() => setEditing(true)}
                  onBlur={() => setEditing(false)}
                  onChange={({ nativeEvent }) => editTask({...task, description: nativeEvent.text})}
                />
                <TouchableOpacity
                  style={globlaStyle.deleteButton}
                  onPress={() => deleteTask(task.id)}
                >
                  <FontAwesome5  name="trash" size={16} color="red" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      </View>
      <View style={{ paddingHorizontal: 14, paddingTop: 8, paddingBottom: 18, flexDirection: 'row', justifyContent: 'space-between' }}>
      {!editing && (
        <>
          <TextInput
            value={currentTaskDescription}
            style={!editing ? globlaStyle.mainInput : globlaStyle.mainInputFullWidth}
            onChangeText={(text: string) => setCurrentTaskDescription(text)}
            onSubmitEditing={() => createTask(currentTaskDescription)}
          />
          <TouchableOpacity
            onPress={() => createTask(currentTaskDescription)}
            style={globlaStyle.buttonAddTask}
          >
            <Entypo name="plus" size={24} color="white" />
          </TouchableOpacity>
        </>  
      )}
      </View>
    </SafeAreaView>
  );
}

