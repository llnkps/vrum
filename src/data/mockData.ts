import {FavoriteItem, SubscriptionItem} from "@/components/favorites/types";

export const mockFavoritesData: FavoriteItem[] = [
  {
    id: "1",
    title: "BMW 3-Series, 2020",
    subtitle: "320d AT xDrive M Sport",
    price: "4 700 000 ₽",
    tag: "высокая цена",
    description: "2.0 л, 190 л.с., дизель, АКПП, 4WD, 21 тыс.км",
    location: "Москва, 10 сент",
    images: [
      require("@/data/images/1images.jpeg"),
      require("@/data/images/2LEAD.jpg"),
    ],
  },
  {
    id: "2",
    title: "BMW 3-Series, 2020",
    subtitle: "320d AT xDrive M Sport",
    price: "4 700 000 ₽",
    tag: "высокая цена",
    description: "2.0 л, 190 л.с., дизель, АКПП, 4WD, 21 тыс.км",
    location: "Москва, 10 сент",
    images: [
      require("@/data/images/1images.jpeg"),
    ],
  },
  {
    id: "3",
    title: "BMW 3-Series, 2020",
    subtitle: "320d AT xDrive M Sport",
    price: "4 700 000 ₽",
    tag: "высокая цена",
    description: "2.0 л, 190 л.с., дизель, АКПП, 4WD, 21 тыс.км",
    location: "Москва, 10 сент",
    images: [
      require("@/data/images/1images.jpeg"),
      require("@/data/images/2LEAD.jpg"),
    ],
  },
];

export const mockSubscriptionsData: SubscriptionItem[] = [
  {
    id: "1",
    brand: "Audi",
    model: "A4 (5 поколение: 2019–…)",
    info: "легковые; все регионы",
    count: "~31 объявление в месяц",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Audi_logo_detail.svg",
  },
  {
    id: "2",
    brand: "Audi",
    model: "A4 (5 поколение: 2019–…)",
    info: "легковые; все регионы",
    count: "~31 объявление в месяц",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Audi_logo_detail.svg",
  },
  {
    id: "3",
    brand: "Audi",
    model: "A4 (5 поколение: 2019–…)",
    info: "легковые; все регионы",
    count: "~31 объявление в месяц",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Audi_logo_detail.svg",
  },
];