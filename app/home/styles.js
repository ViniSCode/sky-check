import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  container: {
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 60,
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 100,
  },
  search: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    borderBottomColor: '#585858' ,
    borderBottomWidth: 1,
    paddingVertical: 5,
    maxWidth: '95%',
    marginHorizontal: 'auto',
    position: 'relative',
    width: '100%',
  },
  input: {
    textAlign: 'center',
    color: '#585858',
    fontSize: 33,
    width: '100%',
  },
  searchIcon: {
    color: '#585858',
    position: 'absolute',
    left: 10,
    top: 16,
  },
  weatherContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherInfo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  weatherImage: {
    width: 100,
  },
  temperature: {
    color: 'white',
    fontSize: 92,
  },
  location: {
    fontSize: 18,
    color: '#585858',
    marginTop: 10,
  },
  description: {
    marginTop: 20,
    fontSize: 18,
    color: '#585858'
  },
  date: {
    fontSize: 22,
    color: '#585858'
  }
})