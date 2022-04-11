// React
import React from "react";
import {useNavigate} from "react-router-dom";

// Layout
import MainLayout from "../../layouts/MainLayout";

// Components
import Header from "../../components/Header";

// Material UI
import Button from "@material-ui/core/Button";

/**
 * Surveys page
 * @returns Surveys
 */
export default function Surveys() {
  const navigate = useNavigate();

  const createSurvey = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("create-survey");
  };

  return (
    <MainLayout>
      <Header title="Surveys" />
      <Button variant="contained" color="primary" onClick={createSurvey}>
        Create Survey
      </Button>
    </MainLayout>
  );
}
