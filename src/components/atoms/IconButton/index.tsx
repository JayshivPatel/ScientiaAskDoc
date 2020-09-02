import React from "react";
import styles from "./style.module.scss";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface IconButtonProps {
    buttonProps: any;
    onClick: any;
    icon: IconDefinition;
}

const IconButton: React.FC<IconButtonProps> = ({
    buttonProps,
    onClick,
    icon
}) => {
    return (
        <Button
            {...buttonProps}
            variant="secondary"
            className={styles.sectionHeaderButton}
            onClick={onClick}
        >
            <FontAwesomeIcon
                className={styles.buttonIcon}
                icon={icon}
            />
        </Button>
    );
};


export default IconButton;