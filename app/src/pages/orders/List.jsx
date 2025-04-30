import OrdersTable from "../../components/orders/Table";

const columns = [
  {
    label: "S.N",
    slug: "id",
  },
  {
    label: "Customer",
    slug: "customer",
  },
  {
    label: "Menu items",
    slug: "items",
  },
  {
    label: "Total price",
    slug: "totalPrice",
    sortable: true,
  },
  {
    label: "Created At",
    slug: "createdAt",
    sortable: true,
  },
  {
    label: "Status",
    slug: "status",
  },
];

function OrdersList() {
  return (
    <section className="py-10 bg-slate-100 min-h-svh  px-4 lg:px-6">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-center md:text-left text-2xl md:text-3xl font-semibold text-textColor">
          Manage Orders
        </h2>

        <OrdersTable columns={columns} />
      </div>
    </section>
  );
}

export default OrdersList;
