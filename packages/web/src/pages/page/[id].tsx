import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import styled from 'styled-components';

import { Button, Grid, Loading, Text } from '@nextui-org/react';
import Link from 'next/link';
import { usePageByPageId } from '~/stores/Page';
import { WebevNextPage } from '~/libs/interfaces/webevNextPage';
import { useLocale } from '~/hooks/useLocale';
import { URLS } from '~/libs/constants/urls';

import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { DashBoardLayout } from '~/components/common/Layout/DashBoardLayout';
import { TopSubnavBar } from '~/components/common/Parts/TopSubnavBar';
import { PageManageDropdown } from '~/components/domain/Page/PageManageDropdown';

const Page: WebevNextPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const { t } = useLocale();
  const { data: page, isLoading: isLoadingPage } = usePageByPageId({ pageId: id as string });

  if (isLoadingPage) {
    return (
      <Grid css={{ width: '100%', py: '$8', display: 'flex', justifyContent: 'center' }}>
        <Loading size="xl" color="secondary" />
      </Grid>
    );
  }

  if (!page) {
    return (
      <Grid css={{ textAlign: 'center', width: '100%' }}>
        <Text h3>{t.data_not_found}</Text>
        <Link href={URLS.HOME_URL}>
          <a>
            <Button color="secondary" css={{ mx: 'auto', mt: '24px' }}>
              {t.return_button}
            </Button>
          </a>
        </Link>
      </Grid>
    );
  }

  return (
    <>
      <WebevOgpHead title={`Webev | ${page.title}`} />
      <LoginRequiredWrapper>
        <Grid css={{ maxWidth: '800px', width: '100%' }}>
          <TopSubnavBar page={page} />
          <Grid css={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: '16px', gap: '8px' }}>
            <Text h2 css={{ textAlign: 'center', mb: '$0', mx: 'auto', '@smMax': { fontSize: '$lg', textAlign: 'left' } }}>
              {page.title}
            </Text>
            <PageManageDropdown page={page} />
          </Grid>
          <Text css={{ textAlign: 'center', mb: '24px' }}>
            <Link href={page.url}>
              <a target="_blank" rel="noopener noreferrer">
                {t.view_original}
              </a>
            </Link>
          </Text>
          <StyledDiv
            dangerouslySetInnerHTML={{
              __html: `${page?.body}`,
            }}
          />
        </Grid>
      </LoginRequiredWrapper>
    </>
  );
};

const StyledDiv = styled(Grid)`
  word-break: break-all;
  width: 100%;

  img {
    width: 100%;
    border: 3px #aaa solid;
  }

  a {
    color: #ccc;
  }

  pre {
    padding: 16px;
    background: black;
  }

  h1,
  h2 {
    font-size: 20px;
    padding-bottom: 5px;
    border-bottom: 2px solid #6f42c1;
  }

  p {
    line-height: 2rem;
  }

  li {
    margin-bottom: 10px;
  }

  code {
    background: none;
    margin: 0 5px;
  }
`;

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Page.getLayout = getLayout;
export default Page;