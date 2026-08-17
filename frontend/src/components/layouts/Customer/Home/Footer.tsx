const Footer = () => {
  return (
    <footer className="mt-10 border-t border-gray-200 pt-5 pb-2 transition-colors duration-200 dark:border-[#29343c]">
      <div className="flex flex-col items-center justify-between gap-3 text-sm text-gray-500 dark:text-[#9aa7b1] md:flex-row">
        <p>© 2026 Farm Veggies. All rights reserved.</p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <button className="transition hover:text-green-600 dark:hover:text-[#00c767]">
            Privacy
          </button>

          <button className="transition hover:text-green-600 dark:hover:text-[#00c767]">
            Terms
          </button>

          <button className="transition hover:text-green-600 dark:hover:text-[#00c767]">
            Contact
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;