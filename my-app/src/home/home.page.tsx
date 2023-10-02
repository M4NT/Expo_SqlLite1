import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AnimalService from '../services/animal.service'
import Icon from 'react-native-vector-icons/Ionicons';
import { Animal } from '../models/animal.model'
import { Image } from 'react-native'
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
        dataInsert: null
    }

    //acionado quando o componente e montado
    componentDidMount() {
        this.findAllAnimal();
    }

    //escuta atualizações na lista
    componentDidUpdate(prevProps, prevState) {
        if (prevState.data !== this.state.data) {
            this.findAllAnimal();
        }
    }

    deleteAnimal = (id) => {
        this.findAnimalById(id)
        if (this.state.dataId != null || this.state.dataId != undefined) {
            AnimalService.deleteById(id)
            alert("animal excluido com sucesso: ")
        }
    }

    insertAnimal = (item) => {
        let file: Animal = new Animal()
        file.nome = item

        const insertId = AnimalService.addData(file);
        if (insertId == null || insertId == undefined) {
            alert("Não foi possivel inserir o novo animal")
        }
    }

    findAllAnimal = () => {
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
    findAnimalById = (id) => {
        AnimalService.findById(id)
            .then((response: any) => {
                if (response._array.length > 0 && response != null && response != undefined) {
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
        const { data, value, dataInsert } = this.state;

        const animalList = data.map((item, key) => {
            return (
                <>
                    <Text style={styles.animalItem} key={key}>
                        Id: {item.id} Nome: {item.nome}</Text>
                </>
            )
        })

        return (

            <View style={styles.container}>

                <View style={styles.containerCard}>
                    <Image source={require('../services/Images/Capivara.jpg')} style={{ borderRadius: 500, paddingBottom: 20, width: 150, height: 150, alignItems: "center", justifyContent: "center" }} />
                    <Text style={{ fontSize: 32, paddingBottom: 10, color: '#fff', fontWeight: 800}}>Nomes de Capivara</Text>
                </View>

                <TextInput
                    placeholder="Digite o nome da Capivara"
                    style={styles.textInput}
                    onChangeText={textAdd => { this.setState({ dataInsert: textAdd }) }}
                    value={dataInsert}
                />

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => dataInsert == null ? alert("O campo de nome não pode ser vazio") : this.insertAnimal(dataInsert)} style={{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-add" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <TextInput
                    placeholder="Digite o id"
                    style={styles.textInput}
                    onChangeText={text => { this.setState({ value: text }) }}
                    value={value}
                />
                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { value == null ? alert("O campo de id não pode ser vazio") : this.deleteAnimal(value) }} style={{ alignItems: "center", backgroundColor: 'red' }}>
                        <Icon name="md-remove" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <Text style={{ fontSize: 24, paddingBottom: 10, paddingTop: 25, color: '#fff', fontWeight: 800}}>Nomes criados</Text>
                {animalList}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#095c79', // Cor de fundo mais suave
        alignItems: 'center',
        justifyContent: 'center'
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
    containerTouch: {
        width: 200,
        padding: 10
    },
    animalItem: {
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        fontSize: 16,
        color: '#fff'
    },
    containerCard: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#ccc',
        borderRadius: 16,
        padding: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    }
});