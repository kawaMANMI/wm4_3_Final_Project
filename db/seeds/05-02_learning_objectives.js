/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("learning_objectives").del();
  await knex("learning_objectives").insert([
    {
      id: 1,
      objective: "Understand what 'parent' and 'child' is",
      skill_id: 1,
    },
    { id: 2, objective: "Can create and link a stylesheet", skill_id: 1 },
    {
      id: 3,
      objective: "Understand what semantic tags are and how to use them' is",
      skill_id: 1,
    },
    {
      id: 4,
      objective: "Be able to include a form in a web page",
      skill_id: 1,
    },
    {
      id: 5,
      objective: "Understand what a selector is in CSS",
      skill_id: 1,
    },
    {
      id: 6,
      objective: "Can initialize a repo for a new project",
      skill_id: 2,
    },
    {
      id: 7,
      objective: "Can use a .gitignore file",
      skill_id: 2,
    },
    {
      id: 8,
      objective:
        "Can use the commands git add, git commit and git push correctly",
      skill_id: 2,
    },
    {
      id: 9,
      objective: "Can make a pull request on GitHub",
      skill_id: 2,
    },
    {
      id: 10,
      objective: "Know how to handle a merge conflict",
      skill_id: 2,
    },
    {
      id: 11,
      objective: "Be able to link a Javascript file in your project",
      skill_id: 3,
    },
    { id: 12, objective: "Be able to do a console.log()", skill_id: 3 },
    {
      id: 13,
      objective: "Understand what a console.log is used for",
      skill_id: 3,
    },
    {
      id: 14,
      objective:
        "Understand the different types of data in Javascript e.g. string, integer, etc.",
      skill_id: 3,
    },
    {
      id: 15,
      objective: "Be able to assign a variable with const and let",
      skill_id: 3,
    },
    {
      id: 16,
      objective:
        "Understand the difference between class and functional components",
      skill_id: 4,
    },
    {
      id: 17,
      objective: "Be able to create a React application with create-react-app",
      skill_id: 4,
    },
    {
      id: 18,
      objective:
        "Understand what JSX is and how it's different to HTML and Javascript",
      skill_id: 4,
    },
    {
      id: 19,
      objective: "Be able to apply a class in JSX",
      skill_id: 4,
    },
    {
      id: 20,
      objective: "Be able to pass props",
      skill_id: 4,
    },
    {
      id: 21,
      objective: "Be able to create a basic express server",
      skill_id: 5,
    },
    {
      id: 22,
      objective: "Understand what NPM is and how to use it",
      skill_id: 5,
    },
    {
      id: 23,
      objective: "Be able to install third party libraries with NPM",
      skill_id: 5,
    },
    {
      id: 24,
      objective: "Be able to use express to create a basic API",
      skill_id: 5,
    },
    {
      id: 25,
      objective: "Understand what a CRUD application does",
      skill_id: 5,
    },
    {
      id: 26,
      objective: "Understand what SQL is and what it is used for",
      skill_id: 6,
    },
    {
      id: 27,
      objective: "Understand what table, rows and columns refer to",
      skill_id: 6,
    },
    {
      id: 28,
      objective: "Be able to create a database",
      skill_id: 6,
    },
    {
      id: 29,
      objective: "Be able to create a table",
      skill_id: 6,
    },
    {
      id: 30,
      objective: "Be able to insert data into a table",
      skill_id: 6,
    },
  ]);
};
