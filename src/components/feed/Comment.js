import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FatText } from '../shared/styled';

const CommentConatainer = styled.div``;

const CommentCaption = styled.span`
  margin-left: 10px;
`;

const Comment = ({ author, payload }) => {
  return (
    <CommentConatainer>
      <FatText>{author}</FatText>
      <CommentCaption>{payload}</CommentCaption>
    </CommentConatainer>
  );
};

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  payload: PropTypes.string,
};

export default Comment;
