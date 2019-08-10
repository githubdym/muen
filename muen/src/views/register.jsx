import React from 'react';
import axios from 'axios';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
  
    Checkbox,
    Button,
    // AutoComplete,
  } from 'antd';
  
import '../css/register.css'
// import { readlink } from 'fs';
  const { Option } = Select;
  // const AutoCompleteOption = AutoComplete.Option;
  
  const residences = [
    {
      value: '北京',
      label: '北京',
      children: [
        {
          value: '北京',
          label: '北京',
          children: [
            {
              value: '海淀区',
              label: '海淀区',
            },
          ],
        },
      ],
    },
    {
      value: '江苏',
      label: '江苏',
      children: [
        {
          value: '南京',
          label: '南京',
          children: [
            {
              value: '中华门',
              label: '中华门',
            },
          ],
        },
      ],
    },
  ];
  class RegistrationForm extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
      userName:'',
      password:'',
      realName:''
    };
  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    };
  
    handleConfirmBlur = e => {
      const { value } = e.target;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
  
    compareToFirstPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password')) {
        callback('您输入的两个密码不一致!');
      } else {
        callback();
      }
    };
  
    validateToNextPassword = (rule, value, callback) => {
      const { form } = this.props;
   
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };
  
    handleWebsiteChange = value => {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
      }
      this.setState({ autoCompleteResult });
    };
  
    render() {
      const { getFieldDecorator } = this.props.form;
      // const { autoCompleteResult } = this.state;
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
      const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '86',
      })(
        <Select style={{ width: 70 }}>
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>,
      );
  
      // const websiteOptions = autoCompleteResult.map(website => (
      //   <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
      // ));
        let {userName,password,realName}=this.state;
      return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>

        <Form.Item
            label={
              <span>
                用户名&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: '请输入您的昵称!', whitespace: true }],
            })(<Input    setfieldsvalue={userName} onChange={(e)=>{
                      this.setState({
                        userName:e.target.value
                      })
                     
            }}/>)}
          </Form.Item>
         
          <Form.Item label="密码" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入您的密码!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password   setfieldsvalue={password} onChange={(e)=>{
                            this.setState({
                              password:e.target.value
                            })
                           
                          }}
            />)}
          </Form.Item>
          <Form.Item label="确认密码" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: '请再次确认您的密码!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item label="真实姓名">
          {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入您的姓名!', whitespace: true }],
            })(<Input  setfieldsvalue={realName} onChange={(e)=>{
                              this.setState({
                                realName:e.target.value
                              })

                         }}
                
            
            />)}
          </Form.Item>
          <Form.Item label="用户地址">
            {getFieldDecorator('residence', {
              initialValue: ['北京', '北京', '海淀区'],
              rules: [
                { type: 'array', required: false, message: '请选择您的地址!' },
              ],
            })(<Cascader options={residences} />)}
          </Form.Item>
          <Form.Item label="电话">
            {getFieldDecorator('phone', {
              rules: [{ required: false, message: '请输入您的电话!' }],
            })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>
                I have read the agreement
              </Checkbox>,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      );
    }
    componentDidMount() {
      let{ userName,password,realName}=this.state;
      axios.post('/register',{realName,userName,password})
        .then(res => {
            console.log(res)
        });
    }
    componentDidUpdate(){
    
        console.log(this.state.userName,this.state.password)
      
    }
   

  }

  const Register= Form.create({ name: 'register' })(RegistrationForm);
  export default Register