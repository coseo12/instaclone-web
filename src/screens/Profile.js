import { useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useParams } from 'react-router';
import { PHOTO_FRAGMENT } from '../fragment';

const SEE_PROFILE_QUERY = gql`
  ${PHOTO_FRAGMENT}
  query seeProfile($username: String!, $page: Int!) {
    seeProfile(username: $username) {
      id
      firstName
      lastName
      username
      bio
      avatar
      photos(page: $page) {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
`;

const Profile = () => {
  const [page] = useState(1);
  const { username } = useParams();
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: { username, page },
  });

  console.log(data);

  return <div>Profile</div>;
};

export default Profile;
