import React, {useState, useContext} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {THEME} from "../theme";
import {FontAwesome, AntDesign} from "@expo/vector-icons";
import {AppCard} from "../components/ui/AppCard";
import {EditModal} from "../components/EditModal";
import {AppTextBold} from "../components/ui/AppTextBold";
import {AppButton} from "../components/ui/AppButton";
import {TodoContext} from "../context/todo/todoContext";
import {ScreenContext} from "../context/screen/screenContext";

export const TodoScreen = () => {
    const {todos, updateTodo, removeTodo} = useContext(TodoContext);
    const {todoId, changeScreen} = useContext(ScreenContext);

    const todo = todos.find(t => t.id === todoId)

    const {buttons, button, title, card} = styles;

    const [modal, setModal] = useState(false);

    const saveHandler = async title => {
        await updateTodo(todo.id, title)
        setModal(false)
    }

    return (
        <View>
            <EditModal
                value={todo.title}
                visible={modal}
                onCancel={() => setModal(false)}
                onSave={saveHandler}
            />

            <AppCard style={card}>
                <AppTextBold style={title}>{todo.title}</AppTextBold>
                <AppButton onPress={() => setModal(true)}>
                    <FontAwesome name="edit" size={20}/>
                </AppButton>
            </AppCard>

            <View style={buttons}>
                <View style={button}>
                    <AppButton color={THEME.GREY_COLOR} onPress={() => changeScreen(null)}>
                        <AntDesign name="back" size={20} color="#fff" />
                    </AppButton>
                </View>

              <View style={button}>
                  <AppButton color={THEME.DANGER_COLOR} onPress={() => removeTodo(todo.id)}>
                      <FontAwesome name="remove" size={20} color="#fff" />
                  </AppButton>
              </View>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    button: {
        width: Dimensions.get('window').width > 400 ? 150 : 100
    },
    title: {
        fontSize: 20
    },
    card: {
        marginBottom: 20,
        padding: 15
    }
});
