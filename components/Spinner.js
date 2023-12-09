import {View, ActivityIndicator, Text, Modal, StyleSheet} from 'react-native'

const Spinner = ({loading}) => {
    return (
        <View style={styles.container}>
        <Modal
          transparent={true}
          animationType="none"
          visible={loading}
          onRequestClose={() => {
            // Handle modal close if needed
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          </View>
        </Modal>
      </View>
    )
}


const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    //   backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity as needed
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
  });


export default Spinner;