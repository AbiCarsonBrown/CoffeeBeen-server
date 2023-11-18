exports.seed = async function (knex) {
  await knex("user").del();
  await knex("user").insert([
    {
      id: 1,
      full_name: "John Doe",
      username: "johndoe123",
      email: "johndoe123@email.com",
      password: "Password123!",
    },
    {
      id: 2,
      full_name: "Jane Smith",
      username: "janesmith456",
      email: "janesmith456@email.com",
      password: "TestPass456!",
    },
    {
      id: 3,
      full_name: "Alex Johnson",
      username: "alexj89",
      email: "alexj89@email.com",
      password: "SecurePass!",
    },
    {
      id: 4,
      full_name: "Emily Davis",
      username: "emily_davis",
      email: "emily.davis@email.com",
      password: "Pass123word!",
    },
    {
      id: 5,
      full_name: "Robert Miller",
      username: "robmiller77",
      email: "robmiller77@email.com",
      password: "MyPassWord123!",
    },
  ]);
};
