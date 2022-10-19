import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#F66D6D",
  },
});

function HeartRating({ getRateValue }) {
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

function ReadOnlyHeartRate(rate) {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}>
      <StyledRating
        name="customized-color"
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        value={rate.rate}
        precision={0.5}
        size="large"
        readOnly
      />
    </Box>
  );
}

function ReadOnlyStarRate(rate) {
  return (
    <Rating
      name="read-only"
      value={rate.rate}
      precision={0.5}
      size="large"
      readOnly
    />
  );
}

export { HeartRating, ReadOnlyHeartRate, ReadOnlyStarRate };
