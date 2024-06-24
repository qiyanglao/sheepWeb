import { TableProps } from 'antd'
import { ArticleItemType } from '@/services/modules/article/types'
import { genderDict } from '@/constants/dict'

export const columns: TableProps<ArticleItemType>['columns'] = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    render: text => <span>{genderDict[text]}</span>
  },
  {
    title: '身高',
    dataIndex: 'height',
    key: 'height'
  },
  {
    title: '体重',
    dataIndex: 'weight',
    key: 'weight'
  },
  {
    title: '家庭住址',
    dataIndex: 'address',
    key: 'address'
  }
]
