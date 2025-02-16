import React, { useEffect, useState } from 'react';
import "../styles/Alert.css";

function Alert({ alert }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (alert) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const capitalize = (word) => {
        if (word === "danger") {
            word = "error";
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    };

    return (
        <div className={`alert-container ${visible ? "show" : "hide"}`}>
            {alert && (
                <div className={`alert-box alert-${alert.type}`}>
                    <strong>{capitalize(alert.type)}</strong>: {alert.msg}
                </div>
            )}
        </div>
    );
}

export default Alert;
