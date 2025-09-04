import { useEffect } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PropTypes } from 'prop-types';

function ShowMessage({ message }) {
    useEffect(() => {
        // Show toast when component mounts
        toast.info(message, {
            autoClose: 3000, // Close after 3 seconds
            position: toast.POSITION.BOTTOM_RIGHT, // Position the toast
            closeButton: false, // Don't show a close button
            className: 'toast-background', // Add custom class for styling
        });

        // Clean up function
        return () => {
            // You can add cleanup code here if necessary
        };
    }, [message]);

    return null;
}

ShowMessage.propTypes = {
    message: PropTypes.string.isRequired,
}

export default ShowMessage;
