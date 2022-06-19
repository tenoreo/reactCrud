import * as React from 'react';
import * as RN from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {database} from '../config/firebase';
import { collection,onSnapshot,orderBy,query } from 'firebase/firestore';
import Product from '../components/Product';


export default  function Home(){
    const navigation=useNavigation();
    const [products,setProducts]=React.useState([]);
    React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=><RN.Button title='Add' onPress={()=>navigation.navigate('Add')} />
        })
    })
    React.useEffect(()=>{
        const collectionRef=collection(database,'products');
        const q=query(collectionRef,orderBy('createAt','desc'));
        const unsuscribe=onSnapshot(q,(querySnapshot)=>{
            setProducts(
                querySnapshot.docs.map(doc=>({
                    id:doc.id,
                    name:doc.data().name,
                    emoji:doc.data().emoji,
                    price:doc.data().price,
                    isSold:doc.data().isSold,
                    createAt:doc.data().createAt,
                    })
                )
            )
        })
        return unsuscribe;
    },[])

    return(
        <RN.View style={styles.container}>
            {products.map(product=>
                    <Product key={product.id} {...product}/>
                )
            }
        </RN.View>
    )
}
const styles=RN.StyleSheet.create({
    container:{
        flex:1,
        background:'#F5F3F9'
    }
})