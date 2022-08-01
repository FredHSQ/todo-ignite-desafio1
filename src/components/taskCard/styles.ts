import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    containerTaskConcluded: {
        backgroundColor: '#262626',
        borderWidth: 2,
        borderRadius: 8,
        height: 64,
        paddingVertical: 12,
        paddingLeft: 8,
        paddingRight: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
      },
      textTaskConcluded: {
        color: '#F2F2F2',
        width: 235,
        marginHorizontal: 8,
        textDecorationLine: 'line-through'
      },
      textTask: {
        color: '#F2F2F2',
        width: 235,
        marginHorizontal: 8,
      },
      containerTrash: {
        width: 32,
        height: 32,
        borderRadius: 8,
      }
})