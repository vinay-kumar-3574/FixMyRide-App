import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaComments } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { MdForum } from "react-icons/md";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
export default function SupportPage() {
const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      <motion.div 
        className="container mx-auto py-10 px-6 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Support Center</h2>
        <p className="max-w-2xl text-lg opacity-90 mb-6">We're here to help! Find answers to common questions or contact our support team.</p>
      </motion.div>

      {/* Help Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 container mx-auto">
        {[
          "Account Issues", "Technical Support", "Billing", 
          "Installation", "Troubleshooting", "More"
        ].map((topic, index) => (
          <motion.div 
            key={index} 
            className="p-6 bg-white text-black rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <h3 className="text-xl font-semibold">{topic}</h3>
            <p className="opacity-75">Find solutions related to {topic.toLowerCase()}.</p>
          </motion.div>
        ))}
      </div>

      {/* Contact Form */}
      <div className="container mx-auto mt-10 px-6">
        <Card className="p-6 bg-white text-black rounded-xl shadow-lg max-w-xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
          <form className="space-y-4">
            <Input placeholder="Your Name" className="p-3 border border-gray-300 rounded-lg" />
            <Input type="email" placeholder="Your Email" className="p-3 border border-gray-300 rounded-lg" />
            <Textarea placeholder="Your Message" className="p-3 border border-gray-300 rounded-lg" rows={4} />
            <Button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full">Send Message</Button>
          </form>
        </Card>
      </div>

      {/* Extra Support Options */}
      <div className="flex justify-center gap-6 my-10">
        <Button className="bg-green-500 hover:bg-green-600 flex items-center gap-2 px-6 py-3 rounded-xl shadow-md text-white"  onClick={() => navigate("/dashboard/chatbot")}>
          <IoMdChatbubbles size={20} /> Live Chat
        </Button>
        <Button className="bg-purple-500 hover:bg-purple-600 flex items-center gap-2 px-6 py-3 rounded-xl shadow-md text-white">
          <MdForum size={20} /> Community Forum
        </Button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}