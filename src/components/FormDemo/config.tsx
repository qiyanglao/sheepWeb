import { Input, Select } from "antd";

import { IFormProps } from "../AForm";

export const formConfig = (): IFormProps => {
  return {
    formProps: { layout: "inline", colon: false },
    formItemProps: [
      {
        name: "username",
        label: <span style={{ fontWeight: "normal", fontSize: 14 }}>cc</span>,
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
        rules: [{ required: true, message: "请输入用户名" }],
        element: <Input />,
      },
      {
        name: "password",
        label: "密码",
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
        rules: [{ required: true, message: "请输入密码" }],
        element: <Input.Password />,
      },
      {
        name: "gender",
        label: "性别",
        labelCol: { span: 10 },
        wrapperCol: { span: 20 },
        rules: [{ required: true, message: "请选择性别" }],
        element: (
          <Select
            placeholder="请选择"
            options={[
              { value: "1", label: <span>男</span> },
              { value: "0", label: <span>女</span> },
            ]}
          />
        ),
      },
    ],
  };
};
