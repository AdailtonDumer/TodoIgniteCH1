import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from '../assets/icons/trash/trash.png'

interface TaskItemProps {
    index: number,
    item: {
        id: number,
        title: string,
        done: boolean,
    },
    removeTask: (itemId: number) => void
    toggleTaskDone: (itemId: number) => void,
    editTask: (id: number, newTitle: string) => void
}

export function TaskItem({ index, item, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(item.title);
    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing() {
        setEditing(true);
    }
    function handleCancelEditing() {
        setEditing(false);
        setTitle(item.title);
    }
    function handleSubmitEditing() {
        setEditing(false);
        editTask(item.id, title);
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (editing) {
                textInputRef.current.focus()
            } else {
                textInputRef.current.blur()
            }
        }
    }, [editing])

    return (
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(item.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        style={
                            item.done ? styles.taskMarkerDone : styles.taskMarker
                        }
                    >
                        {item.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        style={
                            item.done ? styles.taskTextDone : styles.taskText
                        }
                        value={title}
                        editable={editing}
                        onChangeText={setTitle}
                        onSubmitEditing={handleSubmitEditing}
                        ref={textInputRef}
                    />
                </TouchableOpacity>
            </View>
            <View style={{alignItems:'center', flexDirection: 'row'}}>
                {
                    editing ? 
                    (
                        <TouchableOpacity onPress={handleCancelEditing}>
                            <Icon name="x" color={'#B2B2B2'} size={20}/>
                        </TouchableOpacity>
                    ) : 
                    (
                        <TouchableOpacity onPress={handleStartEditing}>
                            <Icon name="edit" color={'#B2B2B2'} size={20}/>
                        </TouchableOpacity>
                    )
                }
                <TouchableOpacity
                    testID={`trash-${index}`}
                    style={[{ paddingHorizontal: 24 }]}
                    onPress={() => removeTask(item.id)}
                    disabled={editing}
                >
                    <Image source={trashIcon} style={editing ? {opacity : 0.5} : {}}/>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    }
})