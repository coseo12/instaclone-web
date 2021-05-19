import { useMutation } from '@apollo/client';
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from '../shared/Avatar';
import { FatText } from '../shared/styled';

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
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
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  display: block;
  margin-top: 15px;
`;

const Photo = ({ id, user, file, isLiked, likes }) => {
  const updateToggleLike = (cache, results) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = results;

    if (ok) {
      const fragmentId = `Photo:${id}`;
      const fragment = gql`
        fragment ChangeToPhotoCache on Photo {
          isLiked
          likes
        }
      `;

      cache.writeFragment({
        id: fragmentId,
        fragment: fragment,
        data: {
          isLiked: !isLiked,
          likes: !isLiked ? likes + 1 : likes - 1,
        },
      });
    }
  };
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: { id },
    update: updateToggleLike,
  });

  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Avatar lg={true} url={user.avatar} />
        <Username>{user.username}</Username>
      </PhotoHeader>
      <PhotoFile src={file} alt="" />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction>
              <span onClick={toggleLikeMutation}>
                <FontAwesomeIcon
                  style={{ color: isLiked ? 'tomato' : 'inherit' }}
                  icon={isLiked ? SolidHeart : faHeart}
                />
              </span>
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>{likes === 1 ? '1 likes' : `${likes} likes`}</Likes>
      </PhotoData>
    </PhotoContainer>
  );
};

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
};

export default Photo;
