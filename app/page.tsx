import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <Link href="/issues/new">
        <Button>Create new issue</Button>
      </Link>
    </main>
  );
}
