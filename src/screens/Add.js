import * as React from 'react';
import * as RN from 'react-native';
import EmojiPicker from 'rn-emoji-keyboard';
import  {database} from '../config/firebase';
import {collection,addDoc} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
export default  function Add(){
    const navigation=useNavigation();
    const [isOpen,setIsOpen]=React.useState(true);
    const [newItem,setNewItem]=React.useState({
        emoji:'*',
        name:'',
        price:0,
        isSold:false,
        createAt:new Date(),
    })
    const handlerPick=(emojiObject)=>{
        setNewItem({
            ...newItem,
            emoji:emojiObject.emoji,
        })
    }
    const onSend=async ()=>{
        await addDoc(collection(database,'products'),newItem);
        navigation.goBack();
    }
    return(
        <RN.View style={styles.container}>
            <RN.Text style={styles.title}>Sell a new product</RN.Text>
            <RN.Text style={styles.emoji} onPress={()=>setIsOpen(true)}>{newItem.emoji}</RN.Text>
            <EmojiPicker 
                onEmojiSelected={handlerPick}
                open={isOpen}
                onClose={()=>setIsOpen(false)}
            />
            <RN.TextInput 
                placeholder='Product Name'
                onChangeText={(text)=>setNewItem({...newItem,name:text})}
                style={styles.inputContainer}
            />
            <RN.TextInput 
                placeholder='$ Price'
                onChangeText={(text)=>setNewItem({...newItem,price:text})}
                style={styles.inputContainer}
                keyboardType="number-pad"
            />
            <RN.Button
                title="Publish"
                onPress={onSend}
            />
        </RN.View>
        
    )
}

const styles=RN.StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center'
    },
    title:{
        fontSize:32,
        fontWeight:'700'
    },
    inputContainer:{
        width:'90%',
        padding:13,
        marginVertical:6,
        borderWidth:1,
        borderColor:'#ddd',
        borderRadius:6
    },
    emoji:{
        fontsize:100,
        borderWidth:1,
        borderColor:'#ddd',
        borderRadius:6,
        padding:10,
        marginVertical:6
    }
});