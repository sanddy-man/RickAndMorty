/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Container, Card, CardItem, Text, Icon, Spinner} from 'native-base';
import {batchEpisodeDetailsAction} from '../store/actions/episodes.actions';
import {ACTION} from '../store/actions/constants';

const EpisodesScreen = ({
  route,
  batchEpisodeDetails,
  episodeDetails,
  episdoeDetailsStatus,
  navigation,
}) => {
  const {episodes} = route.params;
  React.useEffect(() => {
    batchEpisodeDetails(episodes);
  }, []);

  const renderItem = ({item}) => (
    <Card>
      <CardItem>
        <Icon active name="bookmark" />
        <Text>{item.name}</Text>
      </CardItem>
      <CardItem>
        <Icon active name="calendar" />
        <Text>{item.air_date}</Text>
      </CardItem>
      <CardItem>
        <Icon active name="easel" />
        <Text>{item.episode}</Text>
      </CardItem>
    </Card>
  );

  const renderLoading = () =>
    episdoeDetailsStatus === ACTION.PROGRESS ? (
      <Spinner />
    ) : (
      <Text>NO DATA</Text>
    );

  return (
    <Container>
      <FlatList
        renderItem={renderItem}
        data={episodeDetails}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={renderLoading}
      />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    episodeDetails: state.episodes.episodeDetails,
    episdoeDetailsStatus: state.episodes.episdoeDetailsStatus,
  };
};

const mapDispatchToProps = (dispatch) => ({
  batchEpisodeDetails: (urls) => dispatch(batchEpisodeDetailsAction(urls)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EpisodesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
