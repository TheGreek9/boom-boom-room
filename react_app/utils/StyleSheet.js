import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  homeScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150
  },
  homeBanner: {
   height: 150
  },
  listContainer: {
    flex: 1,
    paddingTop: 22
  },
  titleText: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  lobbyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  lobbyText: {
    fontSize: 21,
    marginRight: 20,
    marginLeft: 20
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})