import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FatText } from '../shared/styled';

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

const CommentConatainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
`;

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

const CommentDelete = styled.button`
  background-color: #fff;
  border: 0;
  font-size: 10px;
  margin-left: 5px;
  cursor: pointer;
`;

const Comment = ({ id, photoId, isMine, author, payload }) => {
  const deleteCommentUpdate = (cache, result) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({
        id: `Comment:${id}`,
      });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: { id },
    update: deleteCommentUpdate,
  });
  const onDeleteClick = () => {
    deleteCommentMutation();
  };

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
      {isMine ? (
        <CommentDelete onClick={onDeleteClick}>❌</CommentDelete>
      ) : null}
    </CommentConatainer>
  );
};

Comment.propTypes = {
  id: PropTypes.number,
  photoId: PropTypes.number,
  isMine: PropTypes.bool,
  author: PropTypes.string.isRequired,
  payload: PropTypes.string,
};

export default Comment;
