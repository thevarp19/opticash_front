import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { FC } from "react";

interface DeleteButtonProps {
    onConfirm: (
        e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined
    ) => void;
}

export const DeleteButton: FC<DeleteButtonProps> = ({ onConfirm }) => {
    return (
        <Popconfirm
            title="Удалить этот элемент"
            description="Вы уверены, что хотите удалить этот элемент?"
            onConfirm={onConfirm}
        >
            <Button danger icon={<DeleteOutlined />}>
                Delete
            </Button>
        </Popconfirm>
    );
};
