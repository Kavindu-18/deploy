import React from "react";

import CrudModule from "@/modules/CrudModule";
import SupplyForm from "@/forms/SupplyForm";

function Supply() {
    const entity = "supply";
    const searchConfig = {
        displayLabels: ["supplierName"],
        searchFields: "supplierName,status",
        outputValue: "_id",
    };

    const panelTitle = "Suppliers Panel";
    const dataTableTitle = "Supplies";
    const entityDisplayLabels = ["supplierName"];

    const readColumns = [
        {
            title: "Supplier Name",
            dataIndex: "supplierName",
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
            title: "Received Date",
            dataIndex: "receivedDate",
        },

        {
            title: "Expiry Date",
            dataIndex: "expiryDate",
        },
        {
            title: "Status",
            dataIndex: "status",
        }
    ];
    const dataTableColumns = [
        {
            title: "Supplier Name",
            dataIndex: "supplierName",
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
            title: "Received Date",
            dataIndex: "receivedDate",
        },

        {
            title: "Expiry Date",
            dataIndex: "expiryDate",
        },
        {
            title: "Status",
            dataIndex: "status",
        }
    ];

    const ADD_NEW_ENTITY = "Add New Supply";
    const DATATABLE_TITLE = "Supplies";
    const ENTITY_NAME = "supply";
    const CREATE_ENTITY = "Create supply";
    const UPDATE_ENTITY = "Update supply";
    const config = {
        entity,
        panelTitle,
        dataTableTitle,
        ENTITY_NAME,
        CREATE_ENTITY,
        ADD_NEW_ENTITY,
        UPDATE_ENTITY,
        DATATABLE_TITLE,
        readColumns,
        dataTableColumns,
        searchConfig,
        entityDisplayLabels,
    };
    return (
        <CrudModule
            createForm={<SupplyForm />}
            updateForm={<SupplyForm isUpdateForm={true} />}
            config={config}
        />
    );
}

export default Supply;
