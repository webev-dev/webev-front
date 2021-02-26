import { FC, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import InfiniteScroll from 'react-infinite-scroller';

import useSWR, { useSWRInfinite, SWRInfiniteResponseInterface } from 'swr';
import { PaginationResult } from '~/interfaces/paginationResult';

import { usePageListSWR } from '~/stores/page';
import { OgpCard } from '~/components/organisms/OgpCard';
import { restClient } from '~/utils/rest-client';

import { Page } from '~/interfaces/page';

const Index: FC = () => {
  const [activePage, setCnt] = useState(1);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  // const [pages, setPages] = useState([] as Page[]);
  // const { data: paginationResult, isValidating } = usePageListSWR(activePage);

  const loadMore = async (activePage: number) => {
    // if (!isValidating) {
    //   setHasPrevPage(false);
    //   setCnt(activePage + 1);
    // }
  };

  const { data: paginationResults, size, setSize }: SWRInfiniteResponseInterface<PaginationResult<Page>, Error> = useSWRInfinite(
    (index) => `/pages/list?status=stocked&page=${index + 1}&limit=9`,
    (endpoint) => restClient.apiGet(endpoint).then((result) => result.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );

  if (paginationResults == null) {
    return <p>hoge</p>;
  }
  const pages = paginationResults.map((paginationResult) => paginationResult.docs).flat();
  const hasNextPage = paginationResults[paginationResults.length - 1].hasNextPage;

  const skeletonForLoading = (
    <div className="row mt-4" key={0}>
      {[...Array(9)].map((_, i) => (
        <div key={i} className="col-lg-4 col-md-6 mb-3">
          <Skeleton height={300} />
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-3">
      <h1>Home</h1>
      {/* <InfiniteScroll loadMore={console} hasMore={hasPrevPage} loader={skeletonForLoading} element="div"> */}
      <div className="row mt-4">
        {pages.map((page) => (
          <div className="col-lg-4 col-md-6 mb-3" key={page._id}>
            <OgpCard page={page} />
          </div>
        ))}
        {hasNextPage && <button onClick={() => setSize(size + 1)}>load more</button>}
      </div>
      {/* </InfiniteScroll> */}
    </div>
  );
};

export default Index;
