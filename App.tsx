import { useEffect, useState } from 'react';
import { SafeAreaView, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { globlaStyle } from './styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, TaskData } from './src/components/task';

export default function App() {
  const [tasks, setTasks] = useState<TaskData[]>();
  const [currentTaskDescription, setCurrentTaskDescription] = useState('');
  const [editing, setEditing] = useState(false);

  const getTasks = async () => {
    try {
      const res = await AsyncStorage.getItem('tasks');
      if (res) {
        const tasksSaved = await JSON.parse(res);
        setTasks(tasksSaved);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const createTask = (description: string,) => {
    if (description) {
      const newTask: TaskData = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        description,
        isConcluded: false,
      }
      setTasks((prev) => (prev ? [...prev, newTask] : [newTask]));
      setCurrentTaskDescription('');
    }
  };

  const editTask = (data: TaskData) => {
    setTasks((prev) => prev?.map((task) => task.id === data.id ? data : task));
  };

  const deleteTask = (id: number,) => {
    setTasks(tasks?.filter((task) => task.id !== id));
  };

  const saveTaks = async () => {
    try {
      const value = await JSON.stringify(tasks)
      await AsyncStorage.setItem('tasks', value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    saveTaks();
  }, [tasks]);
  
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
          {tasks && tasks.map((task) => (
            <Task 
              key={task.id}
              data={task}
              HandleEdit={editTask}
              deleteTask={deleteTask}
              setEditing={setEditing}
            />
          ))}
        </ScrollView>
      </View>
      <View style={globlaStyle.mainInputContainer}>
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
