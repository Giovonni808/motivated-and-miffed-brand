# Hawaiʻi, Visualized

A static, no-build interactive data story about Hawaiʻi. Scroll from the summit of Mauna Kea down to the sea floor through nine chapters.

## Run it
```bash
cd hawaii-data && python3 -m http.server 8000
```
Open http://localhost:8000. To publish, serve the folder from GitHub Pages, Netlify, or any static host.

## What is inside
| Chapter | Data | Interaction |
|---|---|---|
| Malihini | Visitor arrivals 2000 to 2024 | Scrub through time |
| Mauna | Mauna Kea vs Everest | Animated heights |
| Ea | Mauna Loa CO₂ (Keeling Curve) | Scrub, plus a sonification |
| Moku | Island land area vs population | Morphing bubble map |
| Ua | Rainfall by place | Fill the gauges |
| Honua | **Live** USGS earthquakes and NOAA tide | Real-time map |
| Manu, ʻŌlelo | Endemic species, the alphabet | Facts and pronunciation |
| ʻIke | 8-question estimation quiz | Scored, shareable |

Every chapter has a **Share** button that renders a 1080×1350 card (works with the phone share sheet, or downloads a PNG).

## Data and accuracy
`data.js` holds curated, rounded figures with a source named on each block. Treat them as storytelling values and verify against the originals before citing. The live feeds call the USGS and NOAA APIs from the visitor's browser and show nothing if unreachable.

To refresh: update arrays in `data.js` from HTA/DBEDT, NOAA GML (`co2_annmean_mlo.csv`), and the Census Bureau.

## Ideas for next
Ocean temperature (NOAA CRW), Kīlauea eruption history (USGS HVO), native bird counts, housing prices by island, and a Hawaiian-language chapter reviewed by a fluent speaker.
