import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (tasks.find(task => task.title == newTaskTitle.trim())) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
      return
    }

    const item: Task = {
      id: new Date().getTime(),
      done: false,
      title: newTaskTitle
    }
    setTasks(old => [...old, item])
  }

  function handleToggleTaskDone(id: number) {
    const updated = tasks.map(task => ({ ...task }));

    const item = updated.find(task => task.id == id);
    if (!item)
      return

    item.done = !item.done;

    setTasks(updated);
  }

  function handleEditTask(id: number, newTitle: string) {
    const updated = tasks.map(task => ({ ...task }));

    const item = updated.find(task => task.id == id);
    if (!item)
      return

    item.title = newTitle;

    setTasks(updated);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item',
      'Tem certeza que você deseja remover esse item?',
      [{ text: 'Não' }, {
        text: 'Sim', onPress: () => {
          setTasks(old => old.filter(task => task.id !== id))
        }
      }]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})