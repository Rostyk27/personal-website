import Link from 'next/link';
import Particles from './components/particles';

const navigation = [
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export default function Home() {
  return (
    <div className="mob_h_fix flex w-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-zinc-500 duration-500 hover:text-zinc-300"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="animate-glow hidden h-px w-screen animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />

      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />

      <h1 className="text-edge-outline z-10 animate-title cursor-default whitespace-nowrap bg-white bg-clip-text font-display text-5xl text-transparent sm:text-6xl md:text-9xl">
        rostyk.dev
      </h1>

      <div className="animate-glow hidden h-px w-screen animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />

      <div className="mx-auto my-16 max-w-2xl animate-fade-in text-center">
        <p className="px-8 text-sm text-zinc-500">
          Hi, my name is Rostyk, I'm an experienced front-end engineer dedicated
          to advancing my skills in React and Next.js to deliver cutting-edge
          solutions.
        </p>
      </div>
    </div>
  );
}
