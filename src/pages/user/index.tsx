import { VFC, useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import { useCurrentUser } from '~/stores/user';
import { UserIcon } from '~/components/Icons/UserIcon';
import { toastError, toastSuccess } from '~/utils/toastr';
import { restClient } from '~/utils/rest-client';

const Index: VFC = () => {
  //   const { t } = useLocale();
  const { data: currentUser } = useCurrentUser();
  const [name, setName] = useState<string>();

  useEffect(() => {
    if (currentUser != null) {
      setName(currentUser.name);
    }
  }, [currentUser]);

  if (currentUser == null) {
    return (
      <div className="text-center pt-5">
        <Loader type="Triangle" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  const handleSubmitTextInput = async (): Promise<void> => {
    // name is required
    if (currentUser.name?.trim() === '') {
      return setName(currentUser.name);
    }
    // do nothing, no change
    if (currentUser.name === name) {
      return;
    }
    try {
      await restClient.apiPut(`/users/me`, { name });
      // mutateCurrentUser();
      toastSuccess('success');
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row mt-3">
          <div className="col-3">
            <UserIcon image={currentUser.image} size={140} isCircle />
          </div>
          <div className="col-9">
            <StyledInput
              className="form-control text-nowrap overflow-scroll fs-1 pt-0 pb-2 pb-md-0 me-auto w-100"
              onChange={(e) => setName(e.target.value)}
              onBlur={handleSubmitTextInput}
              value={name || ''}
            />
            <p>Hello 😄</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;

const StyledInput = styled.input`
  color: #ccc;
  background: transparent;
  border: none;

  &:hover {
    color: #ccc;
    background: #232323;
    ::placeholder {
      color: #ccc;
    }
  }

  &:focus {
    color: #ccc;
    background: transparent;
    ::placeholder {
      color: #ccc;
    }
  }
`;