import UserForm from "../../../components/users/Form";

const AddStaff = () => {
  return (
    <section className="py-10 bg-slate-100 min-h-svh  px-4 lg:px-6">
      <div className="sm:w-3/5 lg:min-h-[70vh] rounded-xl shadow-md mx-auto py-8 px-12 bg-white mb-10">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-textColor">
          Add Staff
        </h2>

        <UserForm />
      </div>
    </section>
  );
};

export default AddStaff;
