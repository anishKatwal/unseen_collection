import RegisterForm from "../../components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="container mx-auto pt-10 pb-16 px-5">
      <div className="sm:w-3/5 lg:min-h-[70vh] rounded-[3rem] shadow-md mx-auto lg:flex">
        <div className="lg:w-1/2 px-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-t-[3rem] lg:rounded-r-none lg:rounded-l-[3rem] flex flex-col py-8 items-center justify-center">
          <h1 className="text-4xl md:text-6xl text-center font-semibold text-white">
            Register
          </h1>
          <h4 className="text-white text-center mt-5 text-xl">
            Do not have an account? Please register.
          </h4>
        </div>
        <div className="lg:w-1/2 flex py-8 items-center justify-center">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
