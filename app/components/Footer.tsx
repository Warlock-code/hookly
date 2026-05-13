export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-6 text-center text-sm text-white/40">
      <p>© {new Date().getFullYear()} Hookly. AI captions for creators.</p>
    </footer>
  );
}