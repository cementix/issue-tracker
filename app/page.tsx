import Pagination from "./(pages)/issues/Pagination";

export default function DashboardPage() {
  return (
    <main className="">
      <Pagination itemCount={100} pageSize={10} currentPage={2} />
    </main>
  );
}
