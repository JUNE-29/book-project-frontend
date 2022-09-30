import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";
import { ConstructionOutlined } from "@mui/icons-material";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#F66D6D",
  },
});

export default function HeartRating({ getRateValue }) {
  const [heartValue, setheartValue] = React.useState(0);
  getRateValue(heartValue);
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}>
      <Typography component="legend"></Typography>
      <StyledRating
        name="customized-color"
        defaultValue={0}
        getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        value={heartValue}
        onChange={(event, newHeartValue) => {
          setheartValue(newHeartValue);
        }}
        size="large"
      />
    </Box>
  );
}
