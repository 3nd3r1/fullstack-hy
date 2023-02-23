import React from "react";

const Notification = ({ notification }) => {
    if (notification === null) {
        return;
    }
    return (
        <div
            className={`alert alert-${notification.type} fade show w-25 m-auto mb-4`}
            role="alert"
        >
            <strong>{notification.text}</strong>
        </div>
    );
};

export default Notification;
