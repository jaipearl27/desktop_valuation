import { Dialog, DialogContent, IconButton } from '@mui/material'
import React from 'react'
import Pricing from '../Pricing'
import { IoMdClose } from "react-icons/io";


function SubscriptionModal({ handleClose, open }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "100%",  // Set your width here
                    },
                },
            }}
        >
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <IoMdClose />
            </IconButton>
            <DialogContent>
                <Pricing showSectionTitle={false} onCloseModal={handleClose} />
            </DialogContent>
        </Dialog>
    )
}

export default SubscriptionModal