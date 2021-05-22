import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FatText } from '../shared/styled';

const CommentConatainer = styled.div``;

const CommentCaption = styled.span`
  margin-left: 10px;

  a {
    background-color: inherit;
    color: ${props => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Comment = ({ author, payload }) => {
  return (
    <CommentConatainer>
      <FatText>{author}</FatText>
      <CommentCaption>
        {payload.split(' ').map((word, idx) =>
          /#[\w]+/.test(word) ? (
            <React.Fragment key={idx}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{' '}
            </React.Fragment>
          ) : (
            <React.Fragment key={idx}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
    </CommentConatainer>
  );
};

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  payload: PropTypes.string,
};

export default Comment;
