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
  ]);
};
