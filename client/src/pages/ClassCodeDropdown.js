import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

function ClassCodeDropdown({
	selectedClassCode,
	setSelectedClassCode,
	myClassDarkMode,
}) {
	return (
		<div>
			<Dropdown>
				<Dropdown.Toggle variant="danger" id="dropdown-basic">
					{selectedClassCode ? selectedClassCode : "All Classes"}
				</Dropdown.Toggle>
				<Dropdown.Menu className={myClassDarkMode}>
					<Dropdown.Item onClick={() => setSelectedClassCode("WM3")}>
						WM3
					</Dropdown.Item>
					<Dropdown.Item onClick={() => setSelectedClassCode("WM4")}>
						WM4
					</Dropdown.Item>
					<Dropdown.Item onClick={() => setSelectedClassCode("NW5")}>
						NW5
					</Dropdown.Item>
					<Dropdown.Item onClick={() => setSelectedClassCode("ND3")}>
						ND3
					</Dropdown.Item>
					<Dropdown.Item onClick={() => setSelectedClassCode("NW2")}>
						NW2
					</Dropdown.Item>
					<Dropdown.Item onClick={() => setSelectedClassCode("LON3")}>
						LON3
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
}

export default ClassCodeDropdown;
