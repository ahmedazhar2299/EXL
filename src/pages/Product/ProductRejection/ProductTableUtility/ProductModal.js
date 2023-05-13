import React from "react";
import { Modal } from "rsuite";
import Button from "../../../../components/Common/Button";

const ProductModal = ({ modal, setModal, modalData }) => {
  const toggle = () => setModal(!modal);

  return (
    <>
      <Modal size="xs" open={modal} onClose={toggle}>
        <Modal.Header>
          <Modal.Title className="text-center">Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center flex items-center flex-col">
          <h1 className="font-extrabold text-base mb-3">Information</h1>
          <div className="text-left ">
            <div>
              <p className="font-bold">
                Category:
                <span className="capitalize font-light ml-2">
                  {modalData.category}
                </span>
              </p>
            </div>
            <div>
              <p className="font-bold">
                Subcategory:
                <span className="capitalize font-light ml-2">
                  {modalData.subcategory}
                </span>
              </p>
            </div>
            <div>
              <p className="font-bold">
                Subcategory:
                <span className="capitalize font-light ml-2">
                  {modalData.subcategory}
                </span>
              </p>
            </div>
            <div>
              <p className="font-bold">
                Brand:
                <span className="capitalize font-light ml-2">
                  {modalData.brand}
                </span>
              </p>
            </div>
            <div>
              <p className="font-bold">
                Model:
                <span className="capitalize font-light ml-2">
                  {modalData.model}
                </span>
              </p>
            </div>
            <div>
              <p className="font-bold">
                Color:
                <span className="capitalize font-light ml-2">
                  {modalData.color}
                </span>
              </p>
            </div>
            <div>
              <p className="font-bold">
                Price:
                <span className="capitalize font-light ml-2">
                  {modalData.price}
                </span>
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            text="OK"
            onClick={toggle}
            className="flex justify-end items-end w-full"
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductModal;
