import React from "react";
import {
  AccountData,
  ContractData,
  ContractForm,
} from "drizzle-react-components";

const MyComponent = ({ accounts, Scholarships }) => {

  console.log(accounts);
  console.log(Scholarships);
  console.log(Scholarships.scholarshipCount())
  return (
    <div>
      <p>Hey</p>
    </div>
  )

}

export default MyComponent;