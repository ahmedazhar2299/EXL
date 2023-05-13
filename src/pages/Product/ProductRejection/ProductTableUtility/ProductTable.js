import { useState } from "react";
import { Table, useToaster } from "rsuite";
import ProductModal from "./ProductModal";
import Button from "../../../../components/Common/Button";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import Toaster from "../../../../components/Common/Toaster";
import API from "../../../../api/server";

const ProductTable = ({ data }) => {
  const { Column, HeaderCell, Cell } = Table;
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(false);
  const toaster = useToaster();

  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        if (sortType === "asc") {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return data;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };


  return (
    <>
      <ProductModal modalData={modalData} modal={modal} setModal={setModal} />
      <div className="mx-auto overflow-x-scroll table-container ">
        <Table
          virtualized
          width={"83%"}
          height={500}
          data={getData()}
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={handleSortColumn}
          loading={loading}
          bordered
          cellBordered
          className="mx-auto  bg-white"
        >
          <Column align="center" sortable width={300}>
            <HeaderCell className="font-extrabold text-black">
              Category
            </HeaderCell>
            <Cell className="capitalize" dataKey="subcategory" />
          </Column>

          <Column align="center" sortable width={300}>
            <HeaderCell className="font-extrabold  text-black">
              Brand
            </HeaderCell>
            <Cell className="capitalize" dataKey="brand" />
          </Column>

          <Column align="center" sortable width={300}>
            <HeaderCell className="font-extrabold  text-black">
              Model
            </HeaderCell>
            <Cell className="capitalize" dataKey="model" />
          </Column>

          <Column align="center" width={300}>
            <HeaderCell className="font-extrabold text-black" flexGrow={1}>
              Status
            </HeaderCell>
            <Cell
              style={{
                padding: "6px",
                textAlign: "center",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="text-red-500 font-bold "
            >
              Unapproved
            </Cell>
          </Column>

          <Column align="center" width={400}>
            <HeaderCell className="font-extrabold text-black" flexGrow={1}>
              Detail
            </HeaderCell>
            <Cell
              style={{
                padding: "6px",
                textAlign: "center",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {(rowData) => (
                <Button
                  text="View"
                  onClick={() => {
                    setModalData(rowData);
                    setModal(true);
                  }}
                />
              )}
            </Cell>
          </Column>
        </Table>
      </div>
    </>
  );
};

export default ProductTable;
