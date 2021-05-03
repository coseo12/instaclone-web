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
    url = 'https://cdn.pixabay.com/photo/2020/07/06/01/33/sky-5375005__480.jpg';
  }
  return (
    <SAvatar lg={lg}>{url !== null ? <Img src={url} alt="" /> : null}</SAvatar>
  );
};

export default Avatar;
