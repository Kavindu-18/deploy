import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import { DatePicker } from "@/components/CustomAntd";

const { Option } = Select;

export default function SupplyForm({ isUpdateForm = false }) {
    const [receivedDate, setReceivedDate] = useState(null);

    // Custom validation function for the Quantity field
    const validateQuantity = (_, value) => {
        if (value && isNaN(value)) {
            return Promise.reject(new Error("Quantity must be a number"));
        }
        if (value && parseFloat(value) < 0) {
            return Promise.reject(new Error("Quantity must be a positive number"));
        }
        return Promise.resolve();
    };

    return (
        <>
            <Form.Item
                label="Supplier Name"
                name="supplierName"
                rules={[
                    {
                        required: true,
                        message: "Please input your Supplier Name!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="ingredients"
                label="Ingredients"
                rules={[
                    {
                        required: true,
                        message: "Please input your Ingredients!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Quantity"
                name="quantity"
                rules={[
                    {
                        required: true,
                    },
                    {
                        validator: validateQuantity,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Received Date"
                name="receivedDate"
                rules={[
                    {
                        required: true,
                        message: "Please input Received Date!",
                    },
                ]}
            >
                <DatePicker format={"DD/MM/YYYY"} onChange={(date) => setReceivedDate(date)} />
            </Form.Item>
            <Form.Item
                label="Expiry Date"
                name="expiryDate"
                rules={[
                    {
                        required: true,
                        message: "Please input expiry Date!",
                    },
                ]}
            >
                <DatePicker
                    format={"DD/MM/YYYY"}
                    disabledDate={(current) => current && receivedDate ? current.isBefore(receivedDate) : false}
                />
            </Form.Item>
            {isUpdateForm && (
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                        {
                            required: true,
                            message: "Please select Status!",
                        },
                    ]}
                >
                    <Select>
                        <Option value="Available">Available</Option>
                        <Option value="Out of Stock">Out of Stock</Option>
                    </Select>
                </Form.Item>
            )}
        </>
    );
}