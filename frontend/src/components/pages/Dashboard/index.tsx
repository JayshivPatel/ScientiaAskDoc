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
      <DashboardButtonGroup />
      <Row style={{ marginTop: "30px" }}>
        <Col>
          <TutorCardGroup />
        </Col>
        <Col>
          <NoticeBoard />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
