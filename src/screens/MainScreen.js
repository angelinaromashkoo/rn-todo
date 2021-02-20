import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, StyleSheet, FlatList, Image, Dimensions} from 'react-native';
import {AddTodo} from "../components/AddTodo";
import {Todo} from "../components/Todo";
import {TodoContext} from "../context/todo/todoContext";
import {ScreenContext} from "../context/screen/screenContext";
import {THEME} from "../theme";
import {AppLoader} from "../components/ui/AppLoader";
import {AppText} from "../components/ui/AppText";
import {AppButton} from "../components/ui/AppButton";

export const MainScreen = ({openTodo}) => {
    const {addTodo, todos, removeTodo, fetchTodos, loading, error} = useContext(TodoContext);
    const {changeScreen} = useContext(ScreenContext);

    const {imgWrap, img} = styles;

    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2)

    const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

    useEffect(() => {
        loadTodos()
    }, [])

    useEffect(() => {
        const update = () => {
            const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
            setDeviceWidth(width)
        }

        Dimensions.addEventListener('change', update)

        return () => {
            Dimensions.removeEventListener('change', update)
        }
    })

    if (error) {
       return (
           <View style={styles.center}>
               <AppText style={styles.error}>{error}</AppText>
               <AppButton onPress={loadTodos}>Повторить</AppButton>
           </View>
       )
    }

    if (loading) {
        return <AppLoader />
    }

    let content = (
        <View style={{width: deviceWidth}}>
            <FlatList
                data={todos}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) =>
                    <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen}/> }
            />
        </View>
    )

    if (todos.length === 0) {
        content = <View style={imgWrap}>
            <Image source={require('../../assets/no-items.png')}
                   style={img}
                    />
        </View>
    }

    return (
        <View>
            <AddTodo onSubmit={addTodo}/>
            {content}
        </View>
    )
};

const styles = StyleSheet.create({
    imgWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 300
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        fontSize: 20,
        color: THEME.DANGER_COLOR
    }
});
