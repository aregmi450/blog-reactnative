import React, { useContext, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from "react-native";
import {Context} from "../context/BlogContext";
import { Feather } from '@expo/vector-icons';
import ShowScreen from "./ShowScreen";


const IndexScreen = ({navigation}) => {
    const {state, deleteBlogPost, getBlogPost} = useContext(Context);

    useEffect (() => {
        getBlogPost();

        const listener = navigation.addListener('didFocus', () => {
            getBlogPost();
        });

        return () => {
            listener.remove();
        };
    }, []);

    return(
        <View>
            <FlatList 
            data={state}
            keyExtractor={(blogPosts) => blogPosts.title } 
            renderItem={({item}) => {
                return (
                <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id}) }>
                <View style={styles.row}> 
                    <Text style={styles.title}>{item.title} </Text>

                    <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                    <Feather 
                    name="trash-2"
                    style={styles.iconStyle}
                    />
                    </TouchableOpacity>
                </View>
                </TouchableOpacity>
                );
            }}
            />
        </View>
        );
    };

    IndexScreen.navigationOptions = ({navigation}) => {
        return{
            headerRight: () =>  <TouchableOpacity onPress={() =>navigation.navigate('Create') }> 
                <Feather name="plus" size={30} />
            </TouchableOpacity>
        };
    };


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18,
        fontWeight:"bold"
    },
    iconStyle: {
        fontSize: 24
    }
});

export default IndexScreen;