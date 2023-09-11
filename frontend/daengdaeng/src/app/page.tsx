import Link from 'next/link';

type Props = {};

function Page({}: Props) {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/test">test</Link>
    </div>
  );
}

export default Page;
