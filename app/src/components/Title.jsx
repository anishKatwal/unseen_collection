const Title = ({ label = "Title" }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center">
        {label}
      </h1>
    </div>
  );
};

export default Title;
