import { Button } from "antd";
import AForm, { IRefProps } from "../AForm";
import { formConfig } from "./config";
import { useRef } from "react";

export default function FormDemo() {
  const formRef = useRef<IRefProps>(null);

  const getFormRef = () => {
    formRef.current!.formRef.validateFields();
  };

  return (
    <div>
      <AForm formConfig={formConfig()} ref={formRef} />
      <Button type="primary" onClick={getFormRef}>
        get ref
      </Button>
    </div>
  );
}
