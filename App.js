import React from 'react';
import { FlatList, ActivityIndicator, Text, RefreshControl, ScrollView } from 'react-native';
import {List, ListItem} from 'react-native-elements';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            refreshing: true,
            relatorio:[]
        }
    }
    
    componentDidMount() {
        return fetch('https://mobile-5367c.firebaseio.com/.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    refreshing: false,
                    relatorio: responseJson.vendascaixa,
              
                }, function () {
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        if (this.state.isLoading || this.state.refreshing) {
            return (
                <ScrollView style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </ScrollView>
            )
        }

        return (  
                     
            <ScrollView style={{ flex: 1, paddingTop: 20 }}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        componentDidMount={this.componentDidMount()} />
                }>
                <List>
                <FlatList
                    data={this.state.relatorio}
                    renderItem={({ item }) => (
                        <ListItem
                        roundAvatar
                        title={ `Caixa: ${item.CAIXA}` }
                        subtitle={`Valores:  ${item.TOTAL_MOVIMENTAÇÃO} - em: ${item.FORMA_DE_PAGAMENTO} `}                                                                                      
                      />                          
                    )}
                    keyExtractor={item =>  item.CAIXA.toString()} 
                    />
                </List>
                
            </ScrollView>           
        );
    }
}