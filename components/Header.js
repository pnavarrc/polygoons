import { useStoreState } from 'easy-peasy';
import Link from "next/link";

const linkStyle = {
  marginRight: 15
};

const Header = () => {

  const accounts = useStoreState(state => state.accounts)

  return (
    <div>
      <Link href="/">
        <a style={linkStyle}>Home</a>
      </Link>
      <Link href="/about">
        <a style={linkStyle}>About</a>
      </Link>
      <span>Dapper Connected: {accounts.length ? 'Yes' : 'No'}</span>
    </div>
  )
}

export default Header;
