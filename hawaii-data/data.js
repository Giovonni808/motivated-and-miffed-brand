/* Curated, rounded figures. Each block names its source so it can be refreshed.
   Live feeds (USGS quakes, NOAA tides) are fetched in the browser by app.js. */
window.HI_DATA = {
  visitors: {
    source: "Hawaiʻi Tourism Authority / DBEDT visitor statistics (rounded)",
    unit: "million visitors",
    series: [
      [2000,6.95],[2001,6.4],[2002,6.7],[2003,6.97],[2004,7.28],[2005,7.42],[2006,7.5],
      [2007,7.6],[2008,6.7],[2009,6.4],[2010,6.9],[2011,7.2],[2012,7.87],[2013,8.0],
      [2014,8.3],[2015,8.7],[2016,8.9],[2017,9.4],[2018,9.9],[2019,10.4],[2020,2.7],
      [2021,6.8],[2022,9.2],[2023,9.7],[2024,9.7]
    ],
    notes: {
      2001: "After 9/11, arrivals fell.",
      2008: "The Great Recession.",
      2019: "A record: 10.4 million visitors.",
      2020: "COVID-19 and a quarantine requirement. Arrivals fell by about 74%."
    },
    residents: 1.44
  },
  co2: {
    source: "NOAA Global Monitoring Laboratory, Mauna Loa Observatory, annual means (rounded)",
    unit: "ppm CO₂",
    series: [
      [1959,315.98],[1960,316.91],[1961,317.64],[1962,318.45],[1963,318.99],[1964,319.62],
      [1965,320.04],[1966,321.38],[1967,322.16],[1968,323.04],[1969,324.62],[1970,325.68],
      [1971,326.32],[1972,327.45],[1973,329.68],[1974,330.18],[1975,331.08],[1976,332.05],
      [1977,333.78],[1978,335.41],[1979,336.78],[1980,338.68],[1981,340.10],[1982,341.44],
      [1983,343.03],[1984,344.24],[1985,345.66],[1986,346.90],[1987,348.17],[1988,351.45],
      [1989,352.90],[1990,354.16],[1991,355.48],[1992,356.27],[1993,356.95],[1994,358.64],
      [1995,360.62],[1996,362.36],[1997,363.47],[1998,366.50],[1999,368.14],[2000,369.40],
      [2001,371.07],[2002,373.17],[2003,375.78],[2004,377.52],[2005,379.76],[2006,381.85],
      [2007,383.71],[2008,385.57],[2009,387.43],[2010,389.90],[2011,391.65],[2012,393.85],
      [2013,396.52],[2014,398.65],[2015,400.83],[2016,404.24],[2017,406.55],[2018,408.52],
      [2019,411.44],[2020,414.24],[2021,416.45],[2022,418.56],[2023,421.08],[2024,424.61]
    ]
  },
  islands: {
    source: "U.S. Census Bureau 2020 population; land area in square miles (rounded)",
    list: [
      {id:"hawaii", name:"Hawaiʻi Island", nick:"The Big Island", lat:19.60, lon:-155.50, area:4028, pop:200629},
      {id:"maui",   name:"Maui",           nick:"The Valley Isle", lat:20.80, lon:-156.33, area:727,  pop:154834},
      {id:"kahoolawe", name:"Kahoʻolawe",  nick:"Uninhabited",   lat:20.55, lon:-156.60, area:45,   pop:0},
      {id:"lanai",  name:"Lānaʻi",         nick:"The Pineapple Isle", lat:20.83, lon:-156.93, area:140, pop:3367},
      {id:"molokai",name:"Molokaʻi",       nick:"The Friendly Isle", lat:21.14, lon:-157.02, area:261, pop:7345},
      {id:"oahu",   name:"Oʻahu",          nick:"The Gathering Place", lat:21.47, lon:-157.98, area:597, pop:1016508},
      {id:"kauai",  name:"Kauaʻi",         nick:"The Garden Isle", lat:22.05, lon:-159.53, area:562, pop:73298},
      {id:"niihau", name:"Niʻihau",        nick:"The Forbidden Isle", lat:21.90, lon:-160.16, area:69, pop:84}
    ]
  },
  peaks: {
    source: "USGS / NOAA, rounded feet",
    list: [
      {name:"Mauna Kea, base to summit", top:33500, base:0, hi:true},
      {name:"Mount Everest", top:29032, base:0},
      {name:"Mauna Loa, above sea level", top:13681, base:0},
      {name:"Haleakalā", top:10023, base:0}
    ],
    maunaKeaAbove: 13803, maunaKeaBelow: 19700
  },
  rain: {
    source: "NWS and NOAA climate normals, rounded; Waiʻaleʻale is an often-cited long-term average",
    unit: "inches per year",
    list: [
      {name:"Mount Waiʻaleʻale, Kauaʻi", v:450},
      {name:"Hilo, Hawaiʻi Island", v:126},
      {name:"Hāna, Maui", v:70},
      {name:"Līhuʻe, Kauaʻi", v:38},
      {name:"Honolulu, Oʻahu", v:17},
      {name:"Kawaihae, Hawaiʻi Island", v:9}
    ]
  },
  alphabet: ["A","E","I","O","U","H","K","L","M","N","P","W","ʻ"],
  quiz: [
    {q:"How many visitors came to Hawaiʻi in 2019, the record year?", unit:"million", min:1, max:20, step:0.1, ans:10.4, fact:"10.4 million visitors, in a state of about 1.4 million residents."},
    {q:"How many people live in Hawaiʻi?", unit:"million", min:0.2, max:5, step:0.05, ans:1.44, fact:"About 1.44 million residents."},
    {q:"What share of Hawaiʻi's residents live on Oʻahu?", unit:"%", min:5, max:100, step:1, ans:70, fact:"About 70% live on Oʻahu, which holds about 9% of the land."},
    {q:"What share of the state's land is the Big Island?", unit:"%", min:5, max:100, step:1, ans:63, fact:"Hawaiʻi Island is about 63% of the state's land area."},
    {q:"How tall is Mauna Kea from the ocean floor to the summit?", unit:"ft", min:5000, max:60000, step:500, ans:33500, fact:"About 33,500 ft, taller than Mount Everest (29,032 ft)."},
    {q:"What was Mauna Loa's yearly average CO₂ in 2024?", unit:"ppm", min:280, max:520, step:1, ans:425, fact:"About 425 ppm, up from 316 ppm in 1959."},
    {q:"How many letters are in the Hawaiian alphabet, including the ʻokina?", unit:"letters", min:5, max:35, step:1, ans:13, fact:"13 letters: 5 vowels and 8 consonants (including the ʻokina)."},
    {q:"How far is Honolulu from San Francisco?", unit:"miles", min:500, max:8000, step:50, ans:2400, fact:"About 2,400 miles, so Hawaiʻi is among the most isolated places on Earth."}
  ]
};
