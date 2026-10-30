
import React from "react";

function StatCard({ title, value, icon, subtitle }) {
    return (
        <div className="stat-card">
            <div className="stat-card-top">
                <p>{title}</p>
                <div className="stat-icon">
                    {icon}
                </div>
            </div>

            <h2>{value}</h2>
            <small>{subtitle}</small>
        </div>
    );
}

export default StatCard;
