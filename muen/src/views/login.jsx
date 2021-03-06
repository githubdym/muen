import React  from 'react'
import { Form, Icon, Input, Button, Checkbox,Row,Col} from 'antd';
import axios from 'axios';
import '../css/login.css'
class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  state={
      userName:'',
      password:''
  }
  render() {
    let{userName,password}=this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Row>
        <Col span={8} offset={8}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入您的用户名!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              setfieldsvalue='userName' onChange={(e)=>{
                  this.setState({
                    userName:e.target.value
                  })
              }}
            />,
          )}
        </Form.Item>
         </Col>
          </Row>
          <Row>
            <Col span={8} offset={8}>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入您的密码!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"

              setfieldsvalue='password' onChange={(e)=>{
                this.setState({
                    password:e.target.value
                })
            }}
            />,
          )}
        </Form.Item>
        </Col>
          </Row>
          <Row>
            <Col span={8} offset={8}>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <span className="login-form-forgot" href="#">
            
            Forgot password
          </span>
          <Button type="primary" htmlType="submit" className="login-form-button"  onClick={()=>{
              axios.post('/login',{userName,password} ).then(res=>{
                console.log(res);
                if (res.data.token) {
                    window.localStorage.setItem('token', res.data.token);
                    if(res.data.code===1){
                        this.props.history.push('/home')
                    }
                  
                  }
              })

          }} >
            Log in
          </Button>
          Or <span onClick={()=>{
              this.props.history.push('/register')
          }}>register now!</span>
        </Form.Item>
        </Col>
          </Row>
      </Form>
    );
  }
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default  Login

