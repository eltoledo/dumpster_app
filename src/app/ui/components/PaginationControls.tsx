import { Pagination, Select, Row, Col, Space } from 'antd';
import FormItemInput from 'antd/es/form/FormItemInput';

const { Option } = Select;

export default function PaginationControls({
  current,
  pageSize,
  total,
  onChange,
  onSizeChange,
  showSizeChanger,
  showTotal
}:{
 current:number;
  pageSize:number;
  total:number;
  onChange:(currentPage:number,pageSize:number) => void;
  onSizeChange:(pageSize:number) => void;
  showSizeChanger:boolean;
  showTotal:boolean;
}){

     return (
    <Row justify="space-between" align="middle" style={{ marginTop: '16px' }}>
      <Col>
        {showTotal && (
          <span style={{ marginRight: '8px' }}>
            Showing {(current - 1) * pageSize + 1} - {Math.min(current * pageSize, total)} of {total} records
          </span>
        )} 
      </Col>
      <Col>
        <Space>
          {showSizeChanger && (
            <>
              <span>Rows per page:</span>
              <Select
                value={pageSize}
                onChange={onSizeChange}
                style={{ width: 80 }}
              >
                <Option value={5}>5</Option>
                <Option value={10}>10</Option>
                <Option value={20}>20</Option>
                <Option value={50}>50</Option>
              </Select>
            </>
          )}
          
          <Pagination
            current={current}
            pageSize={pageSize}
            total={total}
            onChange={onChange}
            showSizeChanger={false}
            showQuickJumper={false}
            
          />
        </Space>
      </Col>
    </Row>
  );
}