import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const productLinks = [
    "Wide Format Printers",
    "UV Printers",
    "Textile Printers",
    "3D Printers",
  ];

  const supportLinks = [
    "Technical Support",
    "Documentation",
    "Training",
    "Warranty",
  ];

  const companyLinks = [
    "About Us",
    "Careers",
    "Press",
    "Contact",
  ];

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Instagram, href: "#" },
  ];

  return (
    <footer className="bg-gradient-to-r from-[var(--midnight)] to-[var(--deep-black)] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold font-inter mb-4 text-gradient">
              MitsuMegami
            </h3>
            <p className="text-[var(--platinum)]/70 mb-6">
              Leading the future of industrial printing with innovative solutions and premium quality.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  className="glass-morphism w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--electric)]/20 transition-all duration-300"
                >
                  <social.icon className="h-5 w-5 text-[var(--electric)]" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold font-inter mb-4 text-white">Products</h4>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-[var(--platinum)]/70 hover:text-[var(--electric)] transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold font-inter mb-4 text-white">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-[var(--platinum)]/70 hover:text-[var(--electric)] transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold font-inter mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-[var(--platinum)]/70 hover:text-[var(--electric)] transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-[var(--platinum)]/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[var(--platinum)]/60 text-sm">
            © 2024 MitsuMegami. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-[var(--platinum)]/60 hover:text-[var(--electric)] text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-[var(--platinum)]/60 hover:text-[var(--electric)] text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-[var(--platinum)]/60 hover:text-[var(--electric)] text-sm transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
