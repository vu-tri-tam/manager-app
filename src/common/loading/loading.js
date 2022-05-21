import React from "react";
import ReactLoading from "react-loading";
// import { Section, Title, Article, Prop, list } from "./generic";
import "./loading.css";

const Example = ({ width, height, color, className }) => (
    // <div className="container-loading">
    <ReactLoading type={"bars"} color={color} width={width} height={height} className={className || ''} />

    // </div>

);

export default Example;
