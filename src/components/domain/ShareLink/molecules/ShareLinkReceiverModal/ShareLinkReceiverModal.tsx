import { useRouter } from 'next/router';
import { useEffect, useState, VFC } from 'react';

import styled from 'styled-components';
import { Modal } from '~/components/base/molecules/Modal';
import { usePagePagination } from '~/hooks/Page';
import { useLocale } from '~/hooks/useLocale';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { FixedImage } from '~/components/base/atoms/FixedImage';
import { useOgp } from '~/hooks/Ogp/useOgp';

export const ShareLinkReceiverModal: VFC = () => {
  const router = useRouter();
  const { t } = useLocale();

  const { mutatePagePagination } = usePagePagination();
  const [url, setUrl] = useState<string>();

  const { data: ogp, isValidating } = useOgp(url);

  useEffect(() => {
    if (typeof router.query.url === 'string') {
      setUrl(router.query.url);
    }
  }, [router]);

  const handleClickCloseButton = () => {
    setUrl(undefined);
    router.push(router.pathname);
  };

  const handleClickSubmitButton = async () => {
    try {
      await restClient.apiPost('/pages', { url });
      toastSuccess(t.toastr_save_url);
      setUrl(undefined);
      mutatePagePagination();
      router.push(router.pathname);
    } catch (err) {
      if (err instanceof Error) toastError(err);
    }
  };

  return (
    <Modal title={t.save_page} isOpen={!!url} toggle={handleClickCloseButton}>
      {isValidating ? (
        <StyledDiv className="position-relative w-100">
          <div className="position-absolute top-0 left-0 w-100 h-100 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </StyledDiv>
      ) : (
        <FixedImage imageUrl={ogp?.image} />
      )}
      <h5 className="text-center my-3">{ogp?.title || 'No title'}</h5>
      <div className="d-flex justify-content-evenly mt-5">
        <button className="btn btn-secondary" onClick={handleClickCloseButton}>
          {t.cancel}
        </button>
        <button className="btn btn-indigo" onClick={handleClickSubmitButton}>
          {t.save}
        </button>
      </div>
    </Modal>
  );
};

const StyledDiv = styled.div`
  padding-top: 52.5%;
`;
