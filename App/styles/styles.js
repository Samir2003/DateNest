import StyleSheet from 'react-native'

const styles = StyleSheet.create({
  screen: {

  },
  animatedView: {
    flexDirection: 'row', 
    padding: 18, 
    marginBottom: 10, 
    backgroundColor: '#FFF', 
    borderRadius: 50, 
    borderColor: "#979797", 
    borderWidth: 2,
    shadowColor: "#e81919",
    elevation: 600,
    opacity: 1,
    transform: [{ scale }]
  },
  trash: {
    top: "5%",
    borderRadius: 10,
    right: "8%"
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
  },
  buttonStyle: {
    height: 54,
    width: '80%',
    marginTop: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2EE59D',
    shadowRadius: 5,
    shadowOpacity: 0.7,
    shadowColor: 'rgba(46, 229, 157, 0.5)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  buttonTextStyle: {
    color: '#fdfdfd',
    fontWeight: '700',
  },
});


export default styles