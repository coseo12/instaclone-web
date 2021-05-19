import styled from 'styled-components';

const SAvatar = styled.div`
  width: ${props => (props.lg ? '30px' : '25px')};
  height: ${props => (props.lg ? '30px' : '25px')};
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

const Avatar = ({ url, lg = false }) => {
  if (!url) {
    url =
      'https://images.unsplash.com/photo-1621356312116-901a583826fe?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60';
  }
  return (
    <SAvatar lg={lg}>{url !== null ? <Img src={url} alt="" /> : null}</SAvatar>
  );
};

export default Avatar;
