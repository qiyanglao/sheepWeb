import React from 'react'
import { Table, TableProps } from 'antd'

const ATable: React.FC<TableProps> = props => <Table {...props} rowKey={props.rowKey ?? 'id'} />

export default ATable
