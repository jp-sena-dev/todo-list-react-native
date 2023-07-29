import { Dimensions, StyleSheet } from 'react-native';

export const globlaStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 50,
  },
  tasksContainer: {
    flex: 2,
    paddingHorizontal: 8,
  },
  mainInput: {
    borderColor: '#000',
    fontSize: 24,
    paddingLeft: 4,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 2,
  },
  taskInput: {
    width: Dimensions.get('window').width / 1.3,
    fontSize: 20,
  },
  deleteButton: {
    height: 18,
    width: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishTaskbutton: {
    height: 45,
    width: 45,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#287c6d',
  },
  unfinishTaskbutton: {
    height: 45,
    width: 45,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5d5d60',
  },
  taskContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 2,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  taskInformations: {
    rowGap: 8,
    // flex: 1,
    // flexDirection: 'column',
  },
});