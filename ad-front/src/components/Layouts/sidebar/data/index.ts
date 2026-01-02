import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        items: [
          {
            title: "Omega Dashboard",
            url: "/dashboard",
          },
        ],
      },
      {
        title: "Products",
        icon: Icons.PackageIcon,
        items: [
          {
            title: "Add Product",
            url: "/products/add",
            icon: Icons.PlusIcon,
          },
          {
            title: "List Products",
            url: "/products/list",
            icon: Icons.ListIcon,
          },
          {
            title: "Product Categories",
            url: "/products/categories/manage",
            icon: Icons.TagIcon,
          },
          {
            title: "Product Analytics",
            url: "/products/analytics",
            icon: Icons.PieChart,
          },
          {
            title: "Inventory Management",
            url: "/products/inventory",
            icon: Icons.Table,
          },
          {
            title: "Product Reviews",
            url: "/products/reviews",
            icon: Icons.TagIcon,
          },
        ],
      },
      {
        title: "Deals & Promotions",
        icon: Icons.PieChart,
        items: [
          {
            title: "Add Deal",
            url: "/deals/add",
            icon: Icons.PlusIcon,
          },
          {
            title: "List Deals",
            url: "/deals/list",
            icon: Icons.ListIcon,
          },
          {
            title: "Deal Categories",
            url: "/deals/categories",
            icon: Icons.TagIcon,
          },
          {
            title: "Deal Analytics",
            url: "/deals/analytics",
            icon: Icons.PieChart,
          },
          {
            title: "Flash Sales",
            url: "/deals/flash-sales",
            icon: Icons.Table,
          },
          {
            title: "Deal Templates",
            url: "/deals/templates",
            icon: Icons.TagIcon,
          },
        ],
      },
      {
        title: "Product Management",
        icon: Icons.Table,
        items: [
          {
            title: "Product Dashboard",
            url: "/products/dashboard",
            icon: Icons.PieChart,
          },
          {
            title: "Bulk Import",
            url: "/products/bulk-import",
            icon: Icons.PlusIcon,
          },
          {
            title: "Export Products",
            url: "/products/export",
            icon: Icons.Table,
          },
          {
            title: "Product Templates",
            url: "/products/templates",
            icon: Icons.TagIcon,
          },
        ],
      },
      {
        title: "Categories",
        icon: Icons.TagIcon,
        items: [
          {
            title: "All Categories",
            url: "/products/categories/manage",
            icon: Icons.ListIcon,
          },
          {
            title: "Category Tree",
            url: "/products/categories/tree",
            icon: Icons.TagIcon,
          },
          {
            title: "Main Categories",
            url: "/products/categories/main",
            icon: Icons.TagIcon,
          },
          {
            title: "Subcategories",
            url: "/products/categories/sub",
            icon: Icons.TagIcon,
          },
          {
            title: "Add Category",
            url: "/products/categories/add",
            icon: Icons.PlusIcon,
          },
          {
            title: "Category Demo",
            url: "/products/categories/demo",
            icon: Icons.FourCircle,
          },
        ],
      },
      {
        title: "Users",
        icon: Icons.User,
        items: [
          {
            title: "User List",
            url: "/users/list",
            icon: Icons.ListIcon,
          },
          {
            title: "Orders",
            url: "/users/orders",
            icon: Icons.Table,
          },
        ],
      },
      {
        title: "Sellers",
        icon: Icons.SellerIcon,
        items: [
          {
            title: "Seller List",
            url: "/sellers/list",
            icon: Icons.ListIcon,
          },
          {
            title: "Add Seller",
            url: "/sellers/add",
            icon: Icons.PlusIcon,
          },
          {
            title: "Seller Reports",
            url: "/sellers/reports",
            icon: Icons.PieChart,
          },
        ],
      },
      {
        title: "Banners",
        icon: Icons.BannerIcon,
        items: [
          {
            title: "Add Banner",
            url: "/banners/add",
            icon: Icons.PlusIcon,
          },
          {
            title: "List Banners",
            url: "/banners/list",
            icon: Icons.ListIcon,
          },
        ],
      },
      {
        title: "Hero Sliders",
        icon: Icons.SliderIcon,
        items: [
          {
            title: "Add Hero Slider",
            url: "/banners/hero-sliders/add",
            icon: Icons.PlusIcon,
          },
          {
            title: "List Hero Sliders",
            url: "/banners/hero-sliders",
            icon: Icons.ListIcon,
          },
        ],
      },
      {
        title: "Reports & Analytics",
        icon: Icons.PieChart,
        items: [
          {
            title: "Sales Reports",
            url: "/reports/sales",
            icon: Icons.PieChart,
          },
          {
            title: "Product Performance",
            url: "/reports/products",
            icon: Icons.Table,
          },
          {
            title: "Customer Analytics",
            url: "/reports/customers",
            icon: Icons.User,
          },
          {
            title: "Inventory Reports",
            url: "/reports/inventory",
            icon: Icons.Table,
          },
        ],
      },
      {
        title: "Settings",
        icon: Icons.Authentication,
        items: [
          {
            title: "Currencies",
            url: "/settings/currencies",
            icon: Icons.CurrencyIcon,
          },
          {
            title: "Product Settings",
            url: "/settings/products",
            icon: Icons.PackageIcon,
          },
          {
            title: "Tax Settings",
            url: "/settings/tax",
            icon: Icons.Table,
          },
          {
            title: "Shipping Settings",
            url: "/settings/shipping",
            icon: Icons.PackageIcon,
          },
        ],
      },
    ]
  }
]
