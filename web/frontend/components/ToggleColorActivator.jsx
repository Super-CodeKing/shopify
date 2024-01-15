import React from 'react';

const ToggleColorActivator = ({ toggleColourFunction, color }) => {
    return (
        <div
            onClick={toggleColourFunction}
            style={{
                backgroundColor: color ?? "#F8F2F2",
                width: "22px",
                height: "22px",
                cursor: "pointer",
                border: "1px solid #ccc",
                borderRadius: "5px",
            }}
        ></div>
    );
};

export default ToggleColorActivator;
