'use client'
import { useState, useEffect, useRef } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Space,
  Card,
  Typography,
  Popconfirm,
  Select,
  notification,
  Tag,
  Divider,
  Spin,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ReloadOutlined,
  MinusCircleOutlined
} from '@ant-design/icons'; 
import '@ant-design/v5-patch-for-react-19';
import { useCustomer } from '@/app/hooks/useCustomer';
import { Customer, WorkAddress } from '@/app/types/Customer';
import PaginationControls from '@/app/ui/components/PaginationControls';
import SearchControls from '@/app/ui/components/SearchControls';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;

export default function CustomersPage() {
  const {createCustomer, getCustomers, getCustomersById, updateCustomer,deleteCustomer} = useCustomer();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer>();
  const [form] = Form.useForm();
  const hasShown = useRef(false);
  // Estados para búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('all');
  const [isSearching, setIsSearching] = useState(false);

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Obtener Customer
  const fetchCustomers =async (page = currentPage, size = pageSize, search = searchTerm, field = searchField) => {
    setLoading(true);
     setIsSearching(!!search);
    try {
      const response = await getCustomers(page, size, search,field);
      setCustomers(response.data);
      setTotalCustomers(response.total);
      setTotalPages(response.totalPages);
      setCurrentPage(response.page);
      setPageSize(response.limit);
    } catch (error:any) {
      if (!hasShown.current) {
      hasShown.current = true
     message.error(error.message);
    } 
    } finally {
      setLoading(false);
    }
  };

    const searchFields = [
    { value: 'all', label: 'All fields' },
    { value: 'name', label: 'Name' },
    { value: 'homeAddress', label: 'Home Address' }, 
    { value: 'email', label: 'Email' }, 
    { value: 'phone', label: 'Phone' }, 
    { value: 'description', label: 'Description' }, 
    { value: 'workAddresses', label: 'Work Addresses' },
  ];
    // Handler para búsqueda
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Resetear a primera página al buscar
    fetchCustomers(1, pageSize, value, searchField);
  };

  // Handler para cambiar campo de búsqueda
  const handleFieldChange = (value) => {
    setSearchField(value);
    if (searchTerm) {
      setCurrentPage(1);
      fetchCustomers(1, pageSize, searchTerm, value);
    }
  };

  // Limpiar búsqueda
  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchField('all');
    setCurrentPage(1);
    fetchCustomers(1, pageSize, '', 'all');
  };
  
  // Cambiar página
  const handlePageChange = (page:number, size:number) => {
    setCurrentPage(page);
    setPageSize(size);
    fetchCustomers(page, size);
  };

  // Cambiar tamaño de página
  const handleSizeChange = (size:number) => {
    setCurrentPage(1);  
    setPageSize(size);
    fetchCustomers(1, size);
  };

  // Refrescar datos
  const handleRefresh = () => {
    fetchCustomers(currentPage, pageSize);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Crear Customer
  const handleCreate = async (values:Customer) => {
    try {
      const newCustomer = await createCustomer(values);
      setCustomers([...customers,newCustomer]); 

      message.success('Customer created successfully');
      setModalVisible(false);
      form.resetFields();
    } catch (error:any) {
      message.error(error.message);
    }
  };

  // Actualizar usuario
  const handleUpdate = async (values:Customer) => {
    try {
        if(editingCustomer){

      const updatedCustomer = await updateCustomer(editingCustomer.id, values);
      setCustomers(customers.map(customer => 
        customer.id === editingCustomer.id ? { ...customer, ...updatedCustomer } : customer
      ));
      message.success('Customer update successfully');
      setModalVisible(false);
      setEditingCustomer(undefined);
      form.resetFields();}

    } catch (error:any) {
      message.error(error.message);
    }
  };

  // Eliminar usuario
  const handleDelete =  async (id:number) => {
    try {
      await deleteCustomer(id);
      message.success('Customer delete successfully'); 
      if (customers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
        fetchCustomers(currentPage - 1, pageSize);
      } else {
        fetchCustomers(currentPage, pageSize);
      }
    } catch (error:eny) {
      message.error(error.message);
    }
  };

  // Abrir modal para editar
  const handleEdit = (customer:Customer) => {
    setEditingCustomer(customer);
    form.setFieldsValue(customer);
    setModalVisible(true);
  };

  // Abrir modal para crear
  const handleAdd = () => {
    setEditingCustomer(undefined);
    form.resetFields();
    setModalVisible(true);
  };

  // Cerrar modal
  const handleCancel = () => {
    setModalVisible(false);
    setEditingCustomer(undefined);
    form.resetFields();
  };

  // Columnas de la tabla
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Home Address',
      dataIndex: 'homeAddress',
      key: 'homeAddress',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.name.localeCompare(b.name),
    }, 
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      sorter: (a, b) => a.name.localeCompare(b.name),
    }, 
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => a.name.localeCompare(b.name),
    }, 
    {
      title: 'Work Addresses',
      dataIndex: 'workAddresses',
      key: 'workAddresses',
      render: (workAddresses:[]) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {workAddresses?.map((workAddress:WorkAddress, index) => (
            <Tag key={index} color="blue">
              {workAddress.address}
            </Tag>
          ))}
        </div>
      ),
    }, 
    {
      title: 'Actions',
      key: 'actions',
      render: (_:any, record:Customer) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            Detail
          </Button>
          <Button
            type="default"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this Customer?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="dashed"
              icon={<DeleteOutlined />}
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (loading) {
        return <Spin 
                size="large"
                className="custom-spin"
                 style={{
                         position: 'absolute',
                         top: '50%',
                         left: '50%',
                         transform: 'translate(-50%, -50%)'
                        }}
                />
      } 
  return (
    <div style={{ padding: '24px' }}>
      <Card>
         <Title level={2}>Customers Management</Title>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
         
           <SearchControls
          searchTerm={searchTerm}
          searchField={searchField}
          onSearch={handleSearch}
          onFieldChange={handleFieldChange}
          onClearSearch={handleClearSearch}
          loading={loading}
          searchFields={searchFields}
          totalResults={totalCustomers}      
      />
         <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={handleRefresh}
              loading={loading}
            >
              Update
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              New Customer
            </Button>
          </Space>
        </div>   
   
       <Table
          columns={columns}
          dataSource={customers}
          loading={loading}
          rowKey="id"
         pagination={false}
        />

         <PaginationControls
          current={currentPage}
          pageSize={pageSize}
          total={totalCustomers}
          onChange={handlePageChange} 
          onSizeChange={handleSizeChange}
          showSizeChanger={true} 
         showTotal = {true}
        />
        <Modal
          title={editingCustomer ? 'Edit Customer' : 'New Customer'}
          open={modalVisible}
          onCancel={handleCancel}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={editingCustomer ? handleUpdate : handleCreate}
          >
            
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item
              label="Home Address"
              name="homeAddress"
              rules={[{ required: true, message: 'Please enter your home address' }]}
            >
              <TextArea rows={2} placeholder="Home Address" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Invalid email' }
                     ]}
            >
              <Input placeholder="email@example.com" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please enter your phone' }]}
            >
             <Input placeholder="+1 234 567 8900" />
            </Form.Item>

             <Form.Item
              label="Description"
              name="description"
              rules={[ ]}
            >
             <TextArea rows={2} placeholder="Description" />
            </Form.Item>

            
      <Form.List name="workAddresses">
        {(fields, { add, remove }) => (
          <div style={{ width: '100%'}}>
            {fields.map(({ key, name, ...restField }) => (
             
                 
                <Form.Item
                 key={key}
                  {...restField}
                  name={[name, 'address']}
                  rules={[{ required: true, message: 'Please enter your work addresses' }]}
                >
                  <Space.Compact style={{ width: '100%',rowGap: 16}} >
                  <TextArea rows={2} placeholder="Work Addresses" style={{ width: '100%',marginRight: 8}}/>
                 <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space.Compact>
                </Form.Item>
                  
                
               
             
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
               Add work addresses
              </Button>
            </Form.Item>
          </div>
        )}
      </Form.List>

      <Divider />
            
        <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
              <Space>
                <Button onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  {editingCustomer? 'Update' : 'Add'}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}
