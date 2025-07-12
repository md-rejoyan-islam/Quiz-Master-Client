import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link
              href={"/"}
              className="flex items-center group/p w-fit  space-x-2 mb-4 hover:scale-105 transition-all duration-300"
            >
              <div className="p-2 bg-purple-900/50 group-hover/p:bg-purple-800/70 rounded-lg group transition-all duration-300">
                <GraduationCap className="h-6 w-6 group-hover:rotate-[360deg] transition-all duration-300" />
              </div>
              <span className="text-xl font-bold">QuizMaster</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering students worldwide with interactive quizzes and
              comprehensive learning tools. Test your knowledge, track your
              progress, and achieve your educational goals.
            </p>
            <ul className="space-y-2">
              <li className="flex  items-center hover:translate-x-[5px] transition-all duration-300 space-x-2 text-gray-400 hover:text-purple-400 ">
                <Mail className="h-4 w-4" />
                <span>info@quizmaster.com</span>
              </li>

              <li className="flex items-center hover:translate-x-[5px] transition-all duration-300 space-x-2 text-gray-400 hover:text-purple-400 ">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>

              <li className="flex items-center hover:translate-x-[5px] transition-all duration-300 space-x-2 text-gray-400 hover:text-purple-400 ">
                <MapPin className="h-4 w-4" />
                <span>123 Education St, Learning City, LC 12345</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-300">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "Quizzes", "About Us", "Contact", "Help Center"].map(
                (link, index) => (
                  <MenuLink label={link} key={index} />
                )
              )}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-300">
              Categories
            </h3>
            <ul className="space-y-2">
              {[
                "Mathematics",
                "Science",
                "History",
                "Literature",
                "General Knowledge",
              ].map((category, index) => (
                <MenuLink label={category} key={index} />
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-500/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 QuizMaster. All rights reserved.
            </p>
            <ul className="flex space-x-6 mt-4 md:mt-0">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (policy, index) => (
                  <MenuLink label={policy} key={index} />
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

export const MenuLink = ({ label }: { label: string }) => {
  return (
    <li className="hover:text-purple-400 block w-fit text-gray-400 hover:translate-x-[5px] transition-all duration-300">
      <a href="#">{label}</a>
    </li>
  );
};
