import React from "react";
import "./Criteria.scss";
function Criteria() {
  interface IProps {
    title: string;
    criteria: string[];
  }
  const props: IProps = {
    title: "All Categories",
    criteria: ["New Arrivals", "Featured", "Best Sellers"],
  };

  return (
    <>
      <div className="filter">
        <div className="filter__container">
          <h3 className="filter__title">All Category</h3>
          <div className="filter__criteria">
          {props.criteria.map((criteria: string) => {
            return <p className="filter__criterion">{criteria}</p>;
          })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Criteria;
