import {
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export type TaskData = {
  id: number;
  isConcluded: boolean;
  description: string;
}

interface TaskProps {
  data: TaskData;
  HandleEdit: (param: TaskData) => void;
  deleteTask: (param: number) => void;
  setEditing: (param: boolean) => void;
}

export function Task({
  data,
  HandleEdit,
  deleteTask,
  setEditing,
}: TaskProps) {
  return (
    <View key={data.id} style={taskStyle.taskContainer}>
      <TouchableOpacity
        style={data.isConcluded ? taskStyle.finishTaskbutton : taskStyle.unfinishTaskbutton}
        onPress={() => HandleEdit({...data, isConcluded: !data.isConcluded})}
      >
        <Feather name="check" size={15} color="white" />
      </TouchableOpacity>
      <TextInput
        value={data.description}
        style={taskStyle.taskInput}
        onFocus={() => setEditing(true)}
        onBlur={() => setEditing(false)}
        onChange={({ nativeEvent }) => HandleEdit({...data, description: nativeEvent.text})}
      />
      <TouchableOpacity
        style={taskStyle.deleteButton}
        onPress={() => deleteTask(data.id)}
      >
        <FontAwesome5  name="trash" size={16} color="red" />
      </TouchableOpacity>
    </View>
  );
}

const taskStyle = StyleSheet.create({
  taskInput: {
    width: Dimensions.get('window').width / 1.4,
    fontSize: 20,
  },
  deleteButton: {
    height: 18,
    width: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishTaskbutton: {
    height: 25,
    width: 25,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#39A20A',
  },
  unfinishTaskbutton: {
    height: 25,
    width: 25,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#d7d7d7',
    borderWidth: 1,
  },
  taskContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
});
