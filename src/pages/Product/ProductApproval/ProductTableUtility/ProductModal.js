import React, { useEffect, useState } from "react";
import { Modal } from "rsuite";
import Button from "../../../../components/Common/Button";
import API from "../../../../api/server";

const ProductModal = ({ modal, setModal, modalData }) => {
  //   console.log("modal", modalData);
  const toggle = () => setModal(!modal);
  const [auth] = useState(JSON.parse(localStorage.getItem("auth")));
  const [user, setUser] = useState();
  const [items, setItems] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const re = await API.get("/api/users/" + modalData.userId, {
          headers: {
            "Content-Type": "application/json",
            token: "Bearer " + auth?.token,
          },
        });
        // console.log(re);
        setUser(re.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, [auth?.token, modalData?.userId]);

  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await API.post("/api/users/get/items/all", {
          items: modalData?.items,
        });
        // console.log("item", res);
        setItems(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getItem();
  }, [modalData?.items]);

  return (
    <>
      <Modal open={modal} onClose={toggle}>
        <Modal.Header>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1 className="font-bold">User Information</h1>
          <div>
            <p>Name: {user?.name}</p>
          </div>
          <div>
            <p>Email: {user?.email}</p>
          </div>
          <h1 className="font-bold">Items Information</h1>
          {items?.map((item, i) => (
            <p key={i}>{item?.title}</p>
          ))}
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
