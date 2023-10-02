import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AnimalService from '../services/animal.service'
import Icon from 'react-native-vector-icons/Ionicons';
import { Animal } from '../models/animal.model'
export default class home extends React.Component {

    constructor(props) {
        super(props);

        this.findAllAnimal()        
    }

    state = {
        data: [],
        value: null,
        onChangeText: null,
        dataId: null,
        dataInsert:null
    }

    //acionado quando o componente e montado
    componentDidMount () {
        this.findAllAnimal ();
      }

      //escuta atualizações na lista
      componentDidUpdate (prevProps, prevState) {
        if (prevState.data !== this.state.data) {
          this.findAllAnimal ();
        }
      }
   
    deleteAnimal=(id)=> {
        this.findAnimalById(id)
        if (this.state.dataId != null || this.state.dataId != undefined) {
            AnimalService.deleteById(id)
            alert("animal excluido com sucesso: ")
        }
    }

    insertAnimal=(item)=> {
        let file:Animal=new Animal()
        file.nome=item

        const insertId=AnimalService.addData(file);
        if(insertId==null || insertId==undefined){
            alert("Não foi possivel inserir o novo animal")
        }
    }

    findAllAnimal=()=> {
        AnimalService.findAll()
            .then((response: any) => {
                this.setState({
                    data: response._array,
                    isLoading: false,
                })
            }), (error) => {
                console.log(error);
            }
    }
    findAnimalById=(id)=> {
        AnimalService.findById(id)
            .then((response: any) => {
                if (response._array.length >0 && response!= null && response!= undefined) {
                    this.setState({
                        dataId: response._array[0]
                    })
                } else {
                    alert("id não encontrado")
                }
            }), (error) => {
                console.log(error);
            }
    }
    render() {

        //extrai as propriedades entre chaves
        const {data,value,dataInsert} = this.state;
        
        const animalList = data.map((item, key) => {
            return (
                <>
                    <Text >id:{item.id} nome:{item.nome}</Text>
                </>
            )
        })

        return (

            <View style={styles.container}>

                <Text style={{ fontSize: 20, paddingBottom: 20 }}>Lista de Animais</Text>
                <TextInput
                    placeholder="digite o id"
                    style={styles.textInput}
                    onChangeText={text => { this.setState({ value: text }) }}
                    value={value}
                />
               <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { value == null ? alert("O campo de id não pode ser vazio") : this.deleteAnimal(value) }} style={{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-remove" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <TextInput
                    placeholder="digite o nome do novo animal"
                    style={styles.textInput}
                    onChangeText={textAdd => { this.setState({ dataInsert: textAdd }) }}
                    value={dataInsert}
                />
               
                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() =>  dataInsert == null ? alert("O campo de nome não pode ser vazio") :this.insertAnimal(dataInsert)} style={{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-add" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                {animalList}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0', // Cor de fundo mais suave
        alignItems: 'center',
        justifyContent: 'center',
    },

    textInput: {
        width: 250,
        height: 40,
        borderColor: '#0000ff', 
        borderWidth: 1,
        marginTop: 20, // Espaçamento superior aumentado
        paddingVertical: 10, // Preenchimento vertical para centralizar o texto
        paddingHorizontal: 15, 
        fontSize: 16, // Tamanho de fonte um pouco maior
        backgroundColor: '#fff', // Cor de fundo do input
        borderRadius: 5, // Cantos arredondados
    },
    buttonContainer: {
        width: 250, // Um pouco mais largo para melhor usabilidade
        paddingVertical: 12, // Preenchimento vertical para botões
        backgroundColor: '#007BFF', // Cor de fundo do botão
        borderRadius: 5, // Cantos arredondados
        marginTop: 20, // Espaçamento superior aumentado
    },
    buttonText: {
        color: '#fff', // Cor do texto do botão
        fontSize: 18, // Tamanho de fonte um pouco maior
        textAlign: 'center', 
    },
    containerTouch:{
        width: 200,
         padding: 10
    }
});