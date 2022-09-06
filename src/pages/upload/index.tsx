import React from "react";
import { NextPage } from "next";
import { UploadPage } from "../../components/pages/upload-page/UploadPage";

const UploadRoute: NextPage = () => {
  return (
    <>
      <UploadPage />
    </>
  );
};

// ts-prune-ignore-next
export default UploadRoute;
