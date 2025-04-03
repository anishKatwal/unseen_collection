const Contact = () => {
  return (
    <div className="py-10 px-6  bg-slate-100">
      <div className="flex flex-col md:flex-row items-start justify-around max-w-screen-xl mx-auto">
        <div className="flex flex-col justify-start items-center py-8 md:w-1/2 w-full">
          <h2 className="text-4xl font-bold mb-5">Contact Us</h2>
          <span className="bg-slate-800 text-white text-xs px-5 py-1 rounded-full">
            Phone
          </span>
          <p className="text-lg mt-1 mb-2">9876543210</p>
          <span className="bg-slate-800 text-white text-xs px-5 py-1 rounded-full">
            Email
          </span>
          <p className="text-lg mt-1 mb-2">foodify@exmaple.com</p>
          <span className="bg-slate-800 text-white text-xs px-5 py-1 rounded-full">
            Location
          </span>
          <p className="text-lg mt-1 mb-2">Itahari, Sunsari</p>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.7835061921955!2d87.29937287624666!3d26.655413271099032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef6ea070e7b18b%3A0x2959e2a3e2bf54e0!2sItahari%20International%20College!5e0!3m2!1sen!2snp!4v1742985444790!5m2!1sen!2snp"
          height="450"
          loading="lazy"
          className="w-full md:w-1/2"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
