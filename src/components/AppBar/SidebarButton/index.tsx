import { Button, Box } from "@mui/material";
import type { ReactNode } from "react";

type SidebarButtonProps = {
  icon: ReactNode;
  text: string;
  onClick: () => void;
  textColor?: string;
  selected?: boolean;
  highlightColor?: string; 
};

const SidebarButton = ({
  icon,
  text,
  onClick,
  textColor = "#616161",
  selected = false,
  highlightColor = "#1976D2", 
}: SidebarButtonProps) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      backgroundColor: selected ? "rgba(0,0,0,0.08)" : "transparent",
    }}
  >
    <Box
      sx={{
        width: 4,
        height: "100%",
        bgcolor: selected ? highlightColor : "transparent",
      }}
    />
    <Button
      onClick={onClick}
      startIcon={icon}
      disableElevation
      sx={{
        color: textColor,
        textTransform: "none",
        justifyContent: "flex-start",
        width: "100%",
        padding: "12px 16px",
        borderRadius: 0,
        "&:hover": {
          backgroundColor: "rgba(0,0,0,0.04)",
        },
      }}
    >
      {text}
    </Button>
  </Box>
);

export default SidebarButton;
