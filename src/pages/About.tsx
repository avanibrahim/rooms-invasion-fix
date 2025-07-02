
import React from 'react';
import { Users, Target, Heart, Award, Globe, Truck } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gray-50 py-6">
  <div className="container mx-auto px-6">
    <div className="max-w-4xl mx-auto text-center">
    <h1 className="text-4xl md:text-4xl font-semibold text-gray-900 mb-8">About Us</h1>
      <img
        src="/image/room.jpeg"
        alt="StyleShop Store"
        className="max-w-2xl mx-auto mb-8 w-full h-25 object-cover md:h-96 rounded-lg shadow-lg md:shadow-xl"
      />
   <div className="max-w-2xl mx-auto text-left">
  {/* Box scrollable dengan background */}
  <div className="max-h-64 overflow-y-auto pr-2 bg-gray-100 p-4 rounded-md shadow-inner">
    <p className="text-xl text-gray-600 leading-relaxed">
      Rooms Invasion is a streetwear clothing brand founded in 2024 in Gorontalo, a small city in Indonesia filled with big hopes. Born from a deep passion for simplicity and authenticity, Rooms Invasion embraces a minimalist design concept—clean, thoughtful, and timeless.
    </p>
    <p className="text-xl text-gray-600 leading-relaxed mt-4">
      We believe that less is more. In a world that often feels overwhelming, we offer a space—a “room”—for calm, clarity, and self-expression. Every piece we create is designed to be simple yet bold, quiet yet confident. It’s not just clothing; it’s a statement of being present and intentional.
    </p>
    <p className="text-xl text-gray-600 leading-relaxed mt-4">
      Our mission is to redefine streetwear through minimalism, offering essentials that speak louder through subtlety. Rooms Invasion stands for those who find strength in simplicity and want to express individuality without excess.
    </p>
    <p className="text-xl text-gray-600 leading-relaxed mt-4">
      From the heart of Gorontalo to the streets of the world, we are here to invade your everyday style with purpose and precision.
    </p>
  </div>

  {/* Strong text di luar box */}
  <p className="text-lg text-gray-800 font-semibold mt-4">
    Rooms Invasion — Your room, your rhythm.
  </p>
</div>


    </div>
  </div>
</section>


        {/* Stats Section 
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>*/}

        {/* Story Section 
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="items-center w-full md:flex md:space-x-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod ducimus, quia labore quis, praesentium ut rem nam sequi omnis aliquid adipisci minus suscipit. Quo sint rerum est obcaecati quisquam quasi.
                  </p>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi nobis tempora molestias vitae repellat quo quae, ipsum dolorem pariatur dolores sint totam quam aspernatur error impedit, reprehenderit ullam sapiente corrupti.
                  </p>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo libero enim minus, distinctio consectetur quae voluptatum repellendus fugit recusandae exercitationem earum? In necessitatibus molestiae commodi quos tenetur, omnis ullam praesentium?
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/image/room.jpeg"
                  alt="StyleShop Store"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>*/}

        {/* Values Section
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These core values guide everything we do and shape the way we serve our customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-4">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>*/}

        {/* Team Section 
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The passionate people behind StyleShop who work tirelessly to bring you the best fashion experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>*/}

        {/* Mission Section 
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gray-900 text-white rounded-lg p-8 md:p-12 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our Mission
                </h2>
                <p className="text-xl leading-relaxed text-gray-300 mb-8">
                  To democratize fashion by making high-quality, stylish clothing accessible 
                  to everyone, while building a sustainable and ethical fashion ecosystem 
                  that benefits our customers, partners, and communities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <Award size={20} />
                    <span>Quality Assured</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <Truck size={20} />
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <Heart size={20} />
                    <span>Customer Love</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>*/}
      </main>

      <Footer />
    </div>
  );
};

export default About;
