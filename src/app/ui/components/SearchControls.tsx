import { Card, Row, Col, Select, Input, Button, Space, Tag } from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  ClearOutlined
} from '@ant-design/icons';
import { useEffect, useState } from 'react';

const { Option } = Select;
const { Search } = Input;

const SearchControls = ({
  searchTerm,
  searchField,
  onSearch,
  onFieldChange,
  onClearSearch,
  loading,
  searchFields,
  totalResults
}) => {

const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const isSearching = !!searchTerm;

useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);
  
  const handleInputChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  const handleSearch = (value) => {
    onSearch(value || localSearchTerm, true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e.target.value);
    }
  };

  return (
    <Card size="small" style={{ marginBottom: '16px', backgroundColor: '#fafafa' }}>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={8} md={6}>
          <Select
            value={searchField}
            onChange={onFieldChange}
            style={{ width: '100%' }}
            suffixIcon={<FilterOutlined />}
            disabled={loading}
          >
            {searchFields.map(field => (
              <Option key={field.value} value={field.value}>
                {field.label}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={16} md={14}>
          <Search
            placeholder={`Search ${searchField !== 'all' ? `in ${searchFields.find(f => f.value === searchField)?.label.toLowerCase()}` : ' all fields...'}`}
            allowClear
            enterButton={<SearchOutlined />}
            value={localSearchTerm}
            onChange={handleInputChange}
            onSearch={handleSearch}
            onKeyPress={handleKeyPress}
            loading={loading}
            disabled={loading}
          />
        </Col>
        <Col xs={24} sm={24} md={4}>
          <Button
            icon={<ClearOutlined />}
            onClick={onClearSearch}
            disabled={!searchTerm || loading}
            style={{ width: '100%' }}
            loading={loading}
          >
            Clear 
          </Button>
        </Col>
      </Row>
      
      {isSearching && (
        <div style={{ marginTop: '12px' }}>
          <Space wrap>
           <Tag color="blue">
              Search: &quot;{searchTerm}&quot;
            </Tag>
            <Tag color="green">
              {searchField !== 'all' ? `Field: ${searchFields.find(f => f.value === searchField)?.label}` : 'All fields'}
            </Tag>
            <Tag color="orange">
              {totalResults} Result{totalResults !== 1 ? 's' : ''} found 
            </Tag>
          </Space>
        </div>
      )}
    </Card>

    /*<Card size="small" style={{ marginBottom: '16px', backgroundColor: '#fafafa' }}>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={8} md={6}>
          <Select
            value={searchField}
            onChange={onFieldChange}
            style={{ width: '100%' }}
            suffixIcon={<FilterOutlined />}
            disabled={loading}
          >
            {searchFields.map(field => (
              <Option key={field.value} value={field.value}>
                {field.label}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={16} md={14}>
          <Search
            placeholder={`Search ${searchField !== 'all' ? `in ${searchFields.find(f => f.value === searchField)?.label.toLowerCase()}` : 'usuarios...'}`}
            allowClear
            enterButton={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value, true)}
            onSearch={(value) => onSearch(value, true)}
            loading={loading}
            disabled={loading}
            autoFocus
          />
        </Col>
        <Col xs={24} sm={24} md={4}>
          <Button
            icon={<ClearOutlined />}
            onClick={onClearSearch}
            disabled={!searchTerm || loading}
            style={{ width: '100%' }}
            loading={loading}
          >
            Clear
          </Button>
        </Col>
      </Row>
      
      {isSearching && (
        <div style={{ marginTop: '12px' }}>
          <Space wrap>
            <Tag color="blue">
              Search: &quot;{searchTerm}&quot;
            </Tag>
            <Tag color="green">
              {searchField !== 'all' ? `Field: ${searchFields.find(f => f.value === searchField)?.label}` : 'All fields'}
            </Tag>
            <Tag color="orange">
              {totalResults} Result{totalResults !== 1 ? 's' : ''} found 
            </Tag>
          </Space>
        </div>
      )}
    </Card>*/
  );
};

export default SearchControls;