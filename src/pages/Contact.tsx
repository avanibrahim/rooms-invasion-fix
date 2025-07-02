import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Our Retail Partner',
      details: ['EksClothing ,Gorontalo, Indonesia.',]
    },
    {
      icon: Phone,
      title: 'Customer Care',
      details: ['+62 851‑6636‑9467']
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['roomsinvasion7@mail.com']
    },
    /*{
      icon: Clock,
      title: 'Store Hours',
      details: ['Mon - Sat: 9:00 AM - 8:00 PM', 'Sunday: 10:00 AM - 6:00 PM']
    }*/
  ];
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-4xl font-semibold text-gray-900 mb-4">CONTACT</h1>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-4">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {info.title}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
          
              {/* Map & Additional Info */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Visit Our Retail Partner
                </h2>
                
                {/* Google Maps Embed */}
                <div className="rounded-lg overflow-hidden h-64 mb-6 shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4259.766247675774!2d123.0626784!3d0.5496525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32792b35e28ef41f%3A0xa533905c22c1b117!2seksclothing!5e1!3m2!1sid!2sid!4v1750512931756!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Rooms Invasion Store Location"
                  />
                </div>
            </div>
          </div>
        </section>

        {/* FAQ Section
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find quick answers to common questions about our products and services.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                Still have questions? We're here to help!
              </p>
              <a
                href="mailto:roomsinvasion@gmail.com"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                <Mail size={20} />
                Email Support
              </a>
            </div>
          </div>
        </section>*/}
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
