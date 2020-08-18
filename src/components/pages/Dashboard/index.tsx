import React from "react";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PersonCard from "components/atoms/PersonCard";
import DashboardButtonGroup from "components/molecules/DashboardButtonGroup";
import TutorCardGroup from "components/molecules/TutorCardGroup";
import NoticeBoard from "components/organisms/NoticeBoard";

const Dashboard: React.FC = () => {
  return (
    <>
      <MyBreadcrumbs />
      <PersonCard />
      <DashboardButtonGroup loginShort="br819"/>
      <Row>
        <Col xs={12} sm={12} md={12} lg={6} style={{ marginTop: "30px", paddingRight: "10px", paddingLeft: "10px"}}>
          <TutorCardGroup />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} style={{ marginTop: "30px", paddingRight: "10px", paddingLeft: "10px"}}>
          <NoticeBoard />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
