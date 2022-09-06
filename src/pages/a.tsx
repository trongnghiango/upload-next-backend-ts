import { useEffect } from "react";
import { Header } from "src/components";

export default function A() {
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  }, []);
  return (
    <div>
      <Header />
    </div>
  );
}
