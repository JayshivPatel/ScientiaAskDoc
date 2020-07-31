import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./style.scss";
import { faBookOpen, faEllipsisH, faCalendarWeek, faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BottomBar: React.FC = () => {
    return (
        <Navbar className="bottom-bar footer">
            <ButtonGroup
                aria-label="Basic example"
                className="bottom-bar-buttons"
            >
                <Button active className="button-active" id="bottom-courses">
                    <div className="button-holder">
                        <FontAwesomeIcon icon={faChalkboardTeacher} size="lg"/>
                    </div>
                </Button>
                <Button className="button-inactive" id="bottom-timetable">
                    <div className="button-holder">
                        <FontAwesomeIcon icon={faCalendarWeek} size="lg"/>
                        </div>
                </Button>
                <Button className="button-inactive" id="bottom-exams">
                    <div className="button-holder">
                        <FontAwesomeIcon icon={faBookOpen} size="lg"/>
                        </div>
                </Button>
                <Button className="button-inactive" id="bottom-other">
                    <div className="button-holder">
                        <FontAwesomeIcon icon={faEllipsisH} size="lg"/>
                        </div>
                </Button>
            </ButtonGroup>
        </Navbar>
    );
};

export default BottomBar;
