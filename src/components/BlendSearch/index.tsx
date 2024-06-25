import { FC, useRef, useState } from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import { Input, Dropdown, MenuProps, Tag } from 'antd';
import './index.scss';

interface Props {}

const BlendSearch: FC<Props> = () => {
  const [currentDispalyField, setCurrentDisplayField] = useState<string>('');
  const [currentDispalyFieldName, setCurrentDisplayFieldName] = useState<string>('');
  const [tags, setTags] = useState<{ key: string; label: string }[]>([]);
  const [searchValue, setSearchValue] = useState<string>();
  const inputRef = useRef();

  const items: MenuProps['items'] = [
    {
      key: 'userName',
      onClick: handleMenuClick,
      label: '姓名'
    },
    {
      key: 'userCode',
      onClick: handleMenuClick,
      label: '工号'
    },
    {
      key: 'deptId',
      onClick: handleMenuClick,
      label: '部门',
      children: [{ key: '1-1-1', label: 'hh' }]
    }
  ];

  function handleMenuClick(val) {
    console.log(val, 'menu');
    const findMenuItem = items!.find(item => item?.key === val.key);
    findMenuItem && setCurrentDisplayField(findMenuItem.label);

    setSearchValue('');
    inputRef.current.focus();
  }
  const onSearch = (val: string) => {
    console.log(val, 'val');
    setSearchValue(val);
    console.log(currentDispalyField, 'currentDispalyField===');
    setTags(
      tags.concat([{ label: currentDispalyField + '：' + val, key: currentDispalyFieldName }])
    );
  };

  const changeSearchVal = val => {
    setSearchValue(val.target.value);
  };

  const handleCloseTag = (item: { key: number; label: string }) => {
    const findIdx = tags.findIndex(el => el.key === item.key);
    if (findIdx > -1) {
      const newTags = tags.filter(el => el.key !== item.key);
      setTags(newTags);
    }
  };

  return (
    <div className='blendSearch'>
      <Input.Search
        ref={inputRef}
        addonBefore={
          <div style={{ display: 'flex' }}>
            <Dropdown
              menu={{
                items
              }}
              trigger={['click']}
            >
              <div style={{ display: 'flex', cursor: 'pointer' }}>
                <AppstoreOutlined />
              </div>
            </Dropdown>
            <div style={{ cursor: 'pointer', paddingLeft: tags.length ? 8 : 0 }}>
              {tags.map(item => (
                <Tag
                  key={item.key}
                  color='processing'
                  bordered={false}
                  closable
                  onClose={() => handleCloseTag(item)}
                >
                  {item.label}
                </Tag>
              ))}
            </div>
            {currentDispalyField && !tags.length && (
              <div style={{ paddingLeft: currentDispalyField ? 8 : 0 }}>{currentDispalyField}:</div>
            )}
          </div>
        }
        onSearch={onSearch}
        onChange={changeSearchVal}
        value={searchValue}
        placeholder='按回车键搜索'
      />
      <button
        onClick={() => {
          console.log(tags, 'tags');
        }}
      >
        add
      </button>
    </div>
  );
};

export default BlendSearch;
