import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

function RegionDropdown({ selectedRegion, setSelectedRegion }) {
	return (
		<Dropdown>
			<Dropdown.Toggle id="dropdown-basic">
				{!setSelectedRegion ? "All Regions" : selectedRegion}All regions
			</Dropdown.Toggle>
			<Dropdown.Menu>
				<Dropdown.Item onClick={() => setSelectedRegion("")}>
					All Regions
				</Dropdown.Item>
				<Dropdown.Item onClick={() => setSelectedRegion("London")}>
					London
				</Dropdown.Item>
				<Dropdown.Item onClick={() => setSelectedRegion("North West")}>
					North West
				</Dropdown.Item>
				<Dropdown.Item onClick={() => setSelectedRegion("West Midlands")}>
					West Midlands
				</Dropdown.Item>
				<Dropdown.Item onClick={() => setSelectedRegion("Cape Town")}>
					Cape Town
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default RegionDropdown;
