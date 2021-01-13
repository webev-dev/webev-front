import { FC, useState } from 'react';
import { SidebarList } from '~src/components/organisms/SidebarList';

type Props = {};

export const Sidebar: FC<Props> = (props: Props) => {
  const [url, setUrl] = useState('/home');

  return (
    <div>
      <SidebarList url={url} onClickSidebarListItem={(url) => setUrl(url)} />
    </div>
  );
};
