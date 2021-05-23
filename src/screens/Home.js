import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import Photo from '../components/feed/Photo';
import PageTitle from '../components/shared/PageTitle';
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from '../fragment';

const FEED_QUERY = gql`
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
`;
const Home = () => {
  const { data } = useQuery(FEED_QUERY);

  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeFeed?.map(photo => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
};

export default Home;
