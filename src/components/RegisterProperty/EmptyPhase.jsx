import { Divider } from "antd";
import React from "react";

const EmptyPhase = () => {
  return (
    <>
      <div className="EmptyPhase">
        <p>담당자가 아직 계약서를 업로드 하지 않았습니다.</p>
        <p>조금만 기다려 주세요!</p>
      </div>
      <Divider />
    </>
  );
};

export default EmptyPhase;
