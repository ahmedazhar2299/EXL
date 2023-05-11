import React from "react";
import { AiFillHome } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { MdPendingActions } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav } from "rsuite";
const Header = ({ onSelect, activeKey, ...props }) => {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 w-full z-10">
      <Navbar {...props}>
        <Navbar.Brand
          className="cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          EXL
        </Navbar.Brand>
        <Nav onSelect={onSelect} activeKey={activeKey}>
          <Nav.Item
            onClick={() => {
              navigate("/");
            }}
            eventKey="1"
            icon={<AiFillHome />}
          >
            Home
          </Nav.Item>
          <Nav.Menu title="Products">
            <Nav.Item
              onClick={() => {
                navigate("/add");
              }}
              className="flex items-center gap-1"
              icon={<IoMdAdd />}
              eventKey="2"
            >
              Create
            </Nav.Item>
            <Nav.Item
              onClick={() => {
                navigate("/pending");
              }}
              className="flex items-center gap-1"
              icon={<MdPendingActions />}
              eventKey="3"
            >
              Pending
            </Nav.Item>
          </Nav.Menu>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
