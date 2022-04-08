// React
import React from "react";

// Layout
import MainLayout from "../layouts/MainLayout";

// Components
import Header from "../components/Header";

/**
 * A web page for payment management.
 * @returns Payment page view.
 */
export default function Payment() {
  return (
    <MainLayout>
      <Header title="Make a Payment"/>
    </MainLayout>
  );
}
