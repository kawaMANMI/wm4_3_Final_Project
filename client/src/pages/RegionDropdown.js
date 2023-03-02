import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

function RegionDropdown(props) {
	return (
		<Dropdown>
			<Dropdown.Toggle variant="primary" id="dropdown-basic">
				{!props.selectedRegion ? "All Regions" : props.selectedRegion}
			</Dropdown.Toggle>
			<Dropdown.Menu>
				<Dropdown.Item onClick={() => props.setSelectedRegion("")}>
					All Regions
				</Dropdown.Item>
				<Dropdown.Item onClick={() => props.setSelectedRegion("London")}>
					London
				</Dropdown.Item>
				<Dropdown.Item onClick={() => props.setSelectedRegion("North West")}>
					North West
				</Dropdown.Item>
				<Dropdown.Item onClick={() => props.setSelectedRegion("West Midlands")}>
					West Midlands
				</Dropdown.Item>
				<Dropdown.Item onClick={() => props.setSelectedRegion("Cape Town")}>
					Cape Town
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default RegionDropdown;
