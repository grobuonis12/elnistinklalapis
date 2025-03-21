import React from 'react';

export const Newsletter: React.FC = () => {
  return (
    <section className="bg-[#FFD700] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Užsiprenumeruokite ELNIS naujienlaiškį
          </h2>
          <div className="relative max-w-2xl mx-auto">
            <form className="flex items-center gap-2 bg-white rounded-full p-2 shadow-lg">
              <input
                type="email"
                placeholder="Įveskite savo el.pašto adresą"
                className="flex-1 px-4 py-3 rounded-full outline-none bg-transparent"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-[#FF4500] text-white rounded-full font-medium hover:bg-[#FF5722] transition-colors duration-200 flex items-center gap-2"
              >
                Prenumeruoti
                <span className="text-xl">→</span>
              </button>
            </form>
          </div>
          <p className="mt-6 text-sm text-gray-800 max-w-2xl mx-auto">
            Užsiprenumeruokite elnis.lt naujienlaiškį ir gaukite informaciją apie 
            naujausius straipsnius, naujas darbo pozicijas ir kt. aktualią 
            informaciją.
          </p>
        </div>
      </div>
    </section>
  );
}; 