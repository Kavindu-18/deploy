import React, { useCallback, useEffect, useState } from "react";
import { Dropdown, Button, PageHeader, Table } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { selectListItems } from "@/redux/crud/selectors";
import axios from 'axios';
import uniqueId from "@/utils/uinqueId";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function DataTable({ config, DropDownRowMenu, AddNewItem }) {
  let { entity, dataTableColumns, dataTableTitle } = config;
  dataTableColumns = [
    ...dataTableColumns,
    {
      title: "",
      render: (row) => (
        <Dropdown overlay={DropDownRowMenu({ row })} trigger={["click"]}>
          <EllipsisOutlined style={{ cursor: "pointer", fontSize: "24px" }} />
        </Dropdown>
      ),
    },
  ];

  const { result: listResult, isLoading: listIsLoading } = useSelector(
    selectListItems
  );

  const { pagination, items } = listResult;

  const dispatch = useDispatch();

  const handleDataTableLoad = useCallback((pagination) => {
    dispatch(crud.list(entity, pagination.current));
  }, [dispatch, entity]);

  useEffect(() => {
    dispatch(crud.list(entity));
  }, [dispatch, entity]);

  const handleGenerateReport = async () => {
    try {
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(22);
      doc.text("Monthly Supply Report", 105, 20, { align: "center" });

      // Define table headers
      const headers = ["Supplier Name", "Ingredients", "Quantity", "Received Date", "Expiry Date", "Status"];
      const rows = [];

      // Populate table rows
      items.forEach((item) => {
        const row = [
          item.supplierName,
          item.ingredients,
          item.quantity,
          item.receivedDate,
          item.expiryDate,
          item.status
        ];
        rows.push(row);
      });

      // Add table
      doc.autoTable({
        startY: 40, // Start position (y-coordinate)
        head: [headers], // Table headers
        body: rows, // Table rows
      });

      // Add footer
      doc.setFontSize(10);
      doc.text("Generated on: " + new Date().toLocaleString(), 20, doc.internal.pageSize.height - 10);

      // Calculate ingredient totals
      const ingredientTotals = {};
      items.forEach(item => {
        if (ingredientTotals[item.ingredients]) {
          ingredientTotals[item.ingredients] += item.quantity;
        } else {
          ingredientTotals[item.ingredients] = item.quantity;
        }
      });

      // Render total ingredient quantity table
      const totalRows = [];
      for (const ingredient in ingredientTotals) {
        totalRows.push([ingredient, ingredientTotals[ingredient]]);
      }

      // Add total ingredient quantity table
      doc.autoTable({
        startY: doc.autoTable.previous.finalY + 10,
        head: [["Ingredient", "Total Quantity"]],
        body: totalRows,
      });

      // Save the PDF with a custom filename
      doc.save("Monthly_Supply_Report.pdf");
    } catch (error) {
      // Handle error
      console.error('Error generating report:', error);
    }
  };

  return (
    <>
      <PageHeader
        onBack={() => window.history.back()}
        title={dataTableTitle}
        ghost={false}
        extra={[
          <Button onClick={handleDataTableLoad} key={uniqueId()}>
            Refresh
          </Button>,
          <Button onClick={handleGenerateReport} key={uniqueId()}>
            Generate Report
          </Button>,
          <AddNewItem key={uniqueId()} config={config} />,
        ]}
        style={{
          padding: "20px 0px",
        }}
      ></PageHeader>
      <Table
        columns={dataTableColumns}
        rowKey={(item) => item._id}
        dataSource={items}
        pagination={pagination}
        loading={listIsLoading}
        onChange={handleDataTableLoad}
      />
    </>
  )
}