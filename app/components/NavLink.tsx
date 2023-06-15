import { usePathname } from 'next/navigation';
import Link from 'next/link';

type NavLinkProps = {
  title: string;
  slug: string;
};

const NavLink = ({ title, slug }: NavLinkProps) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={slug}
        className={
          pathname === slug
            ? 'text-zinc-100'
            : 'text-zinc-400 duration-200 hover:text-zinc-100'
        }
      >
        {title}
      </Link>
    </li>
  );
};

export default NavLink;
