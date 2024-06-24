import { Form, FormInstance } from 'antd'
import { forwardRef, useImperativeHandle } from 'react'

export interface IFormProps {
  readonly formProps: AFormProps
  readonly formItemProps: AFormItemProps[]
}

interface IProps {
  readonly formConfig: IFormProps
}

export interface IRefProps {
  formRef: FormInstance<unknown>
}

const AForm = forwardRef<IRefProps, IProps>((props, ref) => {
  const [form] = Form.useForm()

  useImperativeHandle(ref, () => ({
    formRef: form
  }))

  return (
    <Form form={form} {...props.formConfig.formProps}>
      {props.formConfig.formItemProps.map(field => (
        <Form.Item key={field.name} {...field}>
          {field.element}
        </Form.Item>
      ))}
    </Form>
  )
})

AForm.displayName = 'AForm'

export default AForm
