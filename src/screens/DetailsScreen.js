/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Left,
  Body,
  Spinner,
  Right,
} from 'native-base';
import {loadCharacterDetailAction} from '../store/actions/charactors.actions';

const DetailsScreen = ({
  route,
  loadCharacterDetail,
  detail,
  detailStatus,
  navigation,
}) => {
  const {characterId} = route.params;
  React.useEffect(() => {
    loadCharacterDetail(characterId);
  }, []);

  return (
    <Container>
      {detail ? (
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text>{detail.name}</Text>
                  <Text note>
                    <Icon
                      name="ellipse"
                      style={{
                        fontSize: 16,
                        color:
                          detail.status === 'Alive'
                            ? 'green'
                            : detail.status === 'Dead'
                            ? 'red'
                            : 'grey',
                      }}
                    />
                    {`${detail.status}  -  ${detail.species}`}
                  </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image
                  source={{uri: detail.image}}
                  style={{height: 300, width: '100%'}}
                  resizeMode="cover"
                />
              </Body>
            </CardItem>
            <CardItem>
              <Icon active name="location" />
              <Text>Last known location: </Text>
              <Right>
                <Text>{detail.location.name}</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Icon active name="location" />
              <Text>First seen in</Text>
              <Right>
                <Text>{detail.origin.name}</Text>
              </Right>
            </CardItem>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Episodes', {
                  episodes: detail.episode,
                })
              }>
              <CardItem>
                <Icon active name="easel" />
                <Text>Episodes</Text>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
            </TouchableOpacity>
          </Card>
        </Content>
      ) : (
        <Spinner />
      )}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    detail: state.characters.detail,
    detailStatus: state.characters.detailStatus,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadCharacterDetail: (id) => dispatch(loadCharacterDetailAction(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
