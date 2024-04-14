import { useFormInfo } from "@/hooks/auth/useFormInfo";
import { Button, Form } from "antd";
import clsx from "clsx";
import React from "react";
import { FormikInput } from "./FormikInput";

// Define the type for your form fields
interface FormValues {
    id: number;
    statement: string;
    iin: string;
    policy_number: string;
    medical_documents: string;
    status: string;
}

// Validation Schema

const MyForm: React.FC = () => {
    const { formik, mutation } = useFormInfo();

    return (
        <Form onFinish={formik.submitForm}>
            <FormikInput
                name="statement"
                formik={formik}
                formItemProps={{ className: clsx("w-full") }}
                inputProps={{
                    placeholder: "Statement",
                    size: "large",
                }}
            />
            <FormikInput
                name="iin"
                formik={formik}
                formItemProps={{ className: clsx("w-full") }}
                inputProps={{
                    placeholder: "IIN",
                    size: "large",
                }}
            />

            <FormikInput
                name="policy_number"
                formik={formik}
                formItemProps={{ className: clsx("w-full") }}
                inputProps={{
                    placeholder: "Policy Number",
                    size: "large",
                }}
            />
            <FormikInput
                name="medical_documents"
                formik={formik}
                formItemProps={{ className: clsx("w-full") }}
                inputProps={{
                    placeholder: "Medical Documents URL",
                    size: "large",
                }}
            />

            <Form.Item className="w-full">
                <Button
                    htmlType="submit"
                    type="primary"
                    size={"large"}
                    loading={mutation.isPending}
                    className={clsx("w-full")}
                >
                    Отправить
                </Button>
            </Form.Item>
        </Form>
    );
};

export default MyForm;
