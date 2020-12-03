/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Spinner,
  Header,
  Item,
  Icon,
  Input,
  Button,
} from 'native-base';
import {
  loadCharactersAction,
  loadNextCharactersAction,
  searchCharactersAction,
} from '../store/actions/charactors.actions';
import {ACTION} from '../store/actions/constants';

const HomeScreen = ({
  characters,
  charactersStatus,
  loadCharacters,
  searchCharacters,
  loadNextCharacters,
  charactersMetaInfo,
  navigation,
}) => {
  const [searchStr, setSearchStr] = React.useState('');
  React.useEffect(() => {
    if (characters.length === 0) {
      loadCharacters();
    }
  }, []);

  const renderItem = ({item}) => (
    <List>
      <ListItem avatar onPress={() => gotoDetailScreen(item.id)}>
        <Left>
          <Thumbnail source={{uri: item.image}} />
        </Left>
        <Body style={styles.listBody}>
          <Text>{item.name}</Text>
          <Text note>{`${item.species}    ${item.gender}`}</Text>
        </Body>
        <Right style={styles.centerItem}>
          <Text note>{new Date(item.created).toLocaleDateString()}</Text>
        </Right>
      </ListItem>
    </List>
  );

  const renderLoading = () =>
    charactersStatus === ACTION.PROGRESS ? <Spinner /> : <Text>NO DATA</Text>;

  const onLoadMore = () => {
    if (charactersStatus === ACTION.PROGRESS) {
      return;
    }
    if (charactersMetaInfo.next) {
      loadNextCharacters(charactersMetaInfo.next);
    }
  };

  const gotoDetailScreen = (id) => {
    navigation.navigate('Details', {
      characterId: id,
    });
  };

  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            value={searchStr}
            onChangeText={setSearchStr}
            onSubmitEditing={() => searchCharacters(searchStr.toLowerCase())}
          />
          <Icon name="ios-people" />
        </Item>
        <Button
          transparent
          onPress={() => searchCharacters(searchStr.toLowerCase())}>
          <Text>Search</Text>
        </Button>
      </Header>
      <FlatList
        renderItem={renderItem}
        data={characters}
        keyExtractor={(item, index) => item.id.toString()}
        ListEmptyComponent={renderLoading}
        onEndReached={onLoadMore}
      />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    characters: state.characters.characters,
    charactersStatus: state.characters.charactersStatus,
    charactersMetaInfo: state.characters.charactersMetaInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadCharacters: () => dispatch(loadCharactersAction()),
  loadNextCharacters: (url) => dispatch(loadNextCharactersAction(url)),
  searchCharacters: (searchStr) => dispatch(searchCharactersAction(searchStr)),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  listBody: {
    height: '100%',
    paddingTop: 20,
  },
  centerItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
