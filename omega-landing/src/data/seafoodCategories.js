// Static seafood categories data
// This file acts as the data source when there's no backend

export const seafoodCategories = [
  {
    id: 1,
    name: "Fresh Fish",
    slug: "fresh-fish",
    isMainCategory: true,
    description: "Premium fresh fish selection"
  },
  {
    id: 2,
    name: "Shrimp & Prawns",
    slug: "shrimp-prawns",
    isMainCategory: true,
    description: "Fresh shrimp and prawns"
  },
  {
    id: 3,
    name: "Crab & Lobster",
    slug: "crab-lobster",
    isMainCategory: true,
    description: "Premium crab and lobster"
  },
  {
    id: 4,
    name: "Shellfish",
    slug: "shellfish",
    isMainCategory: true,
    description: "Fresh shellfish varieties"
  },
  {
    id: 5,
    name: "Squid & Octopus",
    slug: "squid-octopus",
    isMainCategory: true,
    description: "Fresh squid and octopus"
  },
  {
    id: 6,
    name: "Frozen Seafood",
    slug: "frozen-seafood",
    isMainCategory: true,
    description: "Premium frozen seafood products"
  },
  {
    id: 7,
    name: "Smoked Fish",
    slug: "smoked-fish",
    isMainCategory: true,
    description: "Delicious smoked fish varieties"
  },
  {
    id: 8,
    name: "Seafood Products",
    slug: "seafood-products",
    isMainCategory: true,
    description: "Processed seafood products"
  }
];

// Transform categories to menu links format
export const getCategoryMenuLinks = () => {
  return seafoodCategories.map(cat => ({
    href: `/shop?category=${cat.slug}`,
    text: cat.name,
    icon: "bi bi-chevron-double-right"
  }));
};

