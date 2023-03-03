import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

function ClassCodeDropdown(props) {
	return (
		<div>
			<Dropdown>
				<Dropdown.Toggle id="dropdown-basic">
					{props.selectedClassCode ? props.selectedClassCode : "All Classes"}
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item onClick={() => props.setSelectedClassCode("WM3")}>
						WM3
					</Dropdown.Item>
					<Dropdown.Item onClick={() => props.setSelectedClassCode("WM4")}>
						WM4
					</Dropdown.Item>
					<Dropdown.Item onClick={() => props.setSelectedClassCode("NW5")}>
						NW5
					</Dropdown.Item>
					<Dropdown.Item onClick={() => props.setSelectedClassCode("ND3")}>
						ND3
					</Dropdown.Item>
					<Dropdown.Item onClick={() => props.setSelectedClassCode("NW2")}>
						NW2
					</Dropdown.Item>
					<Dropdown.Item onClick={() => props.setSelectedClassCode("LON3")}>
						LON3
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
}

export default ClassCodeDropdown;
