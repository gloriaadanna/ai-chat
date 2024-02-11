import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { Divider } from '@mui/material';

export default function PromptCard({ prompt, result }) {  
  return (
    <Card sx={{ my: 2 }}>
      <CardHeader
        title={prompt}
        sx={{ mx: 2, my: 1 }}
      />
      <CardContent sx={{ mx: 2, my: 1 }}>
        <Typography variant="body1" color="text.secondary">
         {result}
        </Typography>
      </CardContent>
        <Divider />
      <CardActions disableSpacing>
        <IconButton aria-label="share" sx={{ marginLeft: "auto" }}>
          <ShareOutlinedIcon />
        </IconButton>
        <IconButton aria-label="download" >
          <LocalPrintshopOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
   
  );
}