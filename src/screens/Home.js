import { useQuery } from '@apollo/client';
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import Avatar from '../components/shared/Avatar';
import { FatText } from '../components/shared/styled';

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${props => props.theme.borderColor};
  margin-bottom: 20px;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 5px;
`;

const PhotoFile = styled.img`
  max-width: 100%;
`;

const PhotoData = styled.div`
  padding: 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
`;

const Likes = styled(FatText)`
  display: block;
  margin-top: 15px;
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);

  return (
    <div>
      {data?.seeFeed?.map(photo => (
        <PhotoContainer>
          <PhotoHeader>
            <Avatar lg={true} url={photo.user.avatar} />
            <Username>{photo.user.username}</Username>
          </PhotoHeader>
          <PhotoFile src={photo.file} alt="" />
          <PhotoData>
            <PhotoActions>
              <div>
                <PhotoAction>
                  <FontAwesomeIcon icon={faHeart} size="2x" />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon icon={faComment} size="2x" />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon icon={faPaperPlane} size="2x" />
                </PhotoAction>
              </div>
              <div>
                <FontAwesomeIcon icon={faBookmark} size="2x" />
              </div>
            </PhotoActions>
            <Likes>
              {photo.likes === 1 ? '1 likes' : `${photo.likes} likes`}
            </Likes>
          </PhotoData>
        </PhotoContainer>
      ))}
    </div>
  );
};

export default Home;
