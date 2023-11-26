import React, { useState } from "react";

import { IconButton, Tooltip, Menu, MenuItem, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import SmsIcon from "@mui/icons-material/Sms";
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

const ShareOptions = ({ url, title }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const smsHref = `sms:?&body=${encodeURIComponent(title + " " + url)}`;
  const iconSize = 24;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="Share">
        <IconButton onClick={handleClick} aria-label="share">
          <ShareIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleClose}>
          <WhatsappShareButton
            url={url}
            title={title}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <WhatsappIcon
              size={iconSize}
              round
              style={{ marginRight: "5px" }}
            />
            <Typography key={url} variant="body2" color="text.secondary">
              Whatsapp
            </Typography>
          </WhatsappShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <IconButton
            component="a"
            href={smsHref}
            aria-label="share via sms"
            sx={{
              padding: 0,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <SmsIcon size={iconSize} style={{ marginRight: "5px" }} />
            <Typography variant="body2" color="text.secondary">
              SMS
            </Typography>
          </IconButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <TelegramShareButton
            url={url}
            quote={title}
            style={{ display: "flex", alignItems: "center", width: "100%" }}
          >
            <TelegramIcon
              size={iconSize}
              round
              style={{ marginRight: "5px" }}
            />
            <Typography key={url} variant="body2" color="text.secondary">
              Telegram
            </Typography>
          </TelegramShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <FacebookShareButton
            url={url}
            quote={title}
            style={{ display: "flex", alignItems: "center", width: "100%" }}
          >
            <FacebookIcon
              size={iconSize}
              round
              style={{ marginRight: "5px" }}
            />
            <Typography key={url} variant="body2" color="text.secondary">
              Facebook
            </Typography>
          </FacebookShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <TwitterShareButton
            url={url}
            title={title}
            style={{ display: "flex", alignItems: "center", width: "100%" }}
          >
            <XIcon size={iconSize} round style={{ marginRight: "5px" }} />
            <Typography key={url} variant="body2" color="text.secondary">
              X (Twitter)
            </Typography>
          </TwitterShareButton>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ShareOptions;
