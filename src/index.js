import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import api from './services/api';

const Stack = createStackNavigator();

class CadastroProduto extends Component {
  constructor() {
    super();
    this.state = {
      codBarras: 0,
      nome: '',
      quantidade: 0,
      valor: 0,
      categoria: '',
    };
  }

  salvaProduto() {
    fetch('http://10.0.2.2:8080/api/produto', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categoria: this.state.categoria,
        codBarras: this.state.codBarras,
        id: null,
        nome: this.state.nome,
        quantidade: this.state.quantidade,
        valor: this.state.valor,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        return responseJson.movies;
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageLogoTelas}>
          <Image source={require('./images/logo-175x175.png')} />
        </View>
        <View style={styles.nomeTela}>
          <Text style={styles.textTela}>Cadastro de Produto</Text>
        </View>
        <View style={styles.viewProdutos}>
          <TextInput
            value={this.state.nome}
            onChangeText={text => this.setState.nome(text)}
            style={styles.campoProdutos}
            placeholder="Nome do Produto"
          />
        </View>
        <View style={styles.viewProdutos}>
          <TextInput
            value={this.state.valor}
            onChangeText={text => this.setState.valor({text})}
            keyboardType="numeric"
            style={styles.campoProdutos}
            placeholder="Valor unitário"
          />
        </View>
        <View style={styles.viewProdutos}>
          <TextInput
            value={this.state.quantidade}
            style={styles.campoProdutos}
            onChangeText={text => this.setState.quantidade({text})}
            keyboardType="numeric"
            placeholder="Quantidade"
          />
        </View>
        <View style={styles.viewProdutos}>
          <TextInput
            value={this.state.codBarras}
            style={styles.campoProdutos}
            onChangeText={text => this.setState.codBarras({text})}
            placeholder="Código de Barras"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.viewProdutos}>
          <TextInput
            value={this.state.categoria}
            onChangeText={text => this.setState.categoria({text})}
            style={styles.campoProdutos}
            placeholder="Categoria"
          />
        </View>
        <View style={styles.centralizaBotaoVenda}>
          <TouchableOpacity
            onPress={this.salvaProduto}
            title="Cadastrar"
            style={styles.botaoProdutos}>
            <Text style={styles.textButton}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class VendaProduto extends Component {
  state = {
    produtos: [],
    errorMessage: null,
  };
  getProjectList = async () => {
    try {
      const response = await api.get('/produtos');

      const {produtos} = response.data;

      this.setState({produtos});
    } catch (err) {
      this.setState({errorMessage: err.data.error});
    }
  };

  componentDidMount() {
    const uri = 'http://10.0.2.2:8080/api/produtos';
    return fetch(uri)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.nome,
          },
          function() {},
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.nome}</Text>}
          keyExtractor={({id}, index) => id}
        />
      </View>
    );
  }
}

function Home({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.imageLogo}>
        <Image source={require('./images/logo-175x175.png')} />
      </View>
      <View style={styles.centralizaBotaoVenda}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Venda')}
          title="Venda de Produtos"
          style={styles.botaoProdutos}>
          <Text style={styles.textButton}>Venda de Produtos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.centralizaBotaoCadastro}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cadastro')}
          title="Cadastro de Produtos"
          style={styles.botaoProdutos}>
          <Text style={styles.textButton}>Cadastro de Produtos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Cadastro" component={CadastroProduto} />
          <Stack.Screen name="Venda" component={VendaProduto} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#164D7A',
    padding: 8,
  },
  campoProdutos: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFAF',
    borderRadius: 15,
    paddingBottom: 10,
    borderColor: '#000',
    borderWidth: 3,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  viewProdutos: {
    paddingBottom: 5,
  },
  imageLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    paddingBottom: 120,
  },
  imageLogoTelas: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    paddingBottom: 70,
  },
  botaoProdutos: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#95B9D5',
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 25,
    paddingLeft: 25,
    marginTop: 1,
    width: 300,
    backgroundColor: '#EE3229',
    borderRadius: 30,
  },
  textButton: {
    alignSelf: 'center',
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#FFFAFF',
    fontWeight: 'bold',
  },
  centralizaBotaoVenda: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  centralizaBotaoCadastro: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  nomeTela: {
    alignItems: 'center',
    paddingBottom: 35,
    fontSize: 50,
  },
  textTela: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFA',
    borderColor: '#EE3229',
  },
});
/**********************************************/
