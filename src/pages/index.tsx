import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-full flex bg-red-300">
      <ul>
        <li>
          <Link href="/a" as="/a">
            <a>a</a>
          </Link>
        </li>
        <li>
          <Link href="/b" as="/b">
            <a>b</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
