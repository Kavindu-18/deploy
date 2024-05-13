import React, { useRef, useState } from "react";
import { Form, Input, InputNumber, Space, Divider, Row, Col } from "antd";

import { Layout, Breadcrumb, Statistic, Progress, Tag } from "antd";

import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

import { DashboardLayout } from "@/layout";
import RecentTable from "@/components/RecentTable";

const TopCard = ({ title, tagContent, tagColor, prefix }) => {
  return (
    <Col className="gutter-row" span={6}>
      <div
        className="whiteBox shadow"
        style={{ color: "#595959", fontSize: 13, height: "106px" }}
      >
        <div
          className="pad15 strong"
          style={{ textAlign: "center", justifyContent: "center" }}
        >
          <h3 style={{ color: "#22075e", marginBottom: 0 }}>{title}</h3>
        </div>
        <Divider style={{ padding: 0, margin: 0 }}></Divider>
        <div className="pad15">
          <Row gutter={[0, 0]}>
            <Col className="gutter-row" span={11} style={{ textAlign: "left" }}>
              <div className="left">{prefix}</div>
            </Col>
            <Col className="gutter-row" span={2}>
              <Divider
                style={{ padding: "10px 0", justifyContent: "center" }}
                type="vertical"
              ></Divider>
            </Col>
            <Col
              className="gutter-row"
              span={11}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Tag
                color={tagColor}
                style={{ margin: "0 auto", justifyContent: "center" }}
              >
                {tagContent}
              </Tag>
            </Col>
          </Row>
        </div>
      </div>
    </Col>
  );
};
const PreviewState = ({ tag, color, value }) => {
  let colorCode = "#000";
  switch (color) {
    case "bleu":
      colorCode = "#1890ff";
      break;
    case "green":
      colorCode = "#95de64";
      break;
    case "red":
      colorCode = "#ff4d4f";
      break;
    case "orange":
      colorCode = "#ffa940";
      break;
    case "purple":
      colorCode = "#722ed1";
      break;
    case "grey":
      colorCode = "#595959";
      break;
    case "cyan":
      colorCode = "#13c2c2";
      break;
    case "brown":
      colorCode = "#614700";
      break;
    default:
      break;
  }
  return (
    <div style={{ color: "#595959", marginBottom: 5 }}>
      <div className="left alignLeft">{tag}</div>
      <div className="right alignRight">{value} %</div>
      <Progress
        percent={value}
        showInfo={false}
        strokeColor={{
          "0%": colorCode,
          "100%": colorCode,
        }}
      />
    </div>
  );
};
export default function Dashboard() {

  const supplerColumns = [
    // {
    //   title: "Supplier Name",
    //   dataIndex: "supplierName",
    // },
    {
      title: "Received Date",
      dataIndex: "receivedDate",
    },

    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
    },

    {
      title: "Ingredients",
      dataIndex: "ingredients",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        let color = status === "Available" ? "green" : "volcano";

        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    }
  ];

  return (
    <DashboardLayout>
      <Row gutter={[24, 24]}>
        <TopCard
          title={"Orders to Ship"}
          tagColor={"cyan"}
          prefix={"This month"}
          tagContent={"106"}
        />
        <TopCard
          title={"Overdue Shipments"}
          tagColor={"purple"}
          prefix={"This month"}
          tagContent={"20"}
        />
        <TopCard
          title={"Open POs"}
          tagColor={"green"}
          prefix={"This month"}
          tagContent={"198"}
        />
        <TopCard
          title={"Late Vendor Shipments"}
          tagColor={"red"}
          prefix={"This month"}
          tagContent={"12"}
        />
      </Row>
      <div className="space30"></div>
      <Row gutter={[24, 24]}>
        <Col className="gutter-row" span={18}>
          <div className="whiteBox shadow">
            <div className="pad20">
              <h3 style={{ color: "#22075e", marginBottom: 5 }}>
                Supplies
              </h3>
            </div>

            <RecentTable entity={"supply"} dataTableColumns={supplerColumns} />
          </div>
        </Col>

        <Col className="gutter-row" span={6}>
          <div className="whiteBox shadow" style={{ height: "422px" }}>
            <div
              className="pad20"
              style={{ textAlign: "center", justifyContent: "center" }}
            >
              <h3 style={{ color: "#22075e", marginBottom: 30 }}>
                Supplier Preview
              </h3>

              <Progress type="dashboard" percent={25} width={148} />
              <p>New Supplier this Month</p>
              <Divider />
              <Statistic
                title="Active Supplier"
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </div>
          </div>
        </Col>
      </Row>
      <div className="space30"></div>
    </DashboardLayout>
  );
}
