

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto text-center px-6">
        <p className="text-sm text-gray-300">
          &copy; {new Date().getFullYear()} Faisal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
