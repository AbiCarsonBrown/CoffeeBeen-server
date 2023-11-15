exports.seed = async function (knex) {
  await knex("coffeeshop").del();
  await knex("coffeeshop").insert([
    {
      id: 1,
      coffeeshop_name: "Origin Coffee (Charlotte Road)",
      address: "65 Charlotte Rd, London EC2A 3PE",
      latitude: "51.5263879",
      longitude: "-0.1192403",
      description:
        "Hip, minimalist espresso bar specialising in carefully sourced, single origin coffees.",
    },
    {
      id: 2,
      coffeeshop_name: "Kiss the Hippo Coffee Fitzrovia",
      address: "51 Margaret St, London W1W 8SG",
      latitude: "51.5165185",
      longitude: "-0.1464695",
      description:
        "Easygoing coffee shop with an understated interior, serving artisanal brews, cookies & pastries.",
    },
    {
      id: 3,
      coffeeshop_name: "Caravan King's Cross Restaurant",
      address: "1 Granary Square, London N1C 4AA",
      latitude: "51.5239912",
      longitude: "-0.150385",
      description:
        "Industrial chic decor, an upbeat vibe & eclectic global cooking served all day in a hip hub.",
    },
    {
      id: 4,
      coffeeshop_name: "Grind",
      address: "2 London Bridge, London SE1 9RA",
      latitude: "51.5066218",
      longitude: "-0.0911243",
      description:
        "Industrial venue with exposed bricks, for house-blend coffees, plus brunches and sharing plates.",
    },
    {
      id: 5,
      coffeeshop_name: "WatchHouse Seven Dials",
      address: "7 Upper St Martin's Ln, London WC2H 9DL",
      latitude: "51.5128715",
      longitude: "-0.1322423",
      description:
        "Industrial venue with exposed bricks, for house-blend coffees, plus brunches and sharing plates.",
    },
  ]);
};
