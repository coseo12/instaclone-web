import { useParams } from 'react-router';

const Profile = () => {
  const { username } = useParams();

  console.log(username);

  return <div>Profile</div>;
};

export default Profile;
