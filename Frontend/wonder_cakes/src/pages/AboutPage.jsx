import React from 'react';

const AboutPage = () => {
  return (
    <div>
      {/* Main Content Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 max-w-5xl mx-auto">
        <div className="bg-white p-8 md:p-12 rounded-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
              The Wonder Cakes Journey
            </h2>
            <p className="text-md md:text-lg text-gray-600 leading-relaxed">
              Wonder Cakes began with a simple idea: to create desserts that tell a story. It all started in a small home kitchen, where our founder, Joel Mutiso, experimented with family recipes, infusing each cake with love and a touch of magic. The unique flavors and stunning designs quickly gained a following, transforming a passion project into a beloved local bakery. Today, we remain committed to those original values, using only the finest ingredients to craft cakes that celebrate life’s special moments.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-12">
            <div className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0 mb-8 md:mb-0">
              <img
                src="https://avatars.githubusercontent.com/u/209902300?v=4"
                alt="Founder Joee Bidens"
                className="w-full h-full object-cover rounded-full border-4 border-rose-500 shadow-lg"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Joel Mutiso
              </h3>
              <p className="text-md text-gray-600 mb-4">
                 Joel Mutiso leads Wonder Cakes with a passion for quality and creativity, overseeing everything from recipes to design. Her hands-on approach ensures every cake is crafted to brighten someone’s day.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;