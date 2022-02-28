import { SWRResponse } from 'swr';

import { restClient } from '~/utils/rest-client';
import { useAuthenticationSWR } from '~/stores/use-authentication-swr';
import { Ogp } from '~/domains/Ogp';

export const useOgp = (url?: string | null): SWRResponse<Ogp, Error> => {
  const key = url ? `ogp?url=${url}` : null;
  return useAuthenticationSWR(key, (endpoint: string) => restClient.apiGet(endpoint).then((result) => result.data), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });
};
