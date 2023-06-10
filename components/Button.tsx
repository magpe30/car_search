import Image from 'next/image';

import { ButtonProps } from '@types';

const Button = ({ isDisabled, type, containerStyles, textStyles, title, rightIcon, handleClick }: ButtonProps) => {
    return (
        <button
            disabled={isDisabled}
            type={type || "button"}
            className={`custom-btn ${containerStyles}`}
            onClick={handleClick}
        >
            <span className={`flex-1 ${textStyles}`}>{title}</span>
            {rightIcon && (
                <div className="relative w-6 h-6">
                    <Image
                        src={rightIcon}
                        alt="arrow_left"
                        fill
                        className="object-contain"
                    />
                </div>
            )}

        </button>
    )
};

export default Button;
