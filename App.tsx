import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View, TextInput, TouchableOpacity, FlatList, Text } from 'react-native';

import LogoTODO from './src/assets/Logo.png';
import PlusIcon from './src/assets/plus.png';

import ClipBoardIcon from './src/assets/Clipboard.png';

import { useEffect, useState } from 'react';
import { TaskCard } from './src/components/taskCard';

export interface Task {
  name: string,
  concluded: boolean,
}

export default function App() {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    name: '',
    concluded: false,
  });
  const [concluidas, setConcluidas] = useState<number>(0);
  const [criadas, setCriadas] = useState<number>(0);

  useEffect(() => {
    let count = 0
    taskList.map(item => {
      item.concluded && count++
    })
    setCriadas(taskList.length - count);
    setConcluidas(count);
  }, [taskList])

  function handleDelete(indexDelete: number) {
    let newTaskList = taskList.filter((task, index) => {
      return index !== indexDelete
    })
    setTaskList(newTaskList);
  }

  function handleConcluded(indexConcluded: number) {
    let newTask: Task = {
      name: taskList[indexConcluded].name,
      concluded: !taskList[indexConcluded].concluded
    }
    let newTaskList = [...taskList]
    newTaskList[indexConcluded] = newTask;

    setTaskList(newTaskList);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent={true} />
      <View style={styles.containerLogo}>
        <Image source={LogoTODO} />
      </View>
      <View style={styles.containerInput}>
        <TextInput
          onChangeText={(e) => {
            console.log(taskList);
            let task: Task = {
              name: e,
              concluded: false,
            }
            setNewTask(task)
          }}
          placeholderTextColor={'#808080'}
          placeholder='Adicione uma nova tarefa'
          style={styles.input}
        />
        <TouchableOpacity onPress={() => {
          setTaskList([...taskList, newTask])
        }} style={styles.plus}>
          <Image source={PlusIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerList}>
        <View style={styles.containerHeaderList}>
          <View style={styles.containerTituloEQuantidade}>
            <Text style={styles.textCriadas}>
              Criadas
            </Text>
            <Text style={styles.containerQuantidade}>
              {criadas}
            </Text>
          </View>
          <View style={styles.containerTituloEQuantidade}>
            <Text style={styles.textConcluidas}>
              Concluídas
            </Text>
            <Text style={styles.containerQuantidade}>
              {concluidas}
            </Text>
          </View>

        </View>
        {taskList.length !== 0 ?
          <FlatList
            data={taskList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index, }) => {
              return (
                <TaskCard handleConcluded={handleConcluded} handleDelete={handleDelete} index={index} item={item}/>
              )
            }} />
          :
          <View style={styles.containerVazio}>
            <Image style={styles.imageVazio} source={ClipBoardIcon} />
            <Text style={styles.textTituloVazio}>
              Você ainda não tem tarefas cadastradas
            </Text>
            <Text style={styles.textCorpoVazio}>
              Crie tarefas e organize seus itens a fazer
            </Text>
          </View>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#454545',
    alignItems: 'center',
  },
  containerLogo: {
    backgroundColor: '#0d0d0d',
    height: 87,
    padding: 60,
    width: '100%',
    alignItems: 'center',
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    marginTop: 95
  },
  input: {
    width: 271,
    height: 52,
    padding: 16,
    backgroundColor: '#262626',
    borderRadius: 6,
    marginRight: 4,
    color: '#F2F2F2',
  },
  plus: {
    height: 52,
    width: 52,
    backgroundColor: '#1E6F9F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  containerList: {
    marginTop: 55,
  },
  containerHeaderList: {
    width: 327,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textCriadas: {
    color: "#4EA8DE",
    fontWeight: '700',
    fontSize: 14,
  },
  textConcluidas: {
    color: "#8284FA",
    fontWeight: '700',
    fontSize: 14,
  },
  containerTituloEQuantidade: {
    flexDirection: 'row'
  },
  containerQuantidade: {
    marginLeft: 8,
    width: 25,
    borderRadius: 999,
    textAlign: 'center',
    color: '#D9D9D9',
    backgroundColor: '#333333',
    fontWeight: '700',
    fontSize: 14,
  },
  containerVazio: {
    borderColor: '#333333',
    borderTopWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    height: 208,
  },
  imageVazio: {
    marginBottom: 16,
  },
  textTituloVazio: {
    fontWeight: '700',
    fontSize: 14,
    color: '#808080',
  },
  textCorpoVazio: {
    fontSize: 14,
    color: '#808080',
  },
});
