import React, { useEffect, useState } from "react";

const BlocksList = ({ handleDragStart }) => {
  const [sideComponents, setSideComponents] = useState([]);
  const sideComponentsJson = [
    {
      name: "Label",
      type: "Label",
    },
    {
      name: "Input",
      type: "Input",
    },
    {
      name: "Button",
      type: "Button",
    },
  ];
  useEffect(() => {
    // imagine the data being set to setSideComponents is coming from an api end point
   
    setSideComponents(sideComponentsJson);
  }, []);

  return (
    <aside
      style={{
        width: "23%",
        height: "100%",
        position: "absolute",
        right: "0",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#2D2D2D",
        }}
      >
        <div
          style={{
            padding: "16px 23px",
          }}
        >
          <h1
            style={{
              color: "#fff",
              margin: "0",
              display: "inline",
              fontFamily: "open sans",
              fontWeight: "700",
              fontSize: "20px",
              lineHeight: "27.24px",
            }}
          >
            Blocks
          </h1>
        </div>
        <div
          style={{
            height: "86%",
            padding: "0 23px",
          }}
        >
          {sideComponents?.length > 0 &&
            sideComponents?.map((item, index) => {
              return (
                <li
                  key={index}
                  style={{
                    background: "#fff",
                    listStyleType: "none",
                    height: "49px",
                    boxSizing: "border-box",
                    padding: "16px 32px",
                    margin: "8px 0",
                    borderRadius: "4px",
                  }}
                  draggable={true}
                  onDragStart={(event) => handleDragStart(event, item.type)}
                >
                  {item.name}
                </li>
              );
            })}
        </div>
      </div>
    </aside>
  );
};

export default BlocksList;
