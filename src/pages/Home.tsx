import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const item : Task = {
      id: new Date().getTime(),
      done : false,
      title : newTaskTitle
    }
    setTasks(old => [...old, item])
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updated = tasks.map(task => ({...task}));

    const item = updated.find( task => task.id == id);
    if(!item)
      return

    item.done = !item.done;

    setTasks(updated);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    setTasks(old => old.filter(task => task.id !== id))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
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