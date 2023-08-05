import { Dimensions, StyleSheet } from 'react-native';

export const globlaStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F9FB',
    justifyContent: 'center',
  },
  tasksContainer: {
    flex: 2,
    paddingHorizontal: 8,
  },
  mainInputContainer: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainInput: {
    borderColor: '#0575F2',
    fontSize: 24,
    paddingLeft: 4,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1.5,
    width: Dimensions.get('window').width / 1.4,
  },
  mainInputFullWidth: {
    borderColor: '#0575F2',
    fontSize: 24,
    paddingLeft: 4,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1.5,
    width: Dimensions.get('window').width / 1.1,
  },
  buttonAddTask: {
    width: 52,
    height: 52,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0575F2',
  }
});