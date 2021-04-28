import styled from 'styled-components';

const SAvatar = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 15px;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

const Avatar = ({ url }) => {
  if (!url) {
    url = 'https://cdn.pixabay.com/photo/2020/07/06/01/33/sky-5375005__480.jpg';
  }
  return <SAvatar>{url !== null ? <Img src={url} alt="" /> : null}</SAvatar>;
};

export default Avatar;
