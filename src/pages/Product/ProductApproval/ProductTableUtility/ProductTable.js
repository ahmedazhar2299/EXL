import { useState } from "react";
import { Table } from "rsuite";
import ProductModal from "./ProductModal";
import Button from "../../../../components/Common/Button";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const ProductTable = ({ data }) => {
  const { Column, HeaderCell, Cell } = Table;
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(false);

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
          <Column align="center" sortable width={400}>
            <HeaderCell className="font-extrabold text-black">Id</HeaderCell>
            <Cell dataKey="_id" />
          </Column>

          <Column align="center" sortable width={400}>
            <HeaderCell className="font-extrabold text-black">Title</HeaderCell>
            <Cell dataKey="status" />
          </Column>

          <Column align="center" width={400}>
            <HeaderCell className="font-extrabold text-black" flexGrow={1}>
              Approval
            </HeaderCell>
            <Cell
              style={{
                padding: "6px",
              }}
            >
              <div
                className="flex gap-2 w-full justify-center items-center h-full
          "
              >
                <button className="focus:outline-none bg-green-600 active:bg-green-700 py-1 px-3 rounded-lg text-sm text-white font-extrabold">
                  <AiOutlineCheck />
                </button>
                <button className="focus:outline-none bg-red-600 active:bg-red-700 py-1 px-3 rounded-lg text-sm text-white font-extrabold">
                  <AiOutlineClose />
                </button>
              </div>
            </Cell>
          </Column>

          <Column align="center" width={400}>
            <HeaderCell flexGrow={1}>...</HeaderCell>
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
