import React from "react";
import "./Loader.css";
import { useLoading } from "../../Hooks/useLoading";
export default function Loader() {
  const { isLoading } = useLoading();
  if (!isLoading) return;
  return (
    <div class="wrapper">
      <div class="box-wrap">
        <div class="box one"></div>
        <div class="box two"></div>
        <div class="box three"></div>
        <div class="box four"></div>
        <div class="box five"></div>
        <div class="box six"></div>
      </div>
    </div>
  );
}
