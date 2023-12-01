import React from "react";
import { Typography, TextField, Button } from "@mui/material";
const DropArea = ({
  handleDrop,
  handleDragOver,
  elementList,
  handleDragStart,
  setIsupdating,
  isUpdating,
}) => {
  console.log("vipin", elementList);
  const renderDroppedElements = () => {
    return (
      elementList &&
      elementList?.length &&
      elementList?.map((el, index) => (
        <div
          key={el.id}
          className="dropped-element"
          style={{
            position: "absolute",
            left: el.x + "px",
            top: el.y + "px",
          }}
        >
          {el.type === "Label" ? (
            <Typography
              style={{
                fontSize: el.fontSize ? el.fontSize + "px" : "inherit",
                fontWeight: el.fontWeight ? el.fontWeight : "normal",
                border: isUpdating?.id === el?.id ? "1px solid red" : "none",
              }}
              draggable={true}
              onClick={() => {
                setIsupdating(el);
              }}
              onDragStart={(event) => handleDragStart(event, "Label", el)}
            >
              {el.name}
            </Typography>
          ) : el.type === "Input" ? (
            <TextField
              label={el.placeholder}
              variant="outlined"
              style={{
                border: isUpdating?.id === el?.id ? "1px solid red" : "none",
              }}
              onClick={() => {
                setIsupdating(el);
              }}
              draggable={true}
              onDragStart={(event) => handleDragStart(event, "Input", el)}
            />
          ) : (
            <Button
              variant="contained"
              style={{
                border: isUpdating?.id === el?.id ? "1px solid red" : "none",
              }}
              onClick={() => {
                setIsupdating(el);
              }}
              draggable={true}
              onDragStart={(event) => handleDragStart(event, "Button", el)}
            >
              {el.button}
            </Button>
          )}
        </div>
      ))
    );
  };
  return (
    <div
      style={{
        width: "calc(100% - 23%)",
        height: "100%",
        position: "absolute",
        left: "0",
        background: "#f2f2f2",
      }}
    >
      <div>
        <h1
          style={{
            padding: "0",
            margin: "0",
            textAlign: "center",
            height: "40px",
          }}
        >
          Drop Area
        </h1>
      </div>
      <div
        style={{
          //   background: "green",
          height: "calc(100% - 40px)",
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {renderDroppedElements()}
      </div>
    </div>
  );
};

export default DropArea;
