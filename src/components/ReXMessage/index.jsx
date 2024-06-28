import { Typography, Grid } from "@mui/material";
import ChatStyles from "../../styles/chat";

const ReXMessage = ({ reXMessage }) => {
  return (
    <Grid { ...ChatStyles.reXMessage }>
      <Typography { ...ChatStyles.reXMessageText }>
        {reXMessage}
      </Typography>
    </Grid>
  );
};

export default ReXMessage;
