import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { getProducts } from "../core/helper/coreapicalls";

const Charts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  //   const [stock, setStock] = useState(0);

  const [reload, setReload] = useState("");
  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  //   const loadValues = () => {
  //     let stock = 0;
  //     let sold = 0;
  //     products.map((prod) => {
  //       stock = stock + prod.stock;
  //       sold = sold + prod.sold;
  //     });
  //     return [stock, sold];
  //   };
  //   const [stock, sold] = loadValues(products);

  const loadChart = () => {
    console.log(products);
  };

  return (
    <div style={{ background: "#eaf0f1" }}>
      {products.map((prod, key) => {
        return (
          <div key={key} className="chart">
            <Chart
              className="chartdiv"
              width={"400px"}
              height={"200px"}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["Sales", `${prod.name}`],
                ["Sold", prod.sold],
                ["In-Stock", prod.stock],
              ]}
              options={{
                title: `${prod.name}`,
                // Just add this option
                is3D: true,
              }}
              rootProps={{ "data-testid": "2" }}
            />
          </div>
        );
      })}
    </div>
  );
};
export default Charts;
