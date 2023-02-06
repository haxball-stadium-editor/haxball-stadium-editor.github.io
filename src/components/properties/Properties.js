import React from "react";
import Property from "./Property";

export default function Properties(props) {
  return (
    props.names.map(prop => <Property property={prop} props={props} />)
  )
}