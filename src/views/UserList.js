import React, {useContext} from 'react';
import {View, FlatList, Alert} from 'react-native';
import {ListItem, Button, Icon} from 'react-native-elements';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import UsersContext from '../context/UsersContext';

export default props => {
  const {state, dispatch} = useContext(UsersContext);
  function confirmUserDeletion(user) {
    Alert.alert('Excluir Usuário', 'Deseja excluir o usuário', [
      {
        text: 'SIM',
        onPress() {
          dispatch({type: 'deleteUser', payload: user});
        },
      },
      {
        text: 'Não',
      },
    ]);
  }
  function getActions(user) {
    return (
      <>
        <Button
          onPress={() => props.navigation.navigate('UserForm', user)}
          type="clear"
          icon={<Icon name="edit" size={25} color="orange" />}
        />
        <Button
          onPress={() => confirmUserDeletion(user)}
          type="clear"
          icon={<Icon name="delete" size={25} color="red" />}
        />
      </>
    );
  }
  function getUserItem({item}) {
    return (
      <ListItem
        bottomDivider
        onPress={() => props.navigation.navigate('UserForm')}>
        <Avatar title={item.name} source={{uri: item.avatarUrl}} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
        </ListItem.Content>
        {getActions(item)}
      </ListItem>
    );
  }
  return (
    <View>
      <FlatList
        keyExtractor={users => users.id.toString()}
        data={state.users}
        renderItem={getUserItem}
      />
    </View>
  );
};
