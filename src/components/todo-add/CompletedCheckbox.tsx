import React from "react";

interface CompletedProps {
    isCompleted: boolean;
    setCompleted: (checked: boolean) => void;
    label: string;
}

const CompleteCheckbox: React.FC<CompletedProps> = ({ isCompleted, setCompleted, label }) => {
    return (
        <div className="form-control">
            <label className="label cursor-pointer">
                <span className="label-text">{label}</span>
                <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={isCompleted}
                    onChange={(e) => setCompleted(e.target.checked)}
                />
            </label>
        </div>
    );
};

export default CompleteCheckbox;
