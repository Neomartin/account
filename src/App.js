import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Form, Input, Row, Table } from "antd";
import Column from "antd/lib/table/Column";

const URL = process.env.REACT_APP_API_URL;
function App() {
  const [users, setUsers] = useState([])

  const registerUser = async (user) => {
    const newUser = await axios.post({ ...user });
    setUsers([...users, newUser.data.usuarioNuevo])
  };
  useEffect(() => {
    // awsLambda();
    getUsers();
  }, []);

  const getUsers = async() => {
    const users = await axios.get(`${URL}/users`);
    // console.log(users)
    setUsers(users.data.users);
  }

  const awsLambda = async () => {
    try {
      const resp = await axios.delete(`${URL}/user/dasdsa`);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Row>
        <Col xs={12}>
          <Row justify="center">
            <h1>Register</h1>
            <Col span={24} offset={2}>
              <Form
                name="register"
                layout="vertical"
                onFinish={registerUser}
                wrapperCol={{ span: 20 }}
              >
                <Form.Item
                  label="Nombre y Apellido"
                  name="fullName"
                  rules={[
                    { required: true, message: "Ingrese su nombre completo" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="email"
                  name="email"
                  rules={[
                    { required: true, message: "Ingrese su email" },
                    { type: "email" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Registrar
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
        <Col xs={12}>
          <Table dataSource={users} rowKey="_id">
            <Column title="Nombre completo" dataIndex="fullName" key="fullName"></Column>
            <Column title="email" dataIndex="email" key="email"></Column>
          </Table>
        </Col>
      </Row>
    </>
  );
}

export default App;
