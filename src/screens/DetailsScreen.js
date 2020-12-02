/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import {
  Container,
  Content,
  Card,
  CardItem,
  Accordion,
  Text,
  Icon,
  Left,
  Body,
  Spinner,
  Right,
  Button,
} from 'native-base';
import {loadCharacterDetailAction} from '../store/actions/charactors.actions';
const dataArray = [
  {title: 'Last know location', content: 'Lorem ipsum dolor sit amet'},
  {title: 'First seen in', content: 'Lorem ipsum dolor sit amet'},
];

const DetailsScreen = ({route, loadCharacterDetail, detail, detailStatus}) => {
  const {characterId} = route.params;
  React.useEffect(() => {
    loadCharacterDetail(characterId);
  }, []);

  return (
    <Container>
      {detail ? (
        <Content>
          <Card style={{flex: 0}}>
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
            <CardItem onPress={() => {}}>
              <Icon active name="location" />
              <Text>Last known location: </Text>
              <Right>
                <Text>{detail.location.name}</Text>
              </Right>
            </CardItem>
            <CardItem onPress={() => {}}>
              <Icon active name="location" />
              <Text>First seen in</Text>
              <Right>
                <Text>{detail.origin.name}</Text>
              </Right>
            </CardItem>
            <CardItem onPress={() => {}}>
              <Icon active name="easel" />
              <Text>Episodes</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
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
