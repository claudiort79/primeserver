import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="PrimeServers home">
      <span className="brandMark" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className="brandText">PRIME<span>SERVERS</span></span>
    </Link>
  );
}
