import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";

import { Task } from "../../../App";

import CheckFalseIcon from '../../assets/checkFalse.png'
import CheckTrueIcon from '../../assets/checkTrue.png';
import TrashIcon from '../../assets/trash.png';

interface TaskCardProps {
    index: number,
    item: Task,
    handleDelete: (index: number) => void;
    handleConcluded: (index: number) => void;
}

export const TaskCard = ({ index, item, handleDelete, handleConcluded }: TaskCardProps) => {

    const [pressed, setPressed] = useState<boolean>(false)

    return (
        <View style={[styles.containerTaskConcluded, { borderColor: item.concluded ? '#262626' : '#333333' }]}>
            <TouchableOpacity onPress={() => { handleConcluded(index) }}>
                <Image source={item.concluded ? CheckTrueIcon : CheckFalseIcon} />
            </TouchableOpacity>
            <Text style={item.concluded ? styles.textTaskConcluded : styles.textTask}>
                {item.name}
            </Text>
            <TouchableOpacity
                onPressIn={() => setPressed(true)}
                onPressOut={() => setPressed(false)}
                onPress={() => handleDelete(index)}
                style={[styles.containerTrash,{backgroundColor:pressed? '#555555': '#262626'} ]}
            >
                <Image style={{tintColor: pressed? 'red': "#808080"}} source={TrashIcon} />
            </TouchableOpacity>
        </View>
    )
}