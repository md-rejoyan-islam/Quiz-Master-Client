export default function Footer() {
  return (
    <footer className="flex items-center justify-center w-full  py-5 sm:h-16 border-t px-4">
      <div className="flex items-center space-x-2 flex-wrap gap-1.5 justify-center">
        <span className="text-gray-600 dark:text-gray-400">
          Made with ❤️ by Md Rejoyan Islam
        </span>
        <div>
          <span className="text-gray-600 dark:text-gray-400">•</span>
          <span className="text-gray-600 dark:text-gray-400">
            © 2024 Quiz Master
          </span>
        </div>
      </div>
    </footer>
  );
}
