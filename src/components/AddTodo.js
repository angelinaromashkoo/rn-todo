import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Alert, Keyboard} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {THEME} from "../theme";

export const AddTodo = ({onSubmit}) => {
    const [value, setValue] = useState("");
    const {block, input} = styles;

    const pressHandler = () => {
        if (value.trim()) {
            onSubmit(value)
            setValue("")
            Keyboard.dismiss()
        } else {
            Alert.alert('Название дела не может быть пустым')
        }
    }

    return (
        <View style={block}>
            <TextInput style={input}
            value={value}
            onChangeText={setValue}
            placeholder="Введите название дела"
            autoCorrect={false}
            autoCapitalize='none'
            />
            <AntDesign.Button onPress={pressHandler} name='pluscircle'>
                Добавить
            </AntDesign.Button>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    input: {
        width: '70%',
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 3,
        borderBottomColor: THEME.MAIN_COLOR
    }
})
