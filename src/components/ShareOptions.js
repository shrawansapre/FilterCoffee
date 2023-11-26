import React, { useState } from "react";
import { IconButton, Tooltip, Menu, MenuItem, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  XIcon,
  WhatsappIcon,
  TelegramIcon,
  TelegramShareButton,
} from "react-share";

import MessageIcon from "@mui/icons-material/Message";

const ShareOptions = ({ url, title }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const smsHref = `sms:?&body=${encodeURIComponent(title + " " + url)}`;

  // size for the icons
  const iconSize = 24;

  return (
    <div>
      <Tooltip title="Share">
        <IconButton onClick={handleClick} aria-label="share">
          <ShareIcon />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}  getContentAnchorEl={null}>
        <MenuItem onClick={handleClose}>
          <WhatsappShareButton url={url} title={title}>
            <WhatsappIcon
              size={iconSize}
              round
              style={{ marginRight: "5px" }}
            />
          </WhatsappShareButton>
          <Typography key={url} variant="body2" color="text.secondary">
            Whatsapp
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <IconButton
            component="a"
            href={smsHref}
            aria-label="share via sms"
            style={{ marginRight: "5px", padding: 0 }}
          >
            <MessageIcon size={iconSize} />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            SMS
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <TelegramShareButton url={url} quote={title}>
            <TelegramIcon
              size={iconSize}
              round
              style={{ marginRight: "5px" }}
            />
          </TelegramShareButton>
          <Typography key={url} variant="body2" color="text.secondary">
            Telegram
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <FacebookShareButton url={url} quote={title}>
            <FacebookIcon
              size={iconSize}
              round
              style={{ marginRight: "5px" }}
            />
          </FacebookShareButton>
          <Typography key={url} variant="body2" color="text.secondary">
            Facebook
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <TwitterShareButton url={url} title={title}>
            <XIcon size={iconSize} round style={{ marginRight: "5px" }} />
          </TwitterShareButton>
          <Typography key={url} variant="body2" color="text.secondary">
            {" "}
            X (Twitter)
          </Typography>
        </MenuItem>
        {/* Add more sharing options here */}
      </Menu>
    </div>
  );
};

export default ShareOptions;
