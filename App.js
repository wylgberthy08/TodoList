    import React, {useState, useCallback, useEffect} from 'react';
    import { 
      StyleSheet, 
      Text,
      View, 
      SafeAreaView, 
      StatusBar, 
      TouchableOpacity,
      FlatList, 
      Modal,
      TextInput,
      AsyncStorageStatic,
      ImageBackground
      } from 'react-native';
    import {Ionicons} from '@expo/vector-icons'
    import TaskList from './src/components/TaskLis'
    import * as Animatable from 'react-native-animatable'
    import AsyncStorage from '@react-native-community/async-storage';
  import { LinearGradient } from 'expo-linear-gradient';

    const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity)



    export default function App (){
      const [task, setTask] = useState([])
      const [open, setOpen] = useState(false)
      const [input, setInput]=useState('')
      
      //BUSCANDO AS TEREFAS QUANDO O AṔP É INICIADO
      useEffect(()=>{
      async function loadTasks(){
          const taskStorage = await AsyncStorage.getItem('@task')
          if(taskStorage){
            setTask(JSON.parse(taskStorage))
          }
        }

        loadTasks()
      }, [])

      //SALVANDO AS TAREFAS SE FOREM ALTERADAS
      useEffect(()=>{
        async function saveTasks(){
          await AsyncStorage.setItem('@task', JSON.stringify(task))
        }

        saveTasks()

      }, [task])

      function handleAdd(){
        if(input === '') return;

        const data = {
          key:input,
          task:input
        }

        setTask([...task, data])
        setOpen(false)
        setInput('')
      }

      const handleDelete = useCallback((data)=>{
        const find = task.filter(r => r.key !== data.key)

        setTask(find)
      })
      const image = require('./assets/todo_list.png')
      return (

        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#171d31" barStyle="light-content" />
            <LinearGradient 
               colors={['rgba(209, 162, 8,0.8)', 'rgb(255, 254, 252)']}
               style={{
                       position:'absolute',
                       left:0,
                       right:0,
                       top:0,
                       height:'100%'
                            }}
            />
              <ImageBackground source={image} style={styles.image}>
              <View style={styles.visible}>
              <View style={styles.content}>
              
            
              <Text style={styles.title}>Minhas tarefas</Text>
            </View>
                </View> 
            
              </ImageBackground>  
          

          <FlatList
            marginHorizontal = {10}
            showsHorizontalScrollIndicator={false}
            data={task}
            keyExtractor={(item)=>String(item.key)}
            renderItem={({item})=><TaskList data={item} handleDelete={handleDelete}/>}
          />  

          <Modal animationType="slide" transparent={false} visible={open}>
              <SafeAreaView style={styles.modal}>
                <LinearGradient
                  colors={['rgba(209, 162, 8,0.8)', 'rgb(255, 254, 252)']}
                  style={{
                       position:'absolute',
                       left:0,
                       right:0,
                       top:0,
                       height:'100%'
                                }}
                />
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={()=> setOpen(false)}>
                    <Ionicons style={{marginLeft:5, marginRight:5}} name="md-arrow-back" size={40} color="#fff"/>
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Nova Tarefa</Text>
                </View>

                <Animatable.View style={styles.modalBody} animation="fadeInUp" useNativeDriver>
                  <TextInput
                  multiline={true}
                  placeholderTextColor="#747474"
                  autoCorrect={true}
                  placeholder="O que precisa fazer hoje ?"
                  style={styles.input}
                  value={input}
                  onChangeText={(texto)=>setInput(texto)}
                  />

                  <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
                    <Text style={styles.handleAddText} >Cadastrar</Text>
                  </TouchableOpacity>
                </Animatable.View>

              </SafeAreaView>
          </Modal>
          
          <AnimatedBtn 
            style={styles.fab}
            useNativeDriver
            animation="bounceInUp"
            duration={1500}
            onPress={()=>setOpen(true)}
            >
              <Ionicons name="ios-add" size={35} color="#fff"/>
          </AnimatedBtn>

        </SafeAreaView>
      )
    }

    const styles = StyleSheet.create({
      container: {
        flex:1,
        borderRadius:3
      },
      image:{
        width:'100%',
        height:80,
        resizeMode:'cover',
      },
      visible:{
        width:'100%',
        height:80,
        backgroundColor:'rgba(0,0,0,0.5)',
        borderStyle:'solid',
        borderWidth:2,
        borderColor:'black'

      },
      title:{
        marginTop:10,
        paddingBottom:10,
        fontSize:25,
        textAlign:"center",
        color:'white',
        fontWeight:'bold'
      },
      fab:{
        position: "absolute",
        width:60,
        height:60,
        backgroundColor:"#0094ff",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:30,
        right:25,
        bottom:25,
        elevation:2,
        zIndex:9,
        shadowColor:"#000",
        shadowOpacity:0.2,
        shadowOffset:{
          width:1,
          height:3
        } 
      },
      modal:{
        flex:1,
      },
      modalHeader:{
        marginLeft:10,
        marginTop:20,
        flexDirection:"row",
        alignItems:"center",
      },

      modalTitle:{
        marginLeft:15,
        fontSize:23,
        color:"#fff"

      },
      modalBody:{
        marginTop:15,
      },

      input:{
        fontSize:15,
        marginLeft:10,
        marginRight:10,
        marginTop:30,
        backgroundColor:"#fff",
        padding:9,
        height:85,
        textAlignVertical:"top",
        color:'#000',
        borderRadius:5
      },

      handleAdd:{
        backgroundColor:"#fff",
        marginTop:10,
        alignItems:"center",
        justifyContent:"center",
        marginLeft:10,
        marginRight:10,
        height:40,
        borderRadius:5
      },

      handleAddText:{
        fontSize:20,

      }
    })