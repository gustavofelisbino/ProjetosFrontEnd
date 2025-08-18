import React, { useState } from "react";
import { Box, Slide } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupsIcon from '@mui/icons-material/Groups';
import SidebarButton from "../SidebarButton";
import { useNavigate } from "react-router-dom";

type SidebarUnderHeaderProps = {
  open: boolean;
  onClose: () => void;
  headerHeight?: number; 
};

const SidebarUnderHeader: React.FC<SidebarUnderHeaderProps> = ({
  open,
  onClose,
  headerHeight = 64,
}) => {
  const [selected, setSelected] = useState("Inicio");

  const handleSelect = (label: string) => {
    setSelected(label);
    onClose();
  };

  const navigate = useNavigate();

  return (
    <Slide direction="right" in={open} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: "fixed",
          top: `${headerHeight}px`,
          left: 0,
          width: 240,
          height: `calc(100% - ${headerHeight}px)`,
          bgcolor: "#EEEEEE",
          zIndex: 1200,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SidebarButton 
          icon={<img src={"InicioIcon"} />} 
          text="Inicio"
          onClick={() => {
            handleSelect("Inicio");
            navigate("/");
          }}
          selected={selected === "Inicio"}
          highlightColor="#9C27B0"
        />
        <SidebarButton
          icon={<AssignmentIcon sx={{ color: "#EF6C00" }} />}
          text="Frutas"
          onClick={() => {
            handleSelect("Frutas");
            navigate("/frutas");
          }}
          selected={selected === "Frutas"}
          highlightColor="#EF6C00"
        />
        <SidebarButton
          icon={<GroupsIcon sx={{ color: "#0277BD" }} />}
          text="Carrinho"
          onClick={() => {
            handleSelect("Carrinho");
            navigate("/carrinho");
          }}
          selected={selected === "Carrinho"}
          highlightColor="#0277BD"
        />
      </Box>
    </Slide>
  );
};

export default SidebarUnderHeader;
