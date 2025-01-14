"use client";
import { Button, Fade, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

const Dropdown = ({ data, setShowMobDropdown }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="z-[9999]">
      <div
        className="relative flex py-2 text-base font-semibold text-black hover:text-mainColor max-[600px]:ml-[16px] lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
        onClick={handleClick}
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <span className="flex justify-end gap-1">
          <span className="flex flex-col justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>

          {data.title}
        </span>
      </div>

      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {data?.dropdown.map((item, idx) => (
          <Link href={item.path}>
            <MenuItem onClick={handleClose}>{item.title}</MenuItem>
          </Link>
        ))}
      </Menu>
    </div>
  );
};

export default Dropdown;
