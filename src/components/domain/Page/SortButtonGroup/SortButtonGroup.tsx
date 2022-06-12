import { Button, Dropdown, Text } from '@nextui-org/react';
import { useState, FC, Key, useCallback } from 'react';
import { Icon } from '~/components/base/atoms/Icon';
import { usePagePagination } from '~/hooks/Page';

import { useLocale } from '~/hooks/useLocale';

type SelectedKey = 'latest_order' | 'oldest_order';

export const SortButtonGroup: FC = () => {
  const { t } = useLocale();
  const { isSortCreatedAt, setIsSortCreatedAt } = usePagePagination();
  const [selected, setSelected] = useState<SelectedKey>(isSortCreatedAt ? 'latest_order' : 'oldest_order');

  const handleAction = useCallback(
    (key: Key) => {
      setSelected(key as SelectedKey);
      switch (key) {
        case 'latest_order':
          setIsSortCreatedAt(false);
          break;
        case 'oldest_order':
          setIsSortCreatedAt(true);
          break;
      }
    },
    [setIsSortCreatedAt],
  );

  return (
    <Dropdown placement="bottom-right">
      <Dropdown.Trigger>
        <Button auto css={{ padding: '0px 11px' }} light icon={<Icon width={18} height={18} icon="FILTER" />}>
          <Text>{t[selected]}</Text>
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Menu selectionMode="single" aria-label="Static Actions" onAction={handleAction} selectedKeys={[selected]}>
        <Dropdown.Section title="Sort">
          <Dropdown.Item key="latest_order">{t.latest_order}</Dropdown.Item>
          <Dropdown.Item key="oldest_order">{t.oldest_order}</Dropdown.Item>
        </Dropdown.Section>
      </Dropdown.Menu>
    </Dropdown>
    // <Button.Group color="secondary" size="sm">
    //   <Button bordered={isSortUpdatedAt} onClick={() => } css={{ fontWeight: '$bold', '@xsMax': { width: '100%' } }}>
    //     {t.latest_order}
    //   </Button>
    //   <Button bordered={!isSortUpdatedAt} onClick={() => setIsSortUpdatedAt(true)} css={{ fontWeight: '$bold', '@xsMax': { width: '100%' } }}>
    //     {t.oldest_order}
    //   </Button>
    // </Button.Group>
  );
};
