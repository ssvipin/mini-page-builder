import { useEffect, useState } from "react";
import BlocksList from "./BlocksList";
import DropArea from "./DropArea";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
function App() {
  const [elementList, setElementList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [labelName, setLabelName] = useState("Text");
  const [placeholderText, setPlaceholderText] = useState("Placeholder");
  const [buttonText, setButtonText] = useState("Button");
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [fontWeight, setFontWeight] = useState("");
  const [selectedElement, setSelectedElement] = useState("");
  const [isUpdating, setIsupdating] = useState();
  useEffect(() => {
    let elements = JSON.parse(localStorage.getItem("element"));
    setElementList(elements);
  }, []);
  const handleDrop = (event) => {
    if (selectedElement) {
      const { offsetX, offsetY } = event.nativeEvent;
      setXAxis(offsetX);
      setYAxis(offsetY);
      setModalOpen(true);
      event.stopPropagation();
      event.preventDefault();
    }
  };
  const handleDragStart = (event, elementType, element = {}) => {
    if (element && Object.keys(element).length > 0) {
      setIsupdating(element);
      setLabelName(element?.name);
      setXAxis(element?.x);
      setYAxis(element?.y);
      setFontSize(element?.fontSize);
      setFontWeight(element?.fontWeight);
      setPlaceholderText(element?.placeholder);
      setButtonText(element?.button);
      setSelectedElement(elementType);
    } else {
      setSelectedElement(elementType);
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleModalSubmit = () => {
    let newElement = {};
    if (isUpdating && Object.keys(isUpdating).length > 0) {
      newElement.name = labelName;
      newElement.x = xAxis;
      newElement.id = isUpdating.id;
      newElement.y = yAxis;
      newElement.fontSize = fontSize;
      newElement.fontWeight = fontWeight;
      newElement.type = selectedElement;
      newElement.placeholder = placeholderText;
      newElement.button = buttonText;
      let allElements = elementList ?? [];
      for (let i = 0; i <= allElements.length; i++) {
        if (newElement.id === allElements[i].id) {
          allElements[i] = newElement;
          break;
        }
      }
      setElementList(allElements);
      localStorage.setItem("element", JSON.stringify(allElements));
    } else {
      newElement.name = labelName;
      newElement.id = Date.now();
      newElement.x = xAxis;
      newElement.y = yAxis;
      newElement.fontSize = fontSize;
      newElement.fontWeight = fontWeight;
      newElement.type = selectedElement;
      newElement.button = buttonText;
      newElement.placeholder = placeholderText;
      if (elementList && elementList.length > 0) {
        setElementList([...elementList, newElement]);
        localStorage.setItem(
          "element",
          JSON.stringify([...elementList, newElement])
        );
      } else {
        setElementList([newElement]);
        localStorage.setItem("element", JSON.stringify([newElement]));
      }
    }
    setIsupdating({});
    setModalOpen(false);
  };

  document.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      if (isUpdating) {
        setLabelName(isUpdating.name);
        setXAxis(isUpdating.x);
        setYAxis(isUpdating.y);
        setFontSize(isUpdating.fontSize);
        setFontWeight(isUpdating.fontWeight);
        setModalOpen(true);
        setPlaceholderText(isUpdating.placeholder);
        setButtonText(isUpdating.button);
        setSelectedElement(isUpdating.type);
      }
    }
  });
  return (
    <div className="app">
      <header className="App-header">
        <DropArea
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          elementList={elementList}
          handleDragStart={handleDragStart}
          setIsupdating={setIsupdating}
          isUpdating={isUpdating}
        />
        <BlocksList handleDragStart={handleDragStart} />
        <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
          <DialogTitle>Set Element Properties</DialogTitle>
          <DialogContent>
            {selectedElement && (
              <div>
                <TextField
                  label={
                    selectedElement === "Label"
                      ? "Text"
                      : selectedElement === "Input"
                      ? "Placeholder Text"
                      : "Button Text"
                  }
                  variant="outlined"
                  value={
                    selectedElement === "Input"
                      ? placeholderText
                      : selectedElement === "Button"
                      ? buttonText
                      : labelName
                  }
                  onChange={(e) => {
                    if (selectedElement === "Label") {
                      setLabelName(e.target.value);
                    } else if (selectedElement === "Input") {
                      setPlaceholderText(e.target.value);
                    } else if (selectedElement === "Button") {
                      setButtonText(e.target.value);
                    }
                  }}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="X Axis"
                  variant="outlined"
                  value={xAxis}
                  onChange={(e) => setXAxis(e.target.value)}
                  fullWidth
                  margin="normal"
                  type="number"
                />
                <TextField
                  label="Y Axis"
                  variant="outlined"
                  value={yAxis}
                  onChange={(e) => setYAxis(e.target.value)}
                  fullWidth
                  margin="normal"
                  type="number"
                />
                <TextField
                  label="Font Size"
                  variant="outlined"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  fullWidth
                  margin="normal"
                  type="number"
                />
                <TextField
                  label="Font Weight"
                  variant="outlined"
                  value={fontWeight}
                  onChange={(e) => setFontWeight(e.target.value)}
                  fullWidth
                  margin="normal"
                  type="number"
                />
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </header>
    </div>
  );
}

export default App;
