// Fotografias do Unsplash (licença Unsplash). Substituir pelas fotos reais dos empreendimentos.
export const photos = {
  heroTower: "1515263487990-61b07816b324",
  facadeBlue: "1545324418-cc1a3fa10c00",
  towerLookUp: "1486406146926-c627a92ad1ab",
  brickSunset: "1574362848149-11496d93a7c7",
  houseDusk: "1600585154340-be6161a56a0c",
  whiteBuilding: "1487958449943-2429e8be8625",
  balconies: "1460317442991-0ec209397118",
  houseWood: "1600566753190-17f0baa2a6c3",
  villaPool: "1613490493576-7fde63acd811",
  sitePlans: "1503387762-592deb58ef4e",
  siteAerial: "1541888946425-d81bb19240f5",
  siteRebar: "1504307651254-35680f356dfd",
  livingModern: "1600607687939-ce8a6c25118c",
  livingWarm: "1618221195710-dd6b41faaea6",
  livingPlants: "1600210492486-724fe5c67fb0",
  livingLight: "1616486338812-3dadae4b4ace",
  livingApartment: "1560448204-e02f11c3d0e2",
  livingBoho: "1631679706909-1844bbd07221",
  livingGrey: "1600121848594-d8644e57abab",
  livingColor: "1617103996702-96ff29b1c467",
  livingBlue: "1505691938895-1758d7feb511",
  livingMirror: "1618219908412-a29a1bb7b86e",
  livingWood: "1524758631624-e2822e304c36",
  diningGreen: "1617806118233-18e1de247200",
  bedroom: "1615874959474-d609969a20ed",
  bedroomGrey: "1600607687644-c7171b42498f",
  bedroomWhite: "1595526114035-0d45ed16cfbf",
  kitchenWhite: "1484154218962-a197022b5858",
  kitchenIsland: "1600585152220-90363fe7e115",
  kitchenGrey: "1600489000022-c2086d79f9d4",
  kitchenBright: "1556911220-bff31c812dba",
  bathroom: "1600566752355-35792bedcfea",
  bathroomLight: "1584622650111-993a426fbf0a",
  stairsGlass: "1600573472550-8090b5e0745e",
  sofaOrange: "1567016432779-094069958ea5",
  chairYellow: "1586023492125-27b2c045efd7",
  minimalRoom: "1513694203232-719a280e022f",
  livingPlants2: "1502672260266-1c1ef2d93688",
} as const;

export type PhotoKey = keyof typeof photos;

export function photoUrl(key: PhotoKey, width = 1200) {
  return `https://images.unsplash.com/photo-${photos[key]}?w=${width}&q=78&auto=format&fit=crop`;
}

export function photoSrcSet(key: PhotoKey, widths = [480, 800, 1200, 1600]) {
  return widths.map((w) => `${photoUrl(key, w)} ${w}w`).join(", ");
}
