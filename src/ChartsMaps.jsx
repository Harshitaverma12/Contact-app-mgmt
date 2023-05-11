import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import { PieChart, Pie, Cell, Legend } from "recharts";

function ChartsMaps() {
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://disease.sh/v3/covid-19/all");
      const data = [
        { name: "Active", value: response.data.active },
        { name: "Recovered", value: response.data.recovered },
        { name: "Deaths", value: response.data.deaths },
      ];
      setPieData(data);
    };

    fetchData();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://disease.sh/v3/covid-19/countries"
      );
      setData(response.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <MapContainer center={[0, 0]} zoom={2} style={{ height: "100vh" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {data.map((country) => (
          <Marker
            key={country.country}
            position={[country.countryInfo.lat, country.countryInfo.long]}
          >
            <Popup>
              <div>
                <h3>{country.country}</h3>
                <p>Total cases: {country.cases}</p>
                <p>Total recovered: {country.recovered}</p>
                <p>Total deaths: {country.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div style={{ marginTop: "118rem" }}>
        <h2>Pie Chart</h2>
        <PieChart width={400} height={400}>
          <Legend />
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
    </>
  );
}

export default ChartsMaps;
