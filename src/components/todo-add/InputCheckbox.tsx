import React from "react";

interface InputCheckboxProps {
    isChecked: boolean;
    setChecked: (checked: boolean) => void;
    label: string;
}

const InputCheckbox: React.FC<InputCheckboxProps> = ({ isChecked, setChecked, label }) => {
    return (
        <div className="form-control">
            <label className="label cursor-pointer">
                <span className="label-text">{label}</span>
                <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={isChecked}
                    onChange={(e) => setChecked(e.target.checked)}
                />
            </label>
        </div>
    );
};

export default InputCheckbox;
