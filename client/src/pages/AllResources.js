import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Card, Col, Collapse } from "react-bootstrap";
import skills from "./Skill.json";
import "./AllResources.css";

function AllResources({ myClassDarkMode }) {
	const [openCollapseId, setOpenCollapseId] = useState("");

	const handleCardClick = (id) => {
		setOpenCollapseId(openCollapseId === id ? "" : id);
	};

	return (
		<Card
			style={{
				marginTop: "30px",
				marginBottom: "20px",
				boxShadow: "1px 3px 3px #888888",
			}}
			className={myClassDarkMode}
		>
			<Card.Header
				className={"card-header "}
				as="h4"
				style={{
					textAlign: "center",
				}}
			>
				More Resources and Assessment
			</Card.Header>
			<Card.Body className={myClassDarkMode} style={{ padding: "20px" }}>
				<Row className="g-4 mt-2 mb-2">
					{skills.map((skill) => (
						<Col
							sm={5}
							md={6}
							lg={4}
							key={skill.id}
							className="d-flex justify-content-center"
						>
							<Card
								border="light"
								className={`card-with-fixed-height ${myClassDarkMode}`}
							>
								<Card.Img
									variant="top"
									src={skill.url}
									alt={`${skill.title}image`}
									crossOrigin="anonymous"
									onClick={() => handleCardClick(skill.id)}
									aria-controls={skill.id}
									aria-expanded={openCollapseId === skill.id}
								/>
								<Collapse in={openCollapseId === skill.id}>
									<div id={skill.id}>
										<div className="d-flex justify-content-around mb-2 mt-2">
											<Link
												to={`/more-resources/${skill.title}/${skill.id}`}
												style={{ color: "#DC143C", fontSize: "1.2rem" }}
											>
												Resources
											</Link>
											<Link
												to={`/assessment/${skill.title}/${skill.id}`}
												style={{ color: "#DC143C", fontSize: "1.2rem" }}
											>
												Assessment
											</Link>
										</div>
									</div>
								</Collapse>
							</Card>
						</Col>
					))}
				</Row>
			</Card.Body>
		</Card>
	);
}
export default AllResources;
