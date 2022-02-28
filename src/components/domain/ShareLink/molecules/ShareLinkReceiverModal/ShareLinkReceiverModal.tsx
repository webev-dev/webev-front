import { useRouter } from 'next/router';
import { useEffect, useState, VFC } from 'react';

import { Modal } from '~/components/base/molecules/Modal';
import { usePagePagination } from '~/hooks/Page';
import { useLocale } from '~/hooks/useLocale';
import { useSocketId } from '~/stores/contexts';
import { restClient } from '~/utils/rest-client';
import { toastError, toastSuccess } from '~/utils/toastr';

import { FixedImage } from '~/components/base/atoms/FixedImage';
import { useOgp } from '~/stores/ogp';

export const ShareLinkReceiverModal: VFC = () => {
  const router = useRouter();
  const { t } = useLocale();

  const { data: socketId } = useSocketId();
  const { mutatePagePagination } = usePagePagination();

  const [title, setTitle] = useState<string | null>();
  const [url, setUrl] = useState<string | null>();

  const { data: ogp } = useOgp({ url: url || '' });

  useEffect(() => {
    if (typeof router.query.title === 'string') {
      setTitle(router.query.title);
    }
    if (typeof router.query.url === 'string') {
      setUrl(router.query.url);
    }
  }, [router]);

  const handleClickCloseButton = () => {
    setTitle(null);
    setUrl(null);
    router.push(router.pathname);
  };

  const handleClickSubmitButton = async () => {
    try {
      await restClient.apiPost('/pages', { url, socketId });
      toastSuccess(t.toastr_save_url);
      setTitle(null);
      setUrl(null);
      mutatePagePagination();
      router.push(router.pathname);
    } catch (err) {
      if (err instanceof Error) toastError(err);
    }
  };

  return (
    <Modal title={t.save_page} isOpen={url != null} toggle={handleClickCloseButton}>
      <FixedImage imageUrl={ogp?.image} />
      <h5 className="text-center my-3">{title || 'No title'}</h5>
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
