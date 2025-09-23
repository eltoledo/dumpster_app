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
  Badge,
  ColorPicker,
  Spin,
  Tag,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ReloadOutlined
} from '@ant-design/icons'; 
import '@ant-design/v5-patch-for-react-19';
import { useDumpsterStatus } from '@/app/hooks/useDumpsterStatus';
import { DumpsterStatus } from '@/app/types/Dumpster';
import PaginationControls from '@/app/ui/components/PaginationControls';
import SearchControls from '@/app/ui/components/SearchControls';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;

export default function DumpsterStatusPage() {
  const {createDumpsterStatus, getDumpstersStatus, getDumpsterStatusById, updateDumpsterStatus,deleteDumpsterStatus} = useDumpsterStatus();
  const [dumpstersStatus, setDumpstersStatus] = useState<DumpsterStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingDumpsterStatus, setEditingDumpsterStatus] = useState<DumpsterStatus>();
  const [form] = Form.useForm();
  const hasShown = useRef(false);

  // Estados para búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('all');
  const [isSearching, setIsSearching] = useState(false);

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalDumpstersStatus, setTotalDumpstersStatus] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Obtener 
  const fetchDumpstersStatus =async (page = currentPage, size = pageSize, search = searchTerm, field = searchField) => {
    setLoading(true);
     setIsSearching(!!search);
    try {
      const response = await getDumpstersStatus(page, size, search,field);
      setDumpstersStatus(response.data);
      setTotalDumpstersStatus(response.total);
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
    { value: 'name', label: 'Status name' },
    { value: 'colorCode', label: 'Color' }, 
     { value: 'description', label: 'Description' }, 
  ];
    // Handler para búsqueda
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Resetear a primera página al buscar
    fetchDumpstersStatus(1, pageSize, value, searchField);
  };

  // Handler para cambiar campo de búsqueda
  const handleFieldChange = (value) => {
    setSearchField(value);
    if (searchTerm) {
      setCurrentPage(1);
      fetchDumpstersStatus(1, pageSize, searchTerm, value);
    }
  };

  // Limpiar búsqueda
  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchField('all');
    setCurrentPage(1);
    fetchDumpstersStatus(1, pageSize, '', 'all');
  };
  
  // Cambiar página
  const handlePageChange = (page:number, size:number) => {
    setCurrentPage(page);
    setPageSize(size);
    fetchDumpstersStatus(page, size);
  };

  // Cambiar tamaño de página
  const handleSizeChange = (size:number) => {
    setCurrentPage(1);  
    setPageSize(size);
    fetchDumpstersStatus(1, size);
  };

  // Refrescar datos
  const handleRefresh = () => {
    fetchDumpstersStatus(currentPage, pageSize);
  };

  useEffect(() => {
    fetchDumpstersStatus();
  }, []);

  // Crear 
  const handleCreate = async (values:DumpsterStatus) => {
    try {
      const newDumpsterStatus = await createDumpsterStatus(values);
      setDumpstersStatus([...dumpstersStatus,newDumpsterStatus]); 

      message.success('Dumpster Status created successfully');
      setModalVisible(false);
      form.resetFields();
    } catch (error:any) {
      message.error(error.message);
    }
  };

  // Actualizar 
  const handleUpdate = async (values:DumpsterStatus) => {
    try {
        if(editingDumpsterStatus){

      const updatedDumpsterStatus = await updateDumpsterStatus(editingDumpsterStatus.id, values);
      setDumpstersStatus(dumpstersStatus.map(dumpsterStatus => 
        dumpsterStatus.id === editingDumpsterStatus.id ? { ...dumpsterStatus, ...updatedDumpsterStatus } : dumpsterStatus
      ));
      message.success('Dumpster Status update successfully');
      setModalVisible(false);
      setEditingDumpsterStatus(undefined);
      form.resetFields();}

    } catch (error:any) {
      message.error(error.message);
    }
  };

  // Eliminar 
  const handleDelete =  async (id:number) => {
    try {
      await deleteDumpsterStatus(id);
      message.success('Dumpster Status delete successfully'); 
      if (dumpstersStatus.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
        fetchDumpstersStatus(currentPage - 1, pageSize);
      } else {
        fetchDumpstersStatus(currentPage, pageSize);
      }
    } catch (error:eny) {
      message.error(error.message);
    }
  };

  // Abrir modal para editar
  const handleEdit = (dumpsterStatus:DumpsterStatus) => {
    setEditingDumpsterStatus(dumpsterStatus);
    form.setFieldsValue(dumpsterStatus);
    setModalVisible(true);
  };

  // Abrir modal para crear
  const handleAdd = () => {
    setEditingDumpsterStatus(undefined);
    form.resetFields();
    setModalVisible(true);
  };

  // Cerrar modal
  const handleCancel = () => {
    setModalVisible(false);
    setEditingDumpsterStatus(undefined);
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
      title: 'Status Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: 'Color',
      dataIndex: 'colorCode',
      key: 'colorCode',
      render: (colorCode:string) => (
        <div>
           <Tag color={colorCode} key={colorCode}>
              {colorCode.toUpperCase()}
            </Tag>
        </div>
               
            ) 
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => a.description.localeCompare(b.description),
    },    
    {
      title: 'Actions',
      key: 'actions',
      render: (_:any, record:DumpsterStatus) => (
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
            title="Are you sure you want to delete this dumpster status?"
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
         <Title level={2}>Dumpster Status Management</Title>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <SearchControls
          searchTerm={searchTerm}
          searchField={searchField}
          onSearch={handleSearch}
          onFieldChange={handleFieldChange}
          onClearSearch={handleClearSearch}
          loading={loading}
          searchFields={searchFields}
          totalResults={totalDumpstersStatus}      
      />
      <Card size="small" style={{ marginBottom: '16px', backgroundColor: '#fafafa' }}>
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
              New Dumpster Status
            </Button>
          </Space>
          </Card>
        </div>   
   
       <Table
          columns={columns}
          dataSource={dumpstersStatus}
          loading={loading}
          rowKey="id"
         pagination={false}
        />

         <PaginationControls
          current={currentPage}
          pageSize={pageSize}
          total={totalDumpstersStatus}
          onChange={handlePageChange} 
          onSizeChange={handleSizeChange}
          showSizeChanger={true} 
         showTotal = {true}
        />
        <Modal
          title={editingDumpsterStatus ? 'Edit Dumpster Status' : 'New Dumpster Status'}
          open={modalVisible}
          onCancel={handleCancel}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={editingDumpsterStatus ? handleUpdate : handleCreate}
          >
            <Form.Item
              label="Status Name"
              name="name"
              rules={[{ required: true, message: 'Please enter status name' }]}
            >
              <Input placeholder="status name" />
            </Form.Item>

            
             <Form.Item
               name="colorCode"
               label="Color"
               rules={[{ required: true, message: 'Please enter color' }]}
              >
               <ColorPicker 
                 format="hex"
                 showText
                 size="large"
                 disabledAlpha
                 onChange={(color) => {
                  form.setFieldsValue({ colorCode: color.toHexString() });
                }}
                 
                />
             </Form.Item>
             
            <Form.Item
              label="Description"
              name="description"
              rules={[ ]}
            >
             <TextArea rows={2} placeholder="Description" />
            </Form.Item>
            
        <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
              <Space>
                <Button onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  {editingDumpsterStatus ? 'Update' : 'Add'}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
}
