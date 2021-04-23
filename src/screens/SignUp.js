import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import AuthLayout from '../components/auth/AuthLayout';
import BottomBox from '../components/auth/BottomBox';
import Button from '../components/auth/Button';
import FormBox from '../components/auth/FormBox';
import Input from '../components/auth/Input';
import Separator from '../components/auth/Separator';
import { FatLink } from '../components/shared/styled';
import routes from '../routes';
import PageTitle from '../components/shared/PageTitle';
import { useForm } from 'react-hook-form';
import FormError from '../components/auth/FormError';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router';

const HedaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const history = useHistory();
  const {
    register,
    errors,
    formState,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: 'onChange',
  });

  const onCompleted = data => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError('result', { message: error });
    }
    history.push(routes.home, {
      message: 'Account created. Please log in.',
      username,
      password,
    });
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = () => {
    if (loading) {
      return;
    }
    const { firstName, lastName, email, username, password } = getValues();
    createAccount({
      variables: {
        firstName,
        lastName,
        username,
        email,
        password,
      },
    });
  };

  const clearLoginError = () => {
    clearErrors('result');
  };

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HedaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HedaderContainer>
        <Separator />
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({ required: 'First name is required' })}
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={clearLoginError}
          />
          <FormError message={errors.firstName?.message} />
          <Input
            ref={register}
            type="text"
            name="lastName"
            placeholder="Last Name"
          />
          <Input
            ref={register({ required: 'Email is required' })}
            type="text"
            name="email"
            placeholder="Email"
            onChange={clearLoginError}
          />
          <FormError message={errors.email?.message} />
          <Input
            ref={register({ required: 'Username is required' })}
            type="text"
            name="username"
            placeholder="Username"
            onChange={clearLoginError}
          />
          <FormError message={errors.username?.message} />
          <Input
            ref={register({ required: 'Password is required' })}
            type="password"
            name="password"
            placeholder="Password"
            onChange={clearLoginError}
          />
          <FormError message={errors.password?.message} />
          <Button
            type="submit"
            value={loading ? 'Loading...' : 'Sign up'}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors.result?.message} />
        </form>
      </FormBox>
      <BottomBox
        cta={`Have an account?`}
        link={routes.home}
        linkText={`Login up`}
      />
    </AuthLayout>
  );
};

export default SignUp;
