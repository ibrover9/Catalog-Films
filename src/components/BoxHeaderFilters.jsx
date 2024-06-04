import { Box, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
// import { useTasksDispatch } from "./FiltersReducer";
import { useDispatch } from "react-redux";
import { filtersReduce } from "../store/filterReducer";

export default function BoxHeaderFilters() {
  const dispatch = useDispatch();
  const { CLEAR_FILTER } = filtersReduce.actions;
  function clearFilters() {
    dispatch(CLEAR_FILTER());
  }

  return (
    <>
      <Box
        sx={{
          maxWidth: "300px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 20px 40px 20px",
        }}
      >
        <Box sx={{ cursor: "pointer", fontSize: "20px" }}>Фильтры</Box>
        <Box
          onClick={clearFilters}
          sx={{ cursor: "pointer", padding: "5px 0 0 20px" }}
        >
          <Button
            sx={{
              color: "black",
              padding: "10px",
              margin: 0,
              minWidth: "44px",
              minHeight: "44px",
              width: "24px",
              height: "24px",
              "& .MuiButton-label": {
                padding: "10px",
                margin: "10px",
              },
              "& svg": {
                width: "100%",
                height: "100%",
              },
            }}
          >
            <ClearIcon />
          </Button>
        </Box>
      </Box>
    </>
  );
}
