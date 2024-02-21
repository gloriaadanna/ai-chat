import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import Modal from 'react-modal';
import { saveAs } from 'file-saver';
import { Divider } from '@mui/material';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';

export default function PromptCard({ prompt, result }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  let facebookShareUrl = "";
  let twitterShareUrl = "";
  let linkedinShareUrl = "";

  const savePrompt = () => {
    var promptMessage =`<h2>${prompt}</h2>`;
    var resultMessage =`<div><h3>${result}</h3></div>`;
    var blob = new Blob([promptMessage, resultMessage], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "prompt.html");
  };


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
        <IconButton onClick={() => setModalIsOpen(true)} aria-label="share" sx={{ marginLeft: "auto" }}>
          <ShareOutlinedIcon />
        </IconButton>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Example Modal"
          style={{
            content: {
              top: '20%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              transform: 'translate(-50%, -50%)',
            },
          }}
        >
          <h2>Share this prompt</h2>
          <h3>{prompt}</h3>
          <div style={buttonContainerStyle}>
            <FacebookShareButton url={facebookShareUrl}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <TwitterShareButton url={twitterShareUrl}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>
            <LinkedinShareButton url={linkedinShareUrl}>
              <LinkedinIcon size={40} round />
            </LinkedinShareButton>
          </div>
          <button onClick={() => setModalIsOpen(false)}>close</button>
        </Modal>
        <IconButton onClick={savePrompt} aria-label="download" >
          <LocalPrintshopOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>

  );
}

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  margin: '20px 0',
};