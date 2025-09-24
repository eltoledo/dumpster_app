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
  Spin,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ReloadOutlined
} from '@ant-design/icons'; 
import '@ant-design/v5-patch-for-react-19';
import { useDriver } from '@/app/hooks/useDriver';
import { Driver } from '@/app/types/Driver';
import PaginationControls from '@/app/ui/components/PaginationControls';
import SearchControls from '@/app/ui/components/SearchControls';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;

export default function DriversPage() {
  const {createDriver, getDrivers, getDriverById, updateDriver,deleteDriver} = useDriver();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver>();
  const [form] = Form.useForm();
  const hasShown = useRef(false);

    // Estados para búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('all');
  const [isSearching, setIsSearching] = useState(false);

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalDrivers, setTotalDrivers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Obtener Drivers
  const fetchDrivers =async (page = currentPage, size = pageSize, search = searchTerm, field = searchField) => {
    setLoading(true);
    try {
      const response = await getDrivers(page, size,search,field);
      setDrivers(response.data);
      setTotalDrivers(response.total);
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
    { value: 'firstName', label: 'First Name' },
    { value: 'lastName', label: 'Last Name' }, 
    { value: 'licenseNumber', label: 'License Number' }, 
    { value: 'licenseType', label: 'License Type' }, 
    { value: 'phone', label: 'Phone' }, 
    { value: 'email', label: 'Email' },  
  ];
  
  
    // Handler para búsqueda
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Resetear a primera página al buscar
    fetchDrivers(1, pageSize, value, searchField);
  };

  // Handler para cambiar campo de búsqueda
  const handleFieldChange = (value) => {
    setSearchField(value);
    if (searchTerm) {
      setCurrentPage(1);
      fetchDrivers(1, pageSize, searchTerm, value);
    }
  };

    // Limpiar búsqueda
  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchField('all');
    setCurrentPage(1);
    fetchDrivers(1, pageSize, '', 'all');
  };

  // Cambiar página
  const handlePageChange = (page:number, size:number) => {
    setCurrentPage(page);
    setPageSize(size);
    fetchDrivers(page, size);
  };

  // Cambiar tamaño de página
  const handleSizeChange = (size:number) => {
    setCurrentPage(1);  
    setPageSize(size);
    fetchDrivers(1, size);
  };

  // Refrescar datos
  const handleRefresh = () => {
    fetchDrivers(currentPage, pageSize);
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // Crear Driver
  const handleCreate = async (values:Driver) => {
    try {
      const newDriver = await createDriver(values);
      setDrivers([...drivers,newDriver]); 

      message.success('Driver created successfully');
      setModalVisible(false);
      form.resetFields();
    } catch (error:any) {
      message.error(error.message);
    }
  };

  // Actualizar Driver
  const handleUpdate = async (values:Driver) => {
    try {
        if(editingDriver){

      const updatedDriver = await updateDriver(editingDriver.id, values);
      setDrivers(drivers.map(driver => 
        driver.id === editingDriver.id ? { ...driver, ...updatedDriver } : driver
      ));
      message.success('Driver update successfully');
      setModalVisible(false);
      setEditingDriver(undefined);
      form.resetFields();}

    } catch (error:any) {
      message.error(error.message);
    }
  };

  // Eliminar Driver
  const handleDelete =  async (id:number) => {
    try {
      await deleteDriver(id);
      message.success('Driver delete successfully'); 
      if (drivers.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
        fetchDrivers(currentPage - 1, pageSize);
      } else {
        fetchDrivers(currentPage, pageSize);
      }
    } catch (error:any) {
      message.error(error.message);
    }
  };

  // Abrir modal para editar
  const handleEdit = (driver:Driver) => {
    setEditingDriver(driver);
    form.setFieldsValue(driver);
    setModalVisible(true);
  };

  // Abrir modal para crear
  const handleAdd = () => {
    setEditingDriver(undefined);
    form.resetFields();
    setModalVisible(true);
  };

  // Cerrar modal
  const handleCancel = () => {
    setModalVisible(false);
    setEditingDriver(undefined);
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
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },  
    {
      title: 'License Number',
      dataIndex: 'licenseNumber',
      key: 'licenseNumber',
      sorter: (a, b) => a.licenseNumber.localeCompare(b.licenseNumber),
    },
     {
      title: 'License Type',
      dataIndex: 'licenseType',
      key: 'licenseType',
      sorter: (a, b) => a.licenseType.localeCompare(b.licenseType),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
     },
     {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
     } ,    
    {
      title: 'Actions',
      key: 'actions',
      render: (_:any, record:Driver) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            href={`/dashboard/drivers/${record.id}/transfer`}
            >              
            Transfers 
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
            title="Are you sure you want to delete this driver?"
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
         <Title level={2}>Drivers Management</Title>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <SearchControls
          searchTerm={searchTerm}
          searchField={searchField}
          onSearch={handleSearch}
          onFieldChange={handleFieldChange}
          onClearSearch={handleClearSearch}
          loading={loading}
          searchFields={searchFields}
          totalResults={totalDrivers}      
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
              New Driver
            </Button>
          </Space>
        </div>

         
        <Table
          columns={columns}
          dataSource={drivers}
          loading={loading}
          rowKey="id"
         pagination={false}
        />
         <PaginationControls
          current={currentPage}
          pageSize={pageSize}
          total={totalDrivers}
          onChange={handlePageChange} 
          onSizeChange={handleSizeChange}
          showSizeChanger={true} 
         showTotal = {true}
        />

        <Modal
          title={editingDriver ? 'Edit Driver' : 'New Driver'}
          open={modalVisible}
          onCancel={handleCancel}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={editingDriver ? handleUpdate : handleCreate}
          >
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: 'Please enter this field' }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>

              <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: 'Please enter this field' }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>

            <Form.Item
              label="License Number"
              name="licenseNumber"
              rules={[{ required: true, message: 'Please enter this field' }]}
            >
              <Input placeholder="License Number" />
            </Form.Item>

            <Form.Item
              label="License Type"
              name="licenseType"
              rules={[{ required: true, message: 'Please enter this field' }]}
            >
              <Input placeholder="License Type" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please enter your phone' }]}
            >
              <Input placeholder="+1 234 567 8900" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Invalid email' }
              ]}
            >
              <Input placeholder="correo@ejemplo.com" />
            </Form.Item>            
            
        <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
              <Space>
                <Button onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  {editingDriver ? 'Update' : 'Add'}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}
